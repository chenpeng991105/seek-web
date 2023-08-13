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
      ["show-bg"]: true,
      ["show-back"]: true,
      title: "联系我们"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/contact-us/contact-us.vue"]]);
wx.createPage(MiniProgramPage);
