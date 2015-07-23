var faker = require('./lib/faker'),
        _ = require('lodash');

// match {{  }}
var interpolateReg = /{{([\s\S]+?)}}/g;

// parsers of different data type
var parsers = {

  // parse string template, if the parent template is an array, it will pass the index value to the child template
  '_string': function(str, index) {
    var matchCount = 0,
        hasIndex = false;

    // replace {{ xxx }}
    str = str.replace(interpolateReg, function(match, interpolate) {

      // record the match count
      matchCount++;

      try {
        var funcName = interpolate.trim().match(/\w*/)[0],
            func;

        if(funcName === 'index') {
          hasIndex = true;
          return index;
        } else {
          /*jslint evil: true */
          func = new Function(funcName, 'return ' + interpolate + ';');
          return func(faker[funcName]);
        }

      } catch(e)  {
        return e.message;
      }
    });

    // if str is only has one index() method, parse it to integer
    if(matchCount === 1 && hasIndex) {
      str = parseInt(str.trim());
    }

    // if result is true or false, parse it to boolean
    if(/^(true|false)$/.test(str)) {
      str = str === 'true';
    }

    return str;
  },

  // parse object, it will generate each property
  '_object': function(obj, index) {
    var funcKey = [];

    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {

        // If this is a function, generate it later.
        if(typeof obj[key] === 'function') {
          funcKey.push(key);
          continue;
        }
        obj[key] = generate.call(obj, obj[key], index);
      }
    }

    // parse function
    funcKey.forEach(function(key) {
      obj[key] = generate.call(obj, obj[key], index);
    });

    return obj;
  },

  // parse array
  '_array': function(arr) {
    var repeatReg = /{{\s*repeat\((\d+?),?\s*(\d*)?\)\s*}}/,
        resultArray = [];

    for(var i = 0; i < arr.length; i++) {
      var item = arr[i];

      // if item is string and has repeat method, repeat the next item to result array
      if(typeof  item === 'string' && repeatReg.test(item)) {
        var nextItem = arr[++i],
            min = parseInt(RegExp.$1) || 0,
            max = parseInt(RegExp.$2),
            length;

        length = isNaN(max) ? min : _.random(min, max);

        if(nextItem) {
          for(var j = 0; j < length; j++) {
            // parse the next item and pass the index value
            resultArray.push(generate(_.clone(nextItem), j));
          }
        }

      } else {
        resultArray.push(generate(item));
      }
    }

    return resultArray;
  },

  // parse function
  '_function': function(func) {
    return func.call(this, faker);
  },

  // get parser according to the data type
  getParser: function(template) {
    if(_.isArray(template)) return this._array;

    return this['_' + (typeof template)];
  }

};

// generate function
function generate(template, index) {

  var data,
      parser = parsers.getParser(template);

  if(typeof parser === 'function') {
    data = parser.call(this, template, index);
  } else {
    data = template;
  }
  return data;
}

module.exports = {
  faker: faker,
  generate: generate
};
