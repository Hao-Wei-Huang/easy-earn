import Vue from 'vue';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// vee-validate
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
// bootsrap
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import '@/assets/scss/main.scss';
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser, faChartLine, faCoins, faHandHoldingUsd, faChevronRight, faTimes, faCheck,
  faUnlockAlt, faSortUp, faSortDown, faArrowRight, faArrowUp, faArrowDown, faSearch,
  faPlus, faClipboardList, faTrashAlt, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import {

} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import conditionTypeFilter from '@/filters/condition-type';
import conditionContentFilter from '@/filters/condition-content';
import conditionUnitFilter from '@/filters/condition-unit';
import thousandSeparatorFilter from '@/filters/thousand-separator';
import decimalFilter from '@/filters/decimal';
import Searchbar from '@/components/Searchbar.vue';
import App from './App.vue';
import router from './router';
// global
window.$ = $;
Vue.config.productionTip = false;
// prototype
Vue.use(VueAxios, axios);
// componet
Vue.component('Loading', Loading);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.component('Searchbar', Searchbar);
// filter
Vue.filter('conditionTypeFilter', conditionTypeFilter);
Vue.filter('conditionContentFilter', conditionContentFilter);
Vue.filter('conditionUnitFilter', conditionUnitFilter);
Vue.filter('thousandSeparatorFilter', thousandSeparatorFilter);
Vue.filter('decimalFilter', decimalFilter);

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('tw', zhTW);
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
// fontawesome
library.add(faUser, faChartLine, faCoins, faHandHoldingUsd, faChevronRight, faTimes,
  faCheck, faUnlockAlt, faSortUp, faSortDown, faArrowRight, faArrowUp, faArrowDown, faSearch,
  faPlus, faClipboardList, faTrashAlt, faCheckCircle);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
