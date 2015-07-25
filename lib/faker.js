/*
* method that return fake data
* */

var faker = require('faker'),
    _ = require('lodash'),
    numeral = require('numeral'),
    dateFormat   = require('datef'),
    objectId = require('../vendor/object-id');

module.exports = {

  // make faker to public
  faker: faker,

  /**
   * returns random item from passed arguments list.
   * @params [arg1, arg2, ...]
   * @returns {*}
   */
  random: function(/*[arg1, arg2,...]*/) {
    return faker.random.arrayElement(_.toArray(arguments));
  },

  /**
   * Random integer in specified range. Can be negative.
   * @param min - Minimum number in the range.
   * @param max - Maximum number in the range.
   * @param format - Number format. For more info visit http://adamwdraper.github.io/Numeral-js/
   * @returns {*}
   */
  integer: function(min, max, format) {
    var number = _.random(min, max);

    if(format) {
      return numeral(number).format(format);
    }

    return number;
  },


  /**
   *  Random float in specified range. If min argument is float
   *  generated number will be float too with same number of decimals. Can be negative.
   * @param min - Minimum number in the range.
   * @param max - Maximum number in the range.
   * @param fixed - Number of decimals
   * @param format - Number format. For more info visit http://adamwdraper.github.io/Numeral-js/
   * @returns {number}
   */
  floating: function(min, max, fixed, format) {
    var number = _.random(min, max, true);

    if(fixed) {
      number = number.toFixed(fixed);
    }

    if(format) {
      number = numeral(number).format(format);
    }

    return number;
  },

  // Random boolean value.
  bool: function() {
    return faker.random.boolean();
  },

  // Random globally unique identifier.
  guid: function() {
    return faker.random.uuid();
  },

  // MongoDB's globally unique identifier for objects.
  objectId: function() {
    return objectId();
  },

  /**
   * Random date in specified range.
   * @param [min] - Minimum date in the range. Default is new Date(1970, 0, 1).
   * @param [max] - Maximum date in the range. Default is new Date().
   * @param [format] - Date format. For more info visit http://github.com/hogart/datef
   * @returns {*}
   */
  date: function(min, max, format) {
    var date;

    if(!format) {
      if(typeof max === 'string') {
        format = max;
      } else if(typeof min === 'string') {
        format = min;
      }
    }

    min = _.isDate(min) ? min : new Date(0);
    max = _.isDate(max) ? max : new Date();

    date = new Date(_.random(min.getTime(), max.getTime()));

    if(format) {
      return dateFormat(format, date);
    }

    return date.getTime();
  },

  /**
   * Random Lorem Ipsum text.
   * @param count - Number of generated units. Default is 1.
   * @param units - Units type. Can be words, sentences, or paragraphs. Default is sentences.
   */
  lorem: function(count, units) {
    count = count || 1;
    units = units || 'sentences';

    return faker.lorem[units](count);

  },

  /**
   * Random person name of both genders if no gender is specified.
   * @param [gender]
   */
  firstName: function(gender) {
    gender = gender === 'male' ? 0 : 1;
    return faker.name.firstName(gender);
  },

  // equal lastName
  surname: function() {
    return this.lastName();
  },

  lastName: function() {
    return faker.name.lastName();
  },

  // Random company name.
  company: function() {
    return faker.company.companyName();
  },

  // Random email
  email: function() {
    return faker.internet.email();
  },

  // Random phone number
  phone: function(format) {
    var phonePrefix = [
      135,136,137,138,139,150,
      151,152,157,158,159,187,
      188,130,131,132,155,156,
      185,186,133,153,180,189
    ];

    format = format || faker.random.arrayElement(phonePrefix) + '########';
    format = format.replace(/x/g, '#');

    return faker.phone.phoneNumber(format);
  },

  // Random country
  country: function() {
   return faker.address.country();
  },

  // Random state
  state: function() {
    return faker.address.state();
  },

  // random city
  city: function() {
    return faker.address.city();
  },

  // random street
  street: function() {
    return faker.address.streetName();
  },

  // image
  image: function() {
    return faker.image;
  }

};
