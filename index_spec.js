var parse = require('.');

describe("check the parsing strategy", function() {
  it("should reply with an unknow message type", function() {
    var data = parse("nothing");

    expect("UNKNOWN").toEqual(data.type);
    expect("nothing").toEqual(data.raw);
  });

  it("should recognize the connect statement", function() {
    var data = parse("##,imei:359586015829802,A;");

    expect("CONNECT").toEqual(data.type);
    expect("359586015829802").toEqual(data.imei);
  });

  it("should recognize the data statement", function() {
    var data = parse("imei:359586015829802,help me,0809231429,13554900601,F,062947.294,A,2234.4026,N,11354.3277,E,0.00,;");

    expect("DATA").toEqual(data.type);
    expect("359586015829802").toEqual(data.imei);
    expect(22.573377).toEqual(data.coord.lat);
    expect(113.905462).toEqual(data.coord.lon);
    expect(0).toEqual(data.speed);
    expect("help me", data.message);
  });

  it("should recognize the missing position data statement", function() {
    var data = parse("imei:359586015829802,tracker,160712071423,,L,,,8a51,,3452,,,");

    expect("LOST").toEqual(data.type);
    expect("359586015829802").toEqual(data.imei);
    expect(false).toEqual(data.coord.lat);
    expect(false).toEqual(data.coord.lon);
    expect(false).toEqual(data.speed);
    expect("tracker", data.message);
  });
});
