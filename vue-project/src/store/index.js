import { createStore } from 'vuex';
import companyModule from './modules/company-module';

const store = createStore({
  modules: {
    companyModule
  }
});

export default store;
