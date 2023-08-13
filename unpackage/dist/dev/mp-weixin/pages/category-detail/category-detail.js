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
  __name: "category-detail",
  setup(__props) {
    const categoryImages = [
      "/static/category1.png",
      "/static/category2.png",
      "/static/category3.png",
      "/static/category4.png",
      "/static/category5.png"
    ];
    const state = common_vendor.reactive({
      categoryImage: "",
      index: 0,
      recommendCoachList: []
    });
    common_vendor.onLoad((option) => {
      state.categoryImage = categoryImages[option.index];
      state.index = +option.index;
      getTagInfo(option.id);
      getRecommendCoachList();
    });
    const getTagInfo = async (id) => {
      const res = await api_index.tagInfo({ id });
      Object.assign(state, res.data);
    };
    const getRecommendCoachList = async () => {
      const res = await api_index.recommendCoachList();
      state.recommendCoachList = res.data;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-back"]: true
        }),
        b: state == null ? void 0 : state.img,
        c: common_vendor.t(state == null ? void 0 : state.desc),
        d: common_vendor.t(state == null ? void 0 : state.price),
        e: common_vendor.t(state == null ? void 0 : state.chat_time),
        f: state.categoryImage,
        g: common_vendor.n(`category-image${state.index + 1}`),
        h: common_vendor.f(state.recommendCoachList, (item, k0, i0) => {
          return {
            a: item.id,
            b: "cadc03b8-1-" + i0,
            c: common_vendor.p({
              ["coach-info"]: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cadc03b8"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/category-detail/category-detail.vue"]]);
wx.createPage(MiniProgramPage);
