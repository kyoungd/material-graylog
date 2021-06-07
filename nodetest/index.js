var graylog2 = require("graylog2");
var logger = new graylog2.graylog({
    servers: [
        { 'host': '127.0.0.1', port: 12201 },
        { 'host': '127.0.0.2', port: 12201 }
    ],
    hostname: 'young-2', // the name of this host
    // (optional, default: os.hostname())
    facility: 'Node.js',     // the facility for these log messages
    // (optional, default: "Node.js")
    bufferSize: 1350         // max UDP packet size, should never exceed the
    // MTU of your system (optional, default: 1400)
});

logger.on('error', function (error) {
    console.error('Error while trying to write to graylog2:', error);
});

logger.log("What we've got here is...failure to communicate", { cool: 'beans' });

logger.error("Really.  What we've got here is...failure to communicate", { cool: 'beans' });

logger.alert("Really, really.  What we've got here is...failure to communicate", { cool: 'beans' });

logger.critical("Really, really.  What we've got here is...failure to communicate", { cool: 'beans' });


// { "message": "Just an info log with count 2", "levelname": "INFO", "name": "root", "asctime": "2021-06-06 14:02:48,279" }
