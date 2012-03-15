h1. winston-amon

An Amon transport for [winston][0].

h2. Installation

h3. Installing winston-amon

``` bash
  $ sudo npm install winston-amon
```

## Usage
``` js
  var winston = require('winston');
  
  //
  // Requiring `winston-amon` will expose 
  // `winston.transports.Amon`
  //
  require('winston-amon').Amon;
  
  winston.add(winston.transports.Amon, options);
```

The Amon transport takes the following options:

* __level:__ Level of messages that this transport should log. 
* __silent:__ Boolean flag indicating whether to suppress output.
* __host:__ The host running Amon, defaults to 127.0.0.1.
* __port:__ The port on the host that Amon is running on, defaults to Amon's default port.

[0]: https://github.com/flatiron/winston
