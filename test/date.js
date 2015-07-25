var should = require('should'),
  generator = require('../index');

var template = {
  date1: '{{ date() }}',
  date2: '{{ date(new Date(2014, 5, 1)) }}',
  date3: '{{ date(new Date(2014, 5, 1), new Date(2014, 5, 4)) }}',
  date4: '{{ date(new Date(2014, 5, 1), new Date(2014, 5, 4), "YYYY-MM-dd") }}',
  date5: '{{ date(new Date(2014, 5, 1), "YYYY-MM-dd") }}',
  date6: '{{ date("YYYY-MM-dd HH:mm:ss") }}'
};

var result = generator.generate(template);

describe('date', function() {

  describe('date()', function() {

    it('should be a timestamp string, date >= (1970-01-01) and date <= now', function() {
      var time = parseInt(result.date1),
          minTime = new Date(0).getTime(),
          maxTime = Date.now();
      
      result.date1.should.match(/^\d{0,14}$/, 'timestamp string');
      should.ok(time >= minTime && time <= maxTime, 'date >= (1970-01-01) and date <= now');

    });

  });

  describe('date(new Date(2014, 5, 1))', function() {
    it('should be a timestamp string, date >= (2014-06-01) and date <= now', function() {
      var time = parseInt(result.date2),
        minTime = new Date(2014, 5, 1).getTime(),
        maxTime = Date.now();

      result.date2.should.match(/^\d{0,14}$/, 'timestamp string');
      should.ok(time >= minTime && time <= maxTime, 'date >= (2014-06-01) and date <= now');

    });
  });

  describe('date(new Date(2014, 5, 1), new Date(2014, 5, 4))', function() {
    it('should be a timestamp string, date >= (2014-06-01) and date <= (2014-06-04)', function() {
      var time = parseInt(result.date3),
        minTime = new Date(2014, 5, 1).getTime(),
        maxTime = new Date(2014, 5, 4).getTime();

      result.date3.should.match(/^\d{0,14}$/, 'timestamp string');
      should.ok(time >= minTime && time <= maxTime, 'date >= (2014-06-01) and date <= (2014-06-04)');

    });
  });

  describe('date(new Date(2014, 5, 1), new Date(2014, 5, 4), "YYYY-MM-dd")', function() {
    it('should be a string, date >= (2014-06-01) and date <= (2014-06-04), with format "YYYY-MM-dd"', function() {
      var time = new Date(result.date4).getTime(),
        minTime = new Date(2014, 5, 1).getTime(),
        maxTime = new Date(2014, 5, 4).getTime();

      result.date4.should.match(/^\d{4}-\d{2}-\d{2}$/, 'format "YYYY-MM-dd"');
      should.ok(time >= minTime && time <= maxTime, 'date >= (2014-06-01) and date <= (2014-06-04)');

    });
  });

  describe('date(new Date(2014, 5, 1), "YYYY-MM-dd")', function() {
    it('should be a string, date >= (2014-06-01) and date <= now, with format "YYYY-MM-dd"', function() {
      var time = new Date(result.date5).getTime(),
        minTime = new Date(2014, 5, 1).getTime(),
        maxTime = Date.now();

      result.date5.should.match(/^\d{4}-\d{2}-\d{2}$/, 'format "YYYY-MM-dd"');
      should.ok(time >= minTime && time <= maxTime, 'date >= (2014-06-01) and date <= now');

    });
  });

  describe('date("YYYY-MM-dd HH:mm:ss")', function() {
    it('should be a string, date >= (1970-01-01) and date <= now, with format "YYYY-MM-dd HH:mm:ss"', function() {
      var time = new Date(result.date6).getTime(),
        minTime = new Date(0).getTime(),
        maxTime = Date.now();

      result.date6.should.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/, 'format "YYYY-MM-dd HH:mm:ss"');
      should.ok(time >= minTime && time <= maxTime, 'date >= (1970-01-01) and date <= now');

    });
  });



});
