import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import { User } from './store/User'
import { MapContainer } from './store/MapContainer'



// const startPushReg = async () => {
//   navigator.serviceWorker.register("./serviceWorker.js").then(ServiceWorkerRegistration => {
//     debugger
//     pkInstance.handleRegistration(ServiceWorkerRegistration).then(pushreg => {

//       debugger
//       let regData = JSON.stringify(pushreg);

//     });
//   });
// }
// document.querySelector(".subscribe").addEventListener("click", startPushReg);

// if (pkInstance.granted) {
//   document.querySelector(".subscribe").style.display = "none";
// }

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
// serviceWorker.unregister();
