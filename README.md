# madoka [![Build Status](https://travis-ci.org/Allenice/madoka.png)](https://travis-ci.org/Allenice/madoka/)
madoka is a tool to generate json data.<br>There is provided an online editor to edit json template.[editor](http://allenice.github.io/madoka/editor/) 


[中文文档](README_ZH.md)

## Install
```bash
npm install madoka
```

## Run Test
```bash
# install mocha first
sudo npm install mocha -g

# install dependence
npm install

// run test
npm test
```

## Usage
```javascript
var path = require('path'),
  madoka = require('modoka');


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
    picture: '{{ image.image() }}',
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
  madoka.save(template, path.join(__dirname, 'build/users/' + i + '.json'));
}

console.timeEnd('build');
```

## Api

### madoka.generate(template)
Generate json data.

 - `template`: data template
 
 ```javascript
 var template = '{{ firstName() }}';
 console.log( madoka.generate(template) );   
 ```
 
### madoka.save(template, path)

Generate json data and save to specified path.

 - `template`:  data template
 - `path`: path to save file

### madoka.faker
Generate fake data.

#### **faker.faker**
Instance of [faker.js](https://github.com/Marak/faker.js) , you can use all the methods faker.js provided.

#### **faker.random(arg1, arg2, arg3, ...)**
returns random item from passed arguments list.

#### **faker.integer(min, max, format)**

 Random integer in specified range. Can be negative.
 
 - `min`: Minimum number in the range.
 - `max`: Maximum number in the range.
 - `format`: Number format. For more info visit [http://adamwdraper.github.io/Numeral-js/](http://adamwdraper.github.io/Numeral-js/)

#### **faker.floating(min, max, fixed, format)**
 
Random float in specified range.

- `min`: Minimum number in the range.
- `max`: Maximum number in the range.
- `fixed`: Number of decimals
- `format`: Number format. For more info visit [http://adamwdraper.github.io/Numeral-js/](http://adamwdraper.github.io/Numeral-js/) 

#### **faker.bool()**
Random boolean value.

#### **faker.guid()**
Random globally unique identifier.

#### **faker.objectId()**
MongoDB's globally unique identifier for objects.

#### **faker.date(min, max, format)**
Random date in specified range.

 - `min`: Minimum date in the range. Default is new Date(1970, 0, 1).
 - `max`: Maximum date in the range. Default is new Date().
 - `format`: Date format. For more info visit [http://github.com/hogart/datef](http://github.com/hogart/datef)

#### **faker.lorem(count, units)**
Random Lorem Ipsum text.

 - `count`: Number of generated units. Default is 1.
 - `units`: Units type. Can be words, sentences, or paragraphs. Default is sentences.

#### **faker.firstName(gender)**
Random person name of both genders if no gender is specified.

 - `gender`: male | female
 
#### **faker.surname()** | **faker.lastName()**
Return a last name.

#### **faker.company()**
#### **faker.email()**
#### **faker.country()**
#### **faker.state()**
#### **faker.city()**
#### **faker.street()**

#### **faker.phone(format)**
Random phone number.

 - format:  Format string which contains # letters. Default is "###########".

#### **faker.image**
faker.js  image object.

 - image()
 - imageUrl(width, height, category)
 - avatar()
 - abstract(width, height)
 - animals(width, height)
 - business(width, height)
 - cats(width, height)
 - city(width, height)
 - food(width, height)
 - nightlife(width, height)
 - fashion(width, height)
 - people(width, height)
 - nature(width, height)
 - sports(width, height)
 - technics(width, height)
 - transport(width, height)

#### **faker.imagePl(width, height, options)**
Returns a placeholder image link. visit [http://dummyimage.com](http://dummyimage.com).

 - `width`:  Image width, default is 640.
 - `height`:  Image height, default is 480.
 - `options`: Image options.
 
 ```javascript
 // default options
 {
	    width: 640,
	    height: 480,
	    
	    // array or string， background color.
	    bgColor: ['CCC', 'FF9C5B', 'FAD089', 'FF9C5B', 'ED303C', '3B8183'], 
	    
	     // array or string，text color
	    fgColor: ['333', 'FFF'],
	    
	    format: 'png',
	    text: ''
 }
 ```