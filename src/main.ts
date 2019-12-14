import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import firebase from 'firebase';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyBeBGXc0Rm6Ep2mJU18Sl3_ItGv9f2QnW0',
  authDomain: 'iot-yam.firebaseapp.com',
  databaseURL: 'https://iot-yam.firebaseio.com',
  projectId: 'iot-yam',
  storageBucket: 'iot-yam.appspot.com',
  messagingSenderId: '291931611153',
  appId: '1:291931611153:web:b86190b4668a16a5e011b0',
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
