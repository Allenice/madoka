var should = require('should'),
    generator = require('../index');

var template = [
  '{{ repeat(5, 7) }}',
  {
    _id: '{{ objectId() }}',
    index: '{{ index() }}',
    guid: '{{ guid() }}',
    isActive: '{{ bool() }}',
    selfIntroduction: function(faker) {
      return this.name;
    },
    email: '{{ email() }}',
    balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
    picture: '{{ faker.image.image() }}',
    age: '{{ integer(20, 40) }}',
    eyeColor: '{{ random("blue", "brown", "green") }}',
    name: '{{ firstName() }} {{ lastName() }}',
    company: '{{ company().toUpperCase() }}',
    phone: '{{ phone() }}',
    address: '{{ state() }}, {{ city() }}, {{ street() }}, {{ faker.address.zipCode() }}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-dd hh:mm:ss Z")}}',
    tags: [
      '{{ repeat(7) }}',
      '{{ lorem(1, "words") }}'
    ],
    greeting: function(faker) {
      return 'Hello, ' + this.name + ' You have ' + faker.integer(10, 100) + ' unread message';
    }
  }
];

var result = generator.generate(template);
var item1 = result[0];
var item2 = result[1];

// begin test
describe('main point', function() {

  // test repeat
  describe('#repeat()', function() {

    describe('#repeat(5, 7)', function() {
      it('should be an array. 5 <= length <= 7', function() {
        should(result).be.a.Array();
        should.ok(result.length >= 5 && result.length <= 7, '5 <= length <= 7');
      });
    });

    describe('#repeat(7)', function() {
      it('should be an array. length = 7', function() {
        should(item1.tags).be.a.Array();
        should.equal(item1.tags.length, 7, 'length = 7');
        should(item2.tags).be.a.Array();
        should.equal(item2.tags.length, 7, 'length = 7');
      });
    });

  });

  // test objectId
  describe('#objectId()', function() {
    it('should be a string. length = 24', function() {
      var objectId = item1._id;

      should(objectId).be.a.String();
      should.equal(objectId.length, 24, 'length = 24');
    });
  });

  // test index
  describe('#index()', function() {

    describe('item1.index = 0', function() {
      it('should be equal 0.', function() {
        should.equal(item1.index, 0);
      });
    });

    describe('item2.index = 1', function() {
      it('should be equal 1.', function() {
        should.equal(item2.index, 1);
      });
    });

  });

  // test guid
  describe('#guid()', function() {
    it('should be a guid string', function() {
      var str = item1.guid;
      var reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      should.ok(reg.test(str));
    });
  });

  // test bool
  describe('#bool()', function() {
    it('should be a boolean value.', function() {
      should(item1.isActive).be.a.Boolean();
      should(item2.isActive).be.a.Boolean();
    });
  });

  // test function
  describe('#function', function() {
    describe('before property parse', function() {
      it('should be able to use item property with "this"', function() {
        should.equal(item1.selfIntroduction, item1.name);
      });
    });

    describe('after property parse', function() {
      it('should be able to use item property with "this"', function() {
        var reg = new RegExp(item1.name);
        should.ok(reg.test(item1.greeting));
      });
    });
  });

  // test random
  describe('#random()', function() {
    it('should equal a parameter in random()', function() {
      item1.eyeColor.should.match(/blue|brown|green/);
      item2.eyeColor.should.match(/blue|brown|green/);
    });
  });

});
