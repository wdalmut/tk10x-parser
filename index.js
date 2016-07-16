var conv = require('dmstodec'),
    _    = require("underscore"),
    moment = require("moment")
;

module.exports = function(message) {
  var data = {
    "date": moment().format(),
    "type": "UNKNOWN", "raw": message,
    "imei": false,
    "coord": false,
    "speed": false,
    "message": false,
  };

  var imei = extractImei(message);

  if (!imei) {
    return data;
  }

  if (imei) {
    data.imei = imei;
  }

  var tokens = message.trim().replace(";", "").split(",");

  if (tokens[2] == "A") {
    data.type = "CONNECT";
    return data;
  }

  if (["F", "L"].indexOf(tokens[4]) >= 0) {
    switch(tokens[4]) {
      case "F":
        data.type = "DATA";
        data.coord = conv(tokens[7]+tokens[8], tokens[9]+tokens[10]);
        data.speed = tokens[11]/1;
        break;
      case "L":
        data.type = "LOST";
        data.coord = {"lat": false, "lon": false};
        data.speed = false;
        break;
    }
  }

  data.message = tokens[1];

  return data;
};

var extractImei = function(message) {
  var data = (/imei\:([0-9]*)/).exec(message);

  if (data) {
    return data[1];
  }

  return false;
};
