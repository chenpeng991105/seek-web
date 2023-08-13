"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "nav-bar",
  props: {
    showLogo: {
      type: Boolean,
      default: () => false
    },
    showBg: {
      type: Boolean,
      default: () => false
    },
    showBack: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      default: () => ""
    },
    customBack: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ["page-back"],
  setup(__props, { emit }) {
    const props = __props;
    const statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const onBack = () => {
      if (props.customBack) {
        emit("page-back");
      } else {
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showBg
      }, __props.showBg ? {} : {}, {
        b: __props.showLogo
      }, __props.showLogo ? {} : {}, {
        c: __props.showBack
      }, __props.showBack ? {} : {}, {
        d: __props.title
      }, __props.title ? {
        e: common_vendor.t(__props.title)
      } : {}, {
        f: common_vendor.o(onBack),
        g: common_vendor.unref(statusBarHeight) + "px",
        h: __props.showBg ? 1 : ""
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e9345f2e"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/components/nav-bar/nav-bar.vue"]]);
wx.createComponent(Component);
