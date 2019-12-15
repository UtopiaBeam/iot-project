import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false;

let app: Vue | null = null;

const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG);

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
