const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
    console.log('이벤트 1');
})
myEvent.on('event2', () => {
    console.log('이벤트 2');
})
myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
})

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.once('event3', () => {
    console.log('이벤트 3');
})

myEvent.emit('event3');
myEvent.emit('event3');

myEvent.removeAllListeners('event1');
myEvent.emit('event1');
myEvent.emit('event2');

const listener = () => {
    console.log('이벤트 4');
}

myEvent.on('event4', listener);
myEvent.emit('event4')
myEvent.removeListener('event4', listener);
myEvent.emit('event4')

console.log(myEvent.listenerCount('event2'))