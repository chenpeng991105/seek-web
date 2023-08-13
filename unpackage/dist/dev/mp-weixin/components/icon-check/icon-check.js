"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "icon-check",
  props: {
    color: {
      type: String,
      default: () => "#8b8b8b"
    }
  },
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "5ece2a1f": __props.color
    }));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e0871df7"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/components/icon-check/icon-check.vue"]]);
wx.createComponent(Component);
