
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var requrl = '';

var options = {
  url : 'http://jandan.net/pic/page-9588',
  headers : {
    'User-Agent' :
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    'Cookie' :
        '_gat=1; jdna=596e6fb28c1bb47f949e65e1ae03f7f5#1471488768216; Hm_lvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1470198129,1470284723,1470371335,1471488264; Hm_lpvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1471488769; _ga=GA1.2.1349575181.1470371334; 3612242115=c5d6IcvWjNtZ4qh9U1WdVOSNMJc4x2jWyQmSBu5GVg; jdna=596e6fb28c1bb47f949e65e1ae03f7f5#1471488815288; Hm_lvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1470198129,1470284723,1470371335,1471488264; Hm_lpvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1471488816; _ga=GA1.2.1349575181.1470371334'
  }
};
getlist();
function getlist() {
  var temp;
  for (i = 2000; i < 2001; i++) {
    temp = {
      url : 'http://jandan.net/ooxx/page-' + i,
      headers : {
        'User-Agent' :
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        'Cookie' :
            '_gat=1; jdna=596e6fb28c1bb47f949e65e1ae03f7f5#1471488768216; Hm_lvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1470198129,1470284723,1470371335,1471488264; Hm_lpvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1471488769; _ga=GA1.2.1349575181.1470371334; 3612242115=c5d6IcvWjNtZ4qh9U1WdVOSNMJc4x2jWyQmSBu5GVg; jdna=596e6fb28c1bb47f949e65e1ae03f7f5#1471488815288; Hm_lvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1470198129,1470284723,1470371335,1471488264; Hm_lpvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1471488816; _ga=GA1.2.1349575181.1470371334'
      }
    };

    request(temp, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body); //返回请求页面的HTML
        acquireData(body);
      } else {
        console.log(response.statusCode);
        console.log(body);
      }
    });
  }
}

function acquireData(data) {
  var $ = cheerio.load(data);

  var meizi = $('.text img').toArray();
  console.log(meizi.length);
  var len = meizi.length;
  for (var i = 0; i < len; i++) {
    var imgsrc = meizi[i].attribs.src;
    console.log(imgsrc);
    var filename = parseUrlForFileName(imgsrc); //生成文件名
    downloadImg(imgsrc, filename, (function(fname) {
                  var filename = fname;
                  return function() { console.log(filename + ' done'); }
                })(filename));
  }
}

function parseUrlForFileName(address) {
  var filename = path.basename(address);
  return filename;
}

var downloadImg = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    // console.log('content-type:', res.headers['content-type']);
    // //这里返回图片的类型
    // console.log('content-length:', res.headers['content-length']); //图片大小
    if (err) {
      console.log('err: ' + err);
      return false;
    }
    console.log('res: ' + res);
    request(uri)
        .pipe(fs.createWriteStream('images/' + filename))
        .on('close', callback); //调用request的管道来下载到 images文件夹下
  });
};
