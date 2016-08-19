var buf = Buffer('mageji');
len = buf.length;
console.log('write ' + len);
console.log(buf.toString('utf8', 0, len));
console.log(buf.toJSON());

buf = new Buffer(26);
for (var i = 0; i < 26; i++) {
  buf[i] = i + 97;
}

console.log(buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii', 0, 5)); // 输出: abcde
console.log(buf.toString('utf8', 0, 5));  // 输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcde

var buffer1 = new Buffer('AAA ');
var buffer2 = new Buffer('BBB');
var buffer3 = Buffer.concat([ buffer1, buffer2 ]);
console.log("buffer3 内容: " + buffer3.toString());
