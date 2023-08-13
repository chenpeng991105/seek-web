"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_request = require("../../utils/request.js");
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
  const _easycom_icon_check2 = common_vendor.resolveComponent("icon-check");
  _easycom_icon_check2();
}
const _easycom_icon_check = () => "../../components/icon-check/icon-check.js";
if (!Math) {
  _easycom_icon_check();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const getPhoneNumber = (e) => {
      utils_request.getToken().then(() => {
        wxAuth(e);
      });
    };
    const wxAuth = async (e) => {
      const { errMsg, code } = e.detail;
      if (errMsg === "getPhoneNumber:ok") {
        await api_index.auth({ code });
        common_vendor.index.setStorageSync("has_login", 1);
        common_vendor.index.switchTab({
          url: "/pages/ai/ai"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getPhoneNumber),
        b: common_vendor.p({
          color: "#181818"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
