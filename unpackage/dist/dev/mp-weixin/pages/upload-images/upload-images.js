"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_nav_bar2 = common_vendor.resolveComponent("nav-bar");
  const _easycom_upload_image2 = common_vendor.resolveComponent("upload-image");
  (_easycom_nav_bar2 + _easycom_upload_image2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_upload_image = () => "../../components/upload-image/upload-image.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_upload_image)();
}
const _sfc_main = {
  __name: "upload-images",
  setup(__props) {
    const type = common_vendor.ref("");
    const typeMap = {
      1: "训练照",
      2: "生活照",
      3: "证书"
    };
    const images = common_vendor.ref([]);
    const _this = common_vendor.getCurrentInstance();
    common_vendor.onLoad((option) => {
      type.value = option.type;
      const eventChannel = _this.ctx.getOpenerEventChannel();
      eventChannel.on("images", (data) => {
        images.value = data;
      });
    });
    const onPageBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
          common_vendor.index.$emit("upload-images", { images: images.value, type: type.value });
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
        d: common_vendor.o(($event) => images.value = $event),
        e: common_vendor.p({
          limit: 20,
          modelValue: images.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7b1735a0"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/upload-images/upload-images.vue"]]);
wx.createPage(MiniProgramPage);
