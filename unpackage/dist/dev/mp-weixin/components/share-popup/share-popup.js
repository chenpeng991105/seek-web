"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_seek_popup2 = common_vendor.resolveComponent("seek-popup");
  _easycom_seek_popup2();
}
const _easycom_seek_popup = () => "../seek-popup/seek-popup.js";
if (!Math) {
  _easycom_seek_popup();
}
const _sfc_main = {
  __name: "share-popup",
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ["update:show", "generate-poster"],
  setup(__props, { emit }) {
    const safeAreaInsetBottom = common_vendor.ref(common_vendor.index.getSystemInfoSync().safeAreaInsets.bottom);
    const onCancel = () => {
      emit("update:show", false);
    };
    const onGeneratePoster = () => {
      emit("generate-poster");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onGeneratePoster),
        b: safeAreaInsetBottom.value + "px",
        c: common_vendor.o(onCancel),
        d: common_vendor.o(onCancel),
        e: common_vendor.p({
          position: "bottom",
          ["safe-area"]: false,
          show: __props.show
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3c62f88"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/components/share-popup/share-popup.vue"]]);
wx.createComponent(Component);
