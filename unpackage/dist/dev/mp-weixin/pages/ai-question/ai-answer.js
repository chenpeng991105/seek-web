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
  const _easycom_seek_popup2 = common_vendor.resolveComponent("seek-popup");
  const _easycom_share_popup2 = common_vendor.resolveComponent("share-popup");
  (_easycom_seek_popup2 + _easycom_share_popup2)();
}
const _easycom_seek_popup = () => "../../components/seek-popup/seek-popup.js";
const _easycom_share_popup = () => "../../components/share-popup/share-popup.js";
if (!Math) {
  (_easycom_seek_popup + _easycom_share_popup)();
}
const _sfc_main = {
  __name: "ai-answer",
  props: {
    question: {
      type: String,
      default: () => ""
    },
    answer: {
      type: String,
      default: () => ""
    }
  },
  setup(__props) {
    const props = __props;
    const savePopupShow = common_vendor.ref(false);
    const sharePopupShow = common_vendor.ref(false);
    const saveTitle = common_vendor.ref("");
    const handleConfirmSave = async () => {
      const { question, answer } = props;
      await api_index.saveAiChat({ ask: saveTitle.value || question, answer, tp: 1 });
      savePopupShow.value = false;
      common_vendor.index.showToast({
        title: "保存成功"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => savePopupShow.value = true),
        b: common_vendor.o(($event) => sharePopupShow.value = true),
        c: __props.question,
        d: saveTitle.value,
        e: common_vendor.o(($event) => saveTitle.value = $event.detail.value),
        f: common_vendor.o(($event) => savePopupShow.value = false),
        g: common_vendor.o(handleConfirmSave),
        h: common_vendor.p({
          ["is-mask-click"]: false,
          show: savePopupShow.value
        }),
        i: common_vendor.o(($event) => sharePopupShow.value = $event),
        j: common_vendor.p({
          show: sharePopupShow.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5db3df03"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/ai-question/ai-answer.vue"]]);
wx.createComponent(Component);
