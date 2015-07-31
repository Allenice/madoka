var should = require('should'),
  generator = require('../index');

var template = {
  floating: '{{ floating() }}',
  floating2: '{{ floating(-100.324, 100.555) }}',
  floating3: '{{ floating(-100.3423, 100.3242, 2) }}',
  floating4: '{{ floating(-10000.3423, 10000.3242, null, "0,0.0") }}'
};

var result = generator.generate(template);

describe('floating', function() {

  describe('floating()', function() {
    it('should be a float. >= 0 and <= 1', function() {
      var num = result.floating,
          numStr = num + '';

      numStr.should.match(/^[-+]?\d*\.?\d+$/, 'float string');
      should.ok(num >= 0 && num <= 1, '>= 0 and <= 1');
    });
  });

  describe('floating(-100.324, 100.555)', function() {
    it('should be a float. >= -100.324 and <= 100.555', function() {
      var num = result.floating2,
          numStr = num + '';

      numStr.should.match(/^[-+]?\d*\.?\d+$/, 'float string');
      should.ok(num >= -100.324 && num <= 100.555, '>= -100.324 and <= 100.555');
    });
  });

  describe('floating(-100.324, 100.555, 2)', function() {
    it('should be a float. >= -100.324 and <= 100.555 and with two decimal places', function() {
      var num = result.floating3,
          numStr = num + '';

      numStr.should.match(/^[-+]?\d*\.?\d+$/, 'float string');
      numStr.should.match(/\d+.\d{2}/, 'two decimal places')
      should.ok(num >= -100.324 && num <= 100.555, '>= -100.324 and <= 100.555');
    });
  });

  describe('floating(-10000.3423, 10000.3242, null, "0,0.0")', function() {
    it('should be a string.  and with format "0,0.0"', function() {
      result.floating4.should.match(/^[-+]?\d{0,3}(,\d{3})*(\.\d+)?$/, '0,0.0 format');
    });
  });

});
