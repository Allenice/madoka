var should = require('should'),
    generator = require('../index');

var template = {
  integer_default: '{{ integer() }}',
  integer: '{{ integer(-100, 100) }}',
  integer_string: '{{ integer(-100, 100) }} str',
  integer_format: '{{ integer(-10000, 100000, "$0,0") }}'
};

var result = generator.generate(template);

describe('integer', function() {

  describe('integer()', function() {
    it('should be a integer. >= 0 and <= 1', function() {
      var num = result.integer_default,
          numStr = num + '';

      numStr.should.match(/^[-+]?\d+$/, 'integer string');
      should(num).be.a.Number();
      should.ok(num >= 0 && num <= 1, '>= 0 and <= 1');
    });
  });

  describe('integer(-100, 100)', function() {
    it('should be a integer string. >= -100 and <= 100', function() {
      var num = result.integer,
        numStr = num + '';

      numStr.should.match(/^[-+]?\d+$/, 'integer string');
      should(num).be.a.Number();

      should.ok(num >= -100 && num <= 100, '>= -100 and <= 100');
    });
  });

  describe('integer(-100, 100) str', function() {
    it('should be a string', function() {
      should(result.integer_string).be.a.String('with str');
    })
  });

  describe('integer(-10000, 100000, "$0,0")', function() {
    it('should be a string with format "$0,0"', function() {
      should(result.integer_format).be.a.String();
      result.integer_format.should.match(/^[-+]?\$\d{0,3}(,\d{3})*$/, '$0,0 format')
    })
  });

});
