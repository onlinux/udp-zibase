/*
 +-+-+-+-+-+-+-+-+-+-+
 |o|n|l|i|n|u|x|.|f|r|
 +-+-+-+-+-+-+-+-+-+-+
 https://github.com/onlinux/udp-zibase

 */

var _ = require('underscore');
var request = require("request");
var S = require('string');

var clientIp = process.env.MYIP || getIPAddress();
var zibaseIp;

var moment = require('moment');
var dateFormat = "MMM DD YYYY HH:mm:ss";
var home;
var debug = false;


var dgram = require('dgram');
var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");

var b = new Buffer(70);

server.on("error", function (err) {
    console.log("Server error:\n" + err.stack);
    server.close();
});

server.on("message", function (msg, rinfo) {
    var date = moment();
    msg = msg.slice(70);
    msg = msg.toString();


    if (!debug) {
        msg = msg.replace(/<(?:.|\n)*?>/gm, ''); // delete all html tags
    }
    console.log(date.format(dateFormat) + " " + msg);
});

server.on("listening", function () {
    var address = server.address();

    console.log("Server listening " +
        address.address + ":" + address.port);
});

client.on('listening', function(){
    client.setBroadcast(true);
    var address = client.address();

    console.log("Server listening " +
        address.address + ":" + address.port);
});

client.on("message", function (msg, rinfo) {
    var date = moment();
    var ip = msg.readUIntBE(38, 4);
    zibaseIp = num2dot(ip);

    console.log(date.format(dateFormat) + ' '+ msg.toString(undefined, 6,12 )+ " " + msg.toString(undefined, 22,34 ) + ' IP is  ' + zibaseIp);
    
    
    if (zibaseIp) {

            //HOST REGISTERING
            b.fill(0);
            b.write('ZSIG\0', 0/*offset*/);
            b.writeUInt16BE(13, 4); //command HOST REGISTERING (13)
            b.writeUInt32BE(dot2num(clientIp), 50); //Ip address
            b.writeUInt32BE(0x42CC, 54); // port 17100 is 0x42CC
        
            var ts = Math.round((new Date()).getTime() / 1000);
            console.log(ts.toString()); //timestamp
            b.writeUInt32BE(ts, 58); // send timestamp as PARAM3 <---------------------------
            console.log('HOST REGISTERING sent to ' + zibaseIp+ ' with  ' + ts.toString() + 'as timestamp');
            client.send(b, 0, b.length, 49999, zibaseIp, function (err, bytes) {
            // client.close();
            });    
    }
});

b.fill(0);
b.write('ZSIG\0', 0/*offset*/);
b.writeUInt16BE(8, 4); // command NOP (08)
// Broadcast msg on lan to retrieve zibase IP
client.send(b, 0, b.length, 49999, '192.168.0.255', function (err, bytes) { 
    console.log(b);
});

server.bind(0x42CC, clientIp); //port 17100 is 0x42CC


process.on('SIGINT', function () {
    console.log("Caught interrupt signal");

    //var client = dgram.createSocket("udp4");
    b.fill(0);
    b.write('ZSIG\0', 0/*offset*/);
    b.writeUInt32BE(dot2num(clientIp), 50); //Ip address
    b.writeUInt32BE(0x42CC, 54); // port 17100 0x42CC
    b.writeUInt16BE(22, 4); //command HOST UNREGISTERING (22)
    console.log(b);
    console.log('HOST UNREGISTERING sent to ' + zibaseIp);
    client.send(b, 0, b.length, 49999, '192.168.0.255', function (err, bytes) {
        console.log("Unregistering...", bytes);
        setTimeout(function () {
            console.log("exit");
            client.close();
            process.exit()
        }, 1000);
    });
});

function dot2num(dot) {
    var d = dot.split('.');
    return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
}

function num2dot(num) {
    var d = num % 256;
    for (var i = 3; i > 0; i--) {
        num = Math.floor(num / 256);
        d = num % 256 + '.' + d;
    }
    return d;
}

function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }

    return '0.0.0.0';
}