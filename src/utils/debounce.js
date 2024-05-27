export const debounce = (func, wait, immediate) => {
  // console.log("debounce");
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) {
        console.log("called later");

        func.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
};
// export const debounce = (callback, wait) => {
//   console.log("debounce");
//   // initialize the timer
//   let timer = 0;

//   // ...
//   // lots of code involving the actual implementation of timer
//   // to track the time passed since the last callback call
//   // ...

//   const startTimer = (callbackFunc) => {
//     timer = Date.now();
//     // debounce(callbackFunc, wait);
//   };

//   const shouldCallCallback = (now) => {
//     console.log("shouldCallCallback now:", now);
//     return now > timer + wait;
//   };

//   const debouncedFunc = () => {
//     console.log("debouncedFunc");
//     // // checking whether the waiting time has passed
//     // if (shouldCallCallback(Date.now())) {
//     //   console.log("calling callback");
//     //   console.log("timer", timer);
//     //   console.log("wait", wait);
//     //   callback();
//     // } else {
//     //   // if time hasn't passed yet, restart the timer
//     //   timer = startTimer(callback);
//     // }
//   };

//   return debouncedFunc;
// };
