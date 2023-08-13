"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_nav_bar2 = common_vendor.resolveComponent("nav-bar");
  _easycom_nav_bar2();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
if (!Math) {
  _easycom_nav_bar();
}
const _sfc_main = {
  __name: "edit-content",
  setup(__props) {
    const typeMap = {
      1: "职业经历",
      2: "擅长内容"
    };
    const type = common_vendor.ref("");
    const content = common_vendor.ref("");
    const _this = common_vendor.getCurrentInstance();
    common_vendor.onLoad((option) => {
      type.value = option.type;
      const eventChannel = _this.ctx.getOpenerEventChannel();
      eventChannel.on("content", (data) => {
        content.value = data;
      });
    });
    const onPageBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
          common_vendor.index.$emit("edit-content", { content: content.value, type: type.value });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onPageBack),
        b: common_vendor.p({
          ["show-bg"]: true,
          ["show-back"]: true,
          ["custom-back"]: true
        }),
        c: common_vendor.t(typeMap[type.value]),
        d: common_vendor.t(typeMap[type.value]),
        e: `请输入${typeMap[type.value]}`,
        f: content.value,
        g: common_vendor.o(($event) => content.value = $event.detail.value),
        h: common_vendor.t(content.value.length)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-12520fbe"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/edit-content/edit-content.vue"]]);
wx.createPage(MiniProgramPage);
