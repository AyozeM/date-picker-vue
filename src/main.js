import Vue from 'vue';
import App from './App.vue';
import bootstrapLoader from './config/bootstrap';
import fontAwesomeLoader from './config/font-awewsome';


//Loaders
fontAwesomeLoader();
bootstrapLoader();

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App)
})
