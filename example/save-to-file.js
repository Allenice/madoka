
var path = require('path'),
  generator = require('../index');


var template = [
  '{{ repeat(5,7) }}',
  {
    _id: '{{ objectId() }}',
    index: '{{ index() }}',
    guid: '{{ guid() }}',
    isActive: '{{ bool() }}',
    selfIntroduction: function(faker) {
      return 'My name is ' + this.name + '. Generate before name is parsed';
    },
    balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
    picture: '{{ faker.image.image() }}',
    age: '{{ integer(20, 40) }}',
    eyeColor: '{{ random("blue", "brown", "green") }}',
    name: '{{ firstName() }} {{ lastName() }}',
    compay: '{{ company().toUpperCase() }}',
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

console.time('build');


for(var i = 1; i < 4; i++) {
  generator.save(template, path.join(__dirname, 'build/users/' + i + '.json'));
}

console.timeEnd('build');
