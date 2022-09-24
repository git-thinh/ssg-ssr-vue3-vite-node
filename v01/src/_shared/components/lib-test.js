import { openBlock, createElementBlock, Fragment, createElementVNode, toDisplayString, pushScopeId, popScopeId } from 'vue';

const LibTest01_vue_vue_type_style_index_0_scoped_66a3e95d_lang = '';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$1 = {
		name: 'LibTest01',
		data() {
			return {
				count: 0
			}
		}
	};

const _withScopeId$1 = n => (pushScopeId("data-v-66a3e95d"),n=n(),popScopeId(),n);
const _hoisted_1$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("h1", null, "LibTest01", -1));

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$1,
    createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = $event => ($data.count++))
    }, "LibTest01 = " + toDisplayString($data.count), 1)
  ], 64))
}
const LibTest01 = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1],['__scopeId',"data-v-66a3e95d"]]);

const LibTest02_vue_vue_type_style_index_0_scoped_2b64c235_lang = '';

const _sfc_main = {
		name: 'LibTest02',
		data() {
			return {
				count: 0
			}
		}
	};

const _withScopeId = n => (pushScopeId("data-v-2b64c235"),n=n(),popScopeId(),n);
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("h2", null, "LibTest02", -1));

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = $event => ($data.count++))
    }, "LibTest02 = " + toDisplayString($data.count), 1)
  ], 64))
}
const LibTest02 = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-2b64c235"]]);

export { LibTest01, LibTest02 };
//# sourceMappingURL=lib-test.js.map
