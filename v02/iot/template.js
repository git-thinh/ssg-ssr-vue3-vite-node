import Vue from 'vue';
Vue.config.productionTip = false;

//[IMPORT_COMPONENT]

export function __getComponent(name) {
  switch (name) {
    //[CASE_COMPONENT]
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
