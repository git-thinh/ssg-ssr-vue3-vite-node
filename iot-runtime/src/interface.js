import Vue from 'vue';
Vue.config.productionTip = false;




import IotInput from "./templates/IotInput.vue";
import IotMenu from "./templates/IotMenu.vue";
import IotMenuBoxSearch from "./templates/IotMenuBoxSearch.vue";


export function __getComponent(name) {
  switch (name) {
    


			case "IotInput": return IotInput;
			case "IotMenu": return IotMenu;
			case "IotMenuBoxSearch": return IotMenuBoxSearch;

  }
  return null;
}

export function __getVueElement(name) {
  const v = new Vue({
    render: function(h) {
      const c = __getComponent(name);
      if (c) {
        const fn = h(c);
        return fn;
      } else return h('div');
    }
  }).$mount();
  return document.createElement('div').appendChild(v.$el);
}
