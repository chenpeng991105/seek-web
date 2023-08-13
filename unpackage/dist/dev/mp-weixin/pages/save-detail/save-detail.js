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
  __name: "save-detail",
  setup(__props) {
    const _this = common_vendor.getCurrentInstance();
    const saveDetail = common_vendor.reactive({});
    common_vendor.ref();
    common_vendor.onLoad(() => {
      const eventChannel = _this.ctx.getOpenerEventChannel();
      eventChannel.on("saveDetail", (data) => {
        Object.assign(saveDetail, data);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-bg"]: true,
          ["show-back"]: true,
          title: "保存详情"
        }),
        b: common_vendor.t(saveDetail == null ? void 0 : saveDetail.ask),
        c: common_vendor.t(saveDetail == null ? void 0 : saveDetail.ct),
        d: common_vendor.t(saveDetail == null ? void 0 : saveDetail.answer)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dff35d2e"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/save-detail/save-detail.vue"]]);
wx.createPage(MiniProgramPage);
