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
  _easycom_nav_bar2();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
if (!Math) {
  _easycom_nav_bar();
}
const _sfc_main = {
  __name: "mine-order",
  setup(__props) {
    const orderListData = common_vendor.ref([]);
    let page = 0;
    common_vendor.onLoad(() => {
      getOrderList();
    });
    const getOrderList = async () => {
      page++;
      const res = await api_index.orderList({ page, limit: 10 });
      handleOrderListData(res.data);
    };
    const handleOrderListData = (data) => {
      data.forEach((item1) => {
        const obj = orderListData.value.find((item2) => item2.group === item1.group);
        if (obj) {
          obj.list.push(item1);
        } else {
          orderListData.value.push({
            group: item1.group,
            list: [item1]
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-bg"]: true,
          ["show-back"]: true,
          title: "我的订单"
        }),
        b: common_vendor.f(orderListData.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.group),
            b: common_vendor.f(item.list, (order, index, i1) => {
              return {
                a: common_vendor.t(order.train_name),
                b: common_vendor.t(order.order_code),
                c: common_vendor.t(order.amount),
                d: common_vendor.t(order.pay_time),
                e: index
              };
            }),
            c: item.logo,
            d: item.group
          };
        }),
        c: common_vendor.o(getOrderList)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f31a5319"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/mine-order/mine-order.vue"]]);
wx.createPage(MiniProgramPage);
