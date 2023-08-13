"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "seek-popup",
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    position: {
      type: String,
      default: () => "center"
    }
  },
  setup(__props) {
    const props = __props;
    const popupRef = common_vendor.ref(null);
    common_vendor.watch(
      () => props.show,
      (value) => {
        if (value) {
          popupRef.value.open(props.position);
        } else {
          popupRef.value.close();
        }
      }
    );
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(popupRef, "0c77aaef-0", {
          "k": "popupRef"
        }),
        b: common_vendor.o(($event) => _ctx.$emit("mask-click")),
        c: common_vendor.p({
          ..._ctx.$attrs
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/chenpeng/HBuilderProjects/seek-web/components/seek-popup/seek-popup.vue"]]);
wx.createComponent(Component);
