"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_request = require("../../utils/request.js");
const utils_index = require("../../utils/index.js");
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
const _sfc_main = {
  __name: "ai",
  setup(__props) {
    common_vendor.onLoad(() => {
      utils_request.getToken();
      getHotSearch();
    });
    common_vendor.onShow(() => {
      getDeviceId();
    });
    const question = common_vendor.ref("");
    const hotSearchList = common_vendor.ref([]);
    const getHotSearch = async () => {
      const res = await api_index.hotSearch();
      hotSearchList.value = res.data;
    };
    const getDeviceId = async () => {
      if (!common_vendor.index.getStorageSync("has_login"))
        return;
      if (common_vendor.index.getStorageSync("device_id"))
        return;
      const { SDKVersion, deviceBrand, deviceModel, system } = common_vendor.index.getSystemInfoSync();
      const type = utils_index.getDeviceType();
      const res = await api_index.deviceId({
        brand: deviceBrand,
        model: deviceModel,
        sdk_version: SDKVersion,
        system_version: system,
        type
      });
      common_vendor.index.setStorageSync("device_id", res.data.device_id);
    };
    const onSeek = (_question) => {
      _question = _question || question.value;
      common_vendor.index.navigateTo({
        url: `/pages/ai-question/ai-question?question=${_question}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: question.value,
        b: common_vendor.o(($event) => question.value = $event.detail.value),
        c: common_vendor.o(($event) => onSeek()),
        d: common_vendor.f(hotSearchList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item.title),
            c: item.id,
            d: common_vendor.o(($event) => onSeek(item.title), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fdb58938"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/ai/ai.vue"]]);
wx.createPage(MiniProgramPage);
