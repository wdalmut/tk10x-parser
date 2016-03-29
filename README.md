# Parser for TK-10x GPS module

Just a simple parser for TK-10x (TK-104) GPS module

```js
var parse = require('tk10x-parser');

var data = parse('imei:359586015829802,help me,0809231429,13554900601,F,062947.294,A,2234.4026,N,11354.3277,E,0.00,;');
```

```json
{
  "date": "2016-03-29 10:25:32",
  "type": "DATA",
  "raw": "imei:359586015829802,help me,0809231429,13554900601,F,062947.294,A,2234.4026,N,11354.3277,E,0.00,;",
  "imei": "359586015829802",
  "coord": { "lat": 22.573377, "lon": 113.905462 },
  "speed": 0,
  "message": "help me"
}
```

## Tracker connect

During the tracker connection

```json
{
  "date": "2016-03-29 10:27:50",
  "type": "CONNECT",
  "raw": "##,imei:359586015829802,A;",
  "imei": "359586015829802",
  "coord": false,
  "speed": false,
  "message": false
}
```

## Invalid messages

On invalid messages the parser reply with:

```json
{
  "date": "2016-03-29 10:27:06",
  "type": "UNKNOWN",
  "raw": "nothing",
  "imei": false,
  "coord": false,
  "speed": false,
  "message": false
}
```

