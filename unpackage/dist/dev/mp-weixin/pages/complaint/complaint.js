"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
require("../../js_sdk/luch-request/luch-request/core/Request.js");
require("../../js_sdk/luch-request/luch-request/core/dispatchRequest.js");
require("../../js_sdk/luch-request/luch-request/adapters/index.js");
require("../../js_sdk/luch-request/luch-request/helpers/buildURL.js");
require("../../js_sdk/luch-request/luch-request/utils.js");
require("../../js_sdk/luch-request/luch-request/core/buildFullPath.js");
require("../../js_sdk/luch-request/luch-request/helpers/isAbsoluteURL.js");
require("../../js_sdk/luch-request/luch-request/helpers/combineURLs.js");
require("../../js_sdk/luch-request/luch-request/core/settle.js");
require("../../js_sdk/luch-request/luch-request/core/InterceptorManager.js");
require("../../js_sdk/luch-request/luch-request/core/mergeConfig.js");
require("../../js_sdk/luch-request/luch-request/core/defaults.js");
require("../../js_sdk/luch-request/luch-request/utils/clone.js");
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
  __name: "complaint",
  setup(__props) {
    const complaintType = ["诱导消费", "人身攻击", "淫秽色情", "违法信息", "其他"];
    const img = common_vendor.ref([]);
    const title = common_vendor.ref([]);
    const desc = common_vendor.ref([]);
    const name = common_vendor.ref("");
    let trainId;
    common_vendor.onLoad((option) => {
      name.value = option.name;
      trainId = +option.id;
    });
    const checkboxChange = (e) => {
      title.value = e.detail.value;
    };
    const onSubmit = async () => {
      if (!title.value.length) {
        common_vendor.index.showToast({
          title: "请选择投诉类型",
          icon: "none"
        });
      } else {
        await api_index.complaint({ train_id: trainId, title: title.value, img: img.value, desc: desc.value });
        common_vendor.index.showToast({
          title: "您的投诉已收到，我们在第一时间核实后将会尽快与您联系，请耐心等待",
          icon: "none",
          success: () => {
            const timer = setTimeout(() => {
              common_vendor.index.navigateBack();
              clearTimeout(timer);
            }, 1500);
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-back"]: true,
          ["show-bg"]: true,
          title: "投诉"
        }),
        b: common_vendor.t(name.value),
        c: common_vendor.f(complaintType, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.t(item),
            c: index
          };
        }),
        d: common_vendor.o(checkboxChange),
        e: common_vendor.o(($event) => img.value = $event),
        f: common_vendor.p({
          limit: 9,
          modelValue: img.value
        }),
        g: desc.value,
        h: common_vendor.o(($event) => desc.value = $event.detail.value),
        i: common_vendor.t(desc.value.length),
        j: common_vendor.o(onSubmit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-516bbc45"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/complaint/complaint.vue"]]);
wx.createPage(MiniProgramPage);
