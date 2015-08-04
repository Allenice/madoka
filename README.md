# madoka [![Build Status](https://travis-ci.org/Allenice/madoka.png)](https://travis-ci.org/Allenice/madoka/)
madoka 是一个生成 json 数据的工具。<br> 这里提供了一个在线编辑 json 的模板的编辑器。[editor](http://allenice.github.io/madoka/editor/) 

## 安装
```bash
# under development
# npm install madoka
```

## 运行测试
```bash
// 请先安装 mocha
sudo npm install mocha -g

// 安装依赖包
npm install

// 运行测试
npm test
```

## 使用
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
生成 json 数据。

 - template: 数据模板
 
 ```javascript
 var template = '{{ firstName() }}';
 console.log( madoka.generate(template) );   
 ```
 
### madoka.save(template, path)

生成 json 数据并保存到指定路径。

 - template:  数据模板
 - path: 保存路径

### madoka.faker
生成模拟数据。

#### **faker.faker**
[faker.js](https://github.com/Marak/faker.js) 实例，可以使用全部 faker.js 提供的方法。

#### **faker.random(arg1, arg2, arg3, ...)**
从参数列表中随机返回一个值

#### **faker.integer(min, max, format)**

 从指定范围中返回一个随机整数，可以是负值。
 
 - min: 范围最小值
 - max: 范围最大值
 - format: 格式化返回的数字，请参考：[http://adamwdraper.github.io/Numeral-js/](http://adamwdraper.github.io/Numeral-js/)

#### **faker.floating(min, max, fixed, format)**
 
从指定范围中返回一个随机浮点数，可以是负值。

- min: 范围最小值
- max: 范围最大值
- fixed: 浮点数的精度
- format: 格式化返回的数字，请参考：[http://adamwdraper.github.io/Numeral-js/](http://adamwdraper.github.io/Numeral-js/) 

#### **faker.bool()**
返回一个随机的布尔值

#### **faker.guid()**
返回一个唯一标记符

#### **faker.objectId()**
返回一个 MongoDB 的 objectId。

#### **faker.date(min, max, format)**
从指定的日期范围中随机返回一个日期。不指定 format 的话，返回时间戳。

 - min: 最小日期，默认值是 new Date(0), 也就是 1970-01-01
 - max: 最大日期，默认值是 new Date()
 - format: 格式化返回的日期，请参考：[http://github.com/hogart/datef](http://github.com/hogart/datef)

#### **faker.lorem(count, units)**
随机返回文本

 - count: 指定单位的数量，默认值是 1
 - units: 文本单位，取值：words | sentences | paragraphs

#### **faker.firstName(gender)**
返回 fisrt name, 可以传入 gender 返回男或女名。

 - gender: male|femal  性别
 
#### **faker.surname()** | **faker.lastName()**
返回一个姓。

#### **faker.company()**
#### **faker.email()**
#### **faker.country()**
#### **faker.state()**
#### **faker.city()**
#### **faker.street()**

#### **faker.phone(format)**
返回电话号码

 - format:  使用"#"为占位符格式号码。 默认是 11 位格式的号码。

#### **faker.image**
faker.js 的 image 对象。

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
返回一个占位图片链接。查看 [http://dummyimage.com](http://dummyimage.com).

 - width: 图片宽度，默认 640
 - height: 图片高度，默认 480
 - options: 图片配置项
 
 ```javascript
 // 默认配置
 {
	    width: 640,
	    height: 480,
	    bgColor: ['CCC', 'FF9C5B', 'FAD089', 'FF9C5B', 'ED303C', '3B8183'], // array or string
	    fgColor: ['333', 'FFF'], // array or string
	    format: 'png',
	    text: ''
 }
 ```