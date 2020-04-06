// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

var myDebounce = (cb, wait) => {
  let timeInterval;
  return function (...args){
    let context = this;
    clearInterval(timeInterval);
    timeInterval = setTimeout(cb.apply(context,args),wait);
  }
}
function sayHello(ele) {
  console.log(this)
  console.log('My name is called')
}

myDebounce(sayHello,1000)()
// const amy = {
//   name: 'amy',
//   speak: myDebounce(sayHello,10000),
// }

// amy.speak()