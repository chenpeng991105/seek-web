"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_index = require("../../utils/index.js");
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
  _easycom_nav_bar2();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
if (!Math) {
  _easycom_nav_bar();
}
const _sfc_main = {
  __name: "mine-income",
  setup(__props) {
    const state = common_vendor.reactive({
      balance: 0,
      list: []
    });
    const incomeType = {
      1: "在线问答",
      2: "退款",
      3: "提现"
    };
    let page = 0;
    common_vendor.onLoad(() => {
      getIncomeList();
    });
    const getIncomeList = async () => {
      page++;
      const res = await api_index.incomeList({ page, limit: 10 });
      const { balance, list } = res.data;
      state.balance = balance;
      state.list = [...state.list, ...list];
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-bg"]: true,
          ["show-back"]: true,
          title: "我的收入"
        }),
        b: common_vendor.t(state.balance),
        c: common_vendor.f(state.list, (item, index, i0) => {
          return {
            a: item.head_img,
            b: common_vendor.t(incomeType[item.tp]),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.order_code),
            e: common_vendor.t(item.amt),
            f: common_vendor.t(common_vendor.unref(utils_index.formatTimestamp)(item.ct)),
            g: index
          };
        }),
        d: common_vendor.o(getIncomeList)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d56767a"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/mine-income/mine-income.vue"]]);
wx.createPage(MiniProgramPage);
