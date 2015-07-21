var faker = require('faker');

var interpolateReg = /{{([\s\S]+?)}}/g;

var handler = {

  '_string': function(template, index) {
    template = template.replace(interpolateReg, function(match, interpolate) {
      try {
        var funcName = interpolate.trim().match(/\w*/)[0],
            func;

        if(funcName === 'index') {
          return index;
        } else {
          func = new Function(funcName, 'return ' + interpolate + ';');
          return func(faker[funcName]);
        }

      } catch(e)  {
        return e.message;
      }
    });
    return template;
  },

  '_object': function(template) {
    var data = template;

    for(var key in data) {
      if(data.hasOwnProperty(key)) {
        data[key] = generate.call(data, data[key]);
      }
    }

    return data;
  },

  '_array': function(template) {

  },

  '_function': function(template) {
    return template.call(this, faker);
  }

};


function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function getHandlerKey(template) {
  if(isArray(template)) return '_array';

  return '_' + (typeof template);
}



function generate(template, index) {

  var data,
      handlerFunc = handler[getHandlerKey(template)];

  if(typeof handlerFunc === 'function') {
    data = handlerFunc.call(this, template, index);
  } else {
    data = template;
  }
  return data;
}

var template = {
  id: '{{ random.uuid() }}',
  name: '{{ name.firstName() }}',
  address: '{{address.country()}},{{address.city()}},{{address.streetName()}}',
  fullName: function(faker) {
    return this.name + ' ' + faker.name.lastName();
  }
};

console.time('build');
console.log(generate(template));
console.timeEnd('build');
