import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(VueResource);

const dictionary = {
  en: {
    messages: {
      email: function () {
        return "Wrong email address format"
      }
    }
  }
};

VeeValidate.Validator.updateDictionary(dictionary);

new Vue({
  el: '#app',
  render: h => h(App)
})
