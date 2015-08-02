var should = require('should'),
  generator = require('../index');

var template = {
  image: '{{ image.image() }}',
  imageUrl: '{{ image.imageUrl(320, 240, "cats") }}',
  imageAnimal: '{{ image.animals() }}',
  imagePl: '{{ imagePl() }}',
  imagePlWH: '{{ imagePl(320, 240) }}',
  imagePlWO: '{{ imagePl(320, {format: "jpg"}) }}',
  imagePlWHO: '{{ imagePl(320, 240, {bgColor: ["FFF", "CCC"], fgColor: "000"}) }}',
  imagePlO: '{{ imagePl({width: 180, height: 90, text: "hello"}) }}'
};

var result = generator.generate(template);

/*
*
 { image: 'http://lorempixel.com/640/480/nightlife',
 imageUrl: 'http://lorempixel.com/320/240/cats',
 imageAnimal: 'http://lorempixel.com/640/480/animals',
 imagePl: 'http://dummyimage.com/640x480/FAD089/333.png&text=',
 imagePlWH: 'http://dummyimage.com/320x240/FAD089/333.png&text=',
 imagePlWO: 'http://dummyimage.com/320x480/FAD089/FFF.jpg&text=',
 imageWHO: 'http://dummyimage.com/320x240/CCC/000.png&text=',
 imageO: 'http://dummyimage.com/180x90/FAD089/333.png&text=hello' }
* */

describe('image', function() {

  describe('image.image()', function() {
    it('should be a lorempixel image, 640x480', function() {
      var img = result.image;

      should(img).be.a.String('should be a string');
      img.should.match(/^http:\/\/lorempixel\.com\/640\/480\/\w+$/, 'lorempixel image');
    });
  });

  describe('image.imageUrl(320, 240, "cats")', function() {
    it('should be a lorempixel image, size: 320x240, category: cats', function() {
      var img = result.imageUrl;

      should(img).be.a.String('should be a string');
      img.should.match(/^http:\/\/lorempixel\.com\/320\/240\/cats\/?$/, 'lorempixel image, cats, 320x240');
    });
  });

  describe('image.animals()', function() {
    it('should be a lorempixel image, size: 640x480, category: animals', function() {
      var img = result.imageAnimal;

      should(img).be.a.String('should be a string');
      img.should.match(/^http:\/\/lorempixel\.com\/640\/480\/animals\/?$/, 'lorempixel image, animals, 640x480');
    });
  });

  describe('imagePl()', function() {
    it('should be a dummyimage image url, size: 640x480', function() {

    });
  });

});
