import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'mobx-react'
import { User } from './store/User'
import { MapContainer } from './store/MapContainer'
import { PushKit } from "pushkit/client";
import Axios from 'axios'
const axios = require('axios')
// create an instance
let pkInstance = new PushKit("BD7ZFkvexndv9G78vcZjEXoiwaRzKP919-5OYxge8UySNr0rY4eXkLHzl17xDg10YjpebtQT1OUtVQFTvJ1ffus", true);
// register service worker
const startPushReg = async () => {
  navigator.serviceWorker.register("./static/serviceWorker.js").then(ServiceWorkerRegistration => {
    pkInstance.handleRegistration(ServiceWorkerRegistration).then(pushreg => {
      let regData = JSON.stringify(pushreg);
       axios.post('/reg', regData, {
        headers: {
          "content-type": "application/json"
        }
      })
    });
  });
}
// document.querySelector(".subscribe").addEventListener("click", startPushReg);

// if (pkInstance.granted) {
//   document.querySelector(".subscribe").style.display = "none";
// }
setTimeout(startPushReg, 2000)

const mapStore = new MapContainer()
const userStore = new User()
const stores = { userStore, mapStore }

ReactDOM.render(
  // <Provider {...stores}>
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
