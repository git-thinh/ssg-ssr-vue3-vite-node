import Vue from 'vue';
Vue.config.productionTip = false;




import Test from "./templates/Test.vue";


export function __getComponent(name) {
  switch (name) {
    


			case "Test": return Test;

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
