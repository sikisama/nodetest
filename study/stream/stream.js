var fs = require('fs');
var zlib = require('zlib');
/*
var data = '';
var readStream = fs.createReadStream('a.txt');
readStream.setEncoding('utf8');
readStream.on('data', function(chunk) { data += chunk; });
readStream.on('end', function() { console.log(data); });
readStream.on('error', function(err) { console.log(err.stack); });
*/
/*

var
var writeStream = fs.createWriteStream('a.txt');
writeStream.write('我擦雷', 'utf8');
writeStream.end();

writeStream.on('finish', function() { console.log('write finish'); });
*/

var readStream = fs.createReadStream('a.txt');
var writeStream = fs.createWriteStream('b.txt');

readStream.pipe(writeStream);

fs.createReadStream('a.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('c.txt.gz'));

fs.createReadStream('c.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('d.txt'));
