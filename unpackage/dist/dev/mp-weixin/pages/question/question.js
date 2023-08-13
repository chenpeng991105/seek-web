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
  const _easycom_icon_check2 = common_vendor.resolveComponent("icon-check");
  const _easycom_coach_info2 = common_vendor.resolveComponent("coach-info");
  (_easycom_nav_bar2 + _easycom_icon_check2 + _easycom_coach_info2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_icon_check = () => "../../components/icon-check/icon-check.js";
const _easycom_coach_info = () => "../../components/coach-info/coach-info.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_icon_check + _easycom_coach_info)();
}
const _sfc_main = {
  __name: "question",
  setup(__props) {
    const state = common_vendor.reactive({
      tagList: [],
      recommendCoachList: []
    });
    let page = 0;
    common_vendor.onLoad(() => {
      getTagList();
      getRecommendCoachList();
    });
    const getTagList = async () => {
      const res = await api_index.tagList();
      state.tagList = res.data;
    };
    const getRecommendCoachList = async () => {
      page++;
      const res = await api_index.recommendCoachList({ page, limit: 10 });
      state.recommendCoachList = [...state.recommendCoachList, ...res.data];
    };
    const jumpSearch = () => {
      common_vendor.index.navigateTo({
        url: "../search/search"
      });
    };
    const jumpCategotyDetail = (index) => {
      const { id } = state.tagList[index];
      common_vendor.index.navigateTo({
        url: `/pages/category-detail/category-detail?id=${id}&index=${index}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-logo"]: true,
          ["show-bg"]: true
        }),
        b: common_vendor.o(jumpSearch),
        c: common_vendor.o(($event) => jumpCategotyDetail(0)),
        d: common_vendor.o(($event) => jumpCategotyDetail(2)),
        e: common_vendor.o(($event) => jumpCategotyDetail(1)),
        f: common_vendor.o(($event) => jumpCategotyDetail(3)),
        g: common_vendor.o(($event) => jumpCategotyDetail(4)),
        h: common_vendor.f(state.recommendCoachList, (item, k0, i0) => {
          return {
            a: item.id,
            b: "a6df9a91-4-" + i0,
            c: common_vendor.p({
              ["coach-info"]: item
            })
          };
        }),
        i: common_vendor.o(getRecommendCoachList)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6df9a91"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/question/question.vue"]]);
wx.createPage(MiniProgramPage);
