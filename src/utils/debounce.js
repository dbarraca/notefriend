export const debounce = (callback, wait) => {
    // initialize the timer
    let timer;
  
    // ...
    // lots of code involving the actual implementation of timer
    // to track the time passed since the last callback call
    // ...
  
    const startTimer = (callbackFunc) => {
      timer = Date.now();
      // debounce(callbackFunc, wait);
    }
  
    const shouldCallCallback = (now) => {
      return now > timer + wait;
    };
  
    const debouncedFunc = () => {
      // checking whether the waiting time has passed
      if (shouldCallCallback(Date.now())) {
          console.log("calling callback");
          console.log("timer", timer);
          console.log("wait", wait);
        callback();
      } else {
        // if time hasn't passed yet, restart the timer
        timer = startTimer(callback);
      }
    };
  
    return debouncedFunc;
  };
  