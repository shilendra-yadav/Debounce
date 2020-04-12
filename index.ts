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

var CustomPromise = function (cb){
  this.promiseChain = [];
  this.handleError = () => {};
  this.onResolve = this.onResolve.bind(this);
  this.onReject = this.onResolve.bind(this);
  cb(this.onResolve, this.onReject)
}

CustomPromise.prototype.then = function (onResolve){
  this.promiseChain.push(onResolve);
  return this;
  
}

CustomPromise.prototype.onResolve = function (value) {
  try {
    let storedValue = value;
    this.promiseChain.forEach(nextFunc => {
      storedValue = nextFunc(storedValue);
    });
  } catch (error){
    this.promiseChain = [];
    this.onReject(error);
  }
}

CustomPromise.prototype.catch = function (handleErrorCb){
  this.handleError = handleErrorCb;
  return this;
}

CustomPromise.prototype.onReject = function (error){
  this.handleError(error);
}

// TESTING

const pr = new CustomPromise((resolve, reject) => {
	setTimeout(() => {
		if (true) {
			resolve("Success!!");
		} else {
			reject("Failure!");
		}
	}, 1000);
});


pr
.then(result => result + "1")
.then(prev => prev + "2")
.then(prev => console.log(prev+"3"))
.catch(error => console.log(error));
