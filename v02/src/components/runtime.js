import {
  createVNode,
  defineComponent,
  h,
  resolveComponent
} from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
  },
  render() {
    const c = resolveComponent(this.name)
    console.log('resolveComponent -> ', this.name);
    return h(c)
  },
  // setup(props) {
  //   return () => {
  //     return createVNode(
  //       'div', {
  //         class: 'btn'
  //       },
  //       '[ RUNTIME = ' + props.name + ']'
  //     )
  //   }
  // }
})
