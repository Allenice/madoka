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
      var img = result.imagePl;
      should(img).be.a.String('should be a string');
      img.should.match(/^http:\/\/dummyimage\.com\/640x480\/\w+\/\w+\.png&text=$/, 'dummyimage image, 640x480');
    });
  });

  describe('imagePl(320, 240)', function() {
    it('should be a dummyimage image url, size: 320x240', function() {
      var img = result.imagePlWH;
      should(img).be.a.String('should be a string');
      img.should.match(/^http:\/\/dummyimage\.com\/320x240\/\w+\/\w+\.png&text=$/, 'dummyimage image, 320x240');
    });
  });

  describe('imagePl(320, {format: "jpg"})', function() {
    it('should be a dummyimage image url, size: 320x480', function() {
      var img = result.imagePlWO;
      should(img).be.a.String('should be a string');
      img.should.match(/^http:\/\/dummyimage\.com\/320x480\/\w+\/\w+\.jpg&text=$/, 'dummyimage image, 320x480, jpg');
    });
  });

  describe('imagePl(320, 240, {bgColor: ["FFF", "CCC"], fgColor: "000"})', function() {
    it('should be a dummyimage image url, size: 320x480', function() {
      var img = result.imagePlWHO;
      should(img).be.a.String('should be a string');
      img.should.match(/^http:\/\/dummyimage\.com\/320x240\/\w{3}\/000\.png&text=$/, 'dummyimage image, 320x240');
    });
  });

  describe('imagePl({width: 180, height: 90, text: "hello"})', function() {
    it('should be a dummyimage image url, size: 180x90', function() {
      var img = result.imagePlO;
      should(img).be.a.String('should be a string');
      img.should.match(/^http:\/\/dummyimage\.com\/180x90\/\w+\/\w+\.png&text=hello$/, 'dummyimage image, 180x90, hello');
    });
  });

});
