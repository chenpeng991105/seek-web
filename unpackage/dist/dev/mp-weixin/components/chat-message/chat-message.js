"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "chat-message",
  props: {
    position: {
      type: String,
      default: "left"
    },
    showStatus: {
      type: Boolean,
      default: () => true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.position === "left"
      }, __props.position === "left" ? {} : {}, {
        b: __props.position === "right"
      }, __props.position === "right" ? {} : {}, {
        c: __props.showStatus
      }, __props.showStatus ? {} : {}, {
        d: __props.position === "right" ? 1 : "",
        e: common_vendor.n(__props.position === "left" ? "left" : "right")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-892caec4"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/components/chat-message/chat-message.vue"]]);
wx.createComponent(Component);
