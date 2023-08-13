"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_nav_bar2 = common_vendor.resolveComponent("nav-bar");
  _easycom_nav_bar2();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
if (!Math) {
  _easycom_nav_bar();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      ["show-back"]: true,
      ["show-bg"]: true,
      title: "产品反馈"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cef701d"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/product-feedback/product-feedback.vue"]]);
wx.createPage(MiniProgramPage);
