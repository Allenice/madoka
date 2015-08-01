var generator = require('../index');


var template = {
  id: '{{ objectId() }}',
  random: '{{ random("arg1", "arg2", "arg3") }}',
  integer: '{{ integer(10, 100) }}',
  integer_format: '{{ integer(1000, 100000, "0,0") }}',
  floating: '{{ floating(-0.1, 100.5, 2) }}',
  bool: '{{ bool() }}',
  guid: '{{ guid() }}',
  date: '{{date(new Date(2013, 11, 1), "YYYY-MM-dd HH:mm:ss")}}',
  lorem: '{{ lorem(2) }}',
  firstName: '{{ firstName("female") }}',
  lastName: '{{ lastName() }}',
  company: '{{ company() }}',
  email: '{{ email() }}',
  phone: '{{ phone() }}',
  country: '{{ country() }}',
  zipCode: '{{ faker.address.zipCode() }}',
  picture: '{{ image.imageUrl(320, 240) }}',
  picturePl: '{{ imagePl(320, 240, {format: "jpg", text: "hello"}) }}',
  picturePl2: '{{ imagePl() }}',
  picturePl3: '{{ imagePl({bgColor: "F00"}) }}'
};

console.time('build');
console.log(generator.generate(template));
console.timeEnd('build');
