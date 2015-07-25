var should = require('should'),
  generator = require('../index');

var template = {
  bool1: '{{ bool() }}',
  bool2: '{{ bool() }} '
};

var result = generator.generate(template);

describe('bool', function() {

  describe('bool()', function() {
    it('should be a bool value', function() {
      should(result.bool1).be.a.Boolean('bool value');
    });
  });

  describe('bool() with space', function() {
    it('should be a string', function() {
      should(result.bool2).be.a.String();
    });
  });

});
