// src/utils/loader.js
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

let requestCount = 0;

const startLoader = () => {
  if (requestCount === 0) NProgress.start();
  requestCount++;
};

const stopLoader = () => {
  requestCount--;
  if (requestCount <= 0) {
    requestCount = 0;
    setTimeout(() => NProgress.done(), 300); 
  }
};

export { startLoader, stopLoader };
