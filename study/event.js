var events = require('events');
var eventEmitter = new events.EventEmitter();

var listenerA = function() { console.log('listenerA is working!'); }

var listenerB = function() { console.log('listenerB is working!'); }
                //绑定监听事件
                eventEmitter.on('connect', listenerA);
eventEmitter.addListener('connect', listenerB);

//触发事件
eventEmitter.emit('connect');

//移除事件
eventEmitter.removeListener('connect', listenerA);
console.log('remove listenerA');

//触发事件
eventEmitter.emit('connect');

//监听器数量
count = require('events').EventEmitter.listenerCount(eventEmitter, 'connect');
console.log('connect nums is ' + count);
