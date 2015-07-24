var should = require('should'),
  generator = require('../index');

var template = {
  floating: '{{ floating() }}'
};

var result = generator.generate(template);
describe('floating', function() {

  describe('floating()', function() {
    it('should be a float string. >= 0 and <= 1', function() {
      var num = parseFloat(result.floating);
      result.floating.should.match(/^[-+]?\d*\.?\d+$/, 'float string');
      should.ok(num >= 0 && num <= 1, '>= 0 and <= 1');
    });
  });

});
