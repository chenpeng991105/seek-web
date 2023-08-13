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
  const _easycom_coach_info2 = common_vendor.resolveComponent("coach-info");
  (_easycom_nav_bar2 + _easycom_coach_info2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_coach_info = () => "../../components/coach-info/coach-info.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_coach_info)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const coachName = common_vendor.ref("");
    const coachList = common_vendor.ref([]);
    const focus = common_vendor.ref(false);
    common_vendor.onShow(() => {
      focus.value = true;
    });
    const handleSearchCoach = async () => {
      const res = await api_index.searchCoach({ name: coachName.value });
      coachList.value = res.data;
    };
    return (_ctx, _cache) => {
      return {
        a: focus.value,
        b: coachName.value,
        c: common_vendor.o(($event) => coachName.value = $event.detail.value),
        d: common_vendor.o(handleSearchCoach),
        e: common_vendor.o(() => {
        }),
        f: common_vendor.p({
          ["show-back"]: true,
          ["show-bg"]: true
        }),
        g: common_vendor.f(coachList.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: "c10c040c-1-" + i0,
            c: common_vendor.p({
              ["coach-info"]: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
