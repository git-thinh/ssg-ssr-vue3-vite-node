import { openBlock, createElementBlock, Fragment, createElementVNode, toDisplayString, pushScopeId, popScopeId } from 'vue';

const TestJs_vue_vue_type_style_index_0_scoped_c9032ede_lang = '';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
		name: 'TestJs',
		data() {
			return {
				count: 0
			}
		}
	};

const _withScopeId = n => (pushScopeId("data-v-c9032ede"),n=n(),popScopeId(),n);
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("h1", null, "This is TestJs", -1));

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = $event => ($data.count++))
    }, "Count++ = " + toDisplayString($data.count), 1)
  ], 64))
}
const TestJs = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-c9032ede"]]);

export { TestJs };
//# sourceMappingURL=lib-test.js.map
