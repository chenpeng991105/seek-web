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
  __name: "mine-save",
  setup(__props) {
    const aiChatSaveList = common_vendor.ref([]);
    const onlineChatSaveList = common_vendor.ref([]);
    const tabs = ["AI互动", "在线问答"];
    const activeTab = common_vendor.ref(1);
    let aiChatPage = 0;
    let onlineChatPage = 0;
    common_vendor.onLoad(() => {
      getChatSaveList();
    });
    const getChatSaveList = async () => {
      if (activeTab.value === 1) {
        aiChatPage++;
        const res = await api_index.chatSaveList({ page: aiChatPage, limit: 10, tp: 1 });
        aiChatSaveList.value = [...aiChatSaveList.value, ...res.data];
      } else {
        onlineChatPage++;
        const res = await api_index.chatSaveList({ page: onlineChatPage, limit: 10, tp: 2 });
        onlineChatSaveList.value = [...onlineChatSaveList.value, ...res.data];
      }
    };
    const onToggleTab = (index) => {
      activeTab.value = index;
      getChatSaveList();
    };
    const jumpPage = (saveDetail) => {
      saveDetail.ct = utils_index.formatTimestamp(saveDetail.ct);
      common_vendor.index.navigateTo({
        url: `/pages/save-detail/save-detail?type=${activeTab.value}`,
        success: (res) => {
          res.eventChannel.emit("saveDetail", saveDetail);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-bg"]: true,
          ["show-back"]: true,
          title: "我的保存"
        }),
        b: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: activeTab.value === index + 1 ? 1 : "",
            d: common_vendor.o(($event) => onToggleTab(index + 1), index)
          };
        }),
        c: common_vendor.f(activeTab.value === 1 ? aiChatSaveList.value : onlineChatSaveList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.ask),
            b: common_vendor.t(item.answer),
            c: common_vendor.t(common_vendor.unref(utils_index.formatTimestamp)(item.ct)),
            d: item.id,
            e: common_vendor.o(($event) => jumpPage(item), item.id)
          };
        }),
        d: common_vendor.o(getChatSaveList)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8331582"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/mine-save/mine-save.vue"]]);
wx.createPage(MiniProgramPage);
