// Import stylesheets

var myDebounce = (cb, wait) => {
  let timeInterval;
  return function (...args){
    let context = this;
    clearInterval(timeInterval);
    timeInterval = setTimeout(cb.apply(context,args),wait);
  }
}

function sayHello(ele) {
  console.log(ele)
  console.log('My name is called')
}

myDebounce(sayHello,1000)(10)

var myThrottle = (cb, wait) => {
  let interval;
  return function (...args){
    let context = this;
    if(!interval){ 
      cb.apply(context, args);
      interval = true
      setTimeout(() => interval = false, wait)
    }
  }
}