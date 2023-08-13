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
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_nav_bar2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
const _sfc_main = {
  __name: "message",
  setup(__props) {
    const onlineChatListData = common_vendor.ref([]);
    let page = 0;
    const actionOptions = [
      {
        id: 1,
        text: "置顶",
        style: {
          backgroundColor: "#3479e5"
        }
      },
      {
        id: 2,
        text: "删除",
        style: {
          backgroundColor: "#e5564a"
        }
      }
    ];
    common_vendor.onLoad(() => {
      getOnlineChatList();
      common_vendor.index.$on("refreshChatList", () => {
        refreshChatList();
      });
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("refreshChatList");
    });
    const onActionItemClick = (e, chat, index) => {
      if (e.content.id === 1) {
        handlePlacementChat(chat, index);
      } else {
        handleDeleteChat(chat, index);
      }
    };
    const handlePlacementChat = async (chat, index) => {
      await api_index.placementChat({ id: chat.id, top: true });
      onlineChatListData.value.splice(index, 1);
      onlineChatListData.value.pop(chat);
      common_vendor.index.showToast({
        title: "置顶成功"
      });
    };
    const handleDeleteChat = (chat, index) => {
      common_vendor.index.showModal({
        title: "删除对话",
        content: "删除对话之后，之前的聊天记录将不会被保留，确认删除吗？",
        showCancel: true,
        confirmColor: "#181818",
        cancelColor: "#747474",
        success: async (res) => {
          if (res.confirm) {
            await api_index.deleteChat({ id: chat.id });
            onlineChatListData.value.splice(index, 1);
            common_vendor.index.showToast({
              title: "删除成功"
            });
          }
        }
      });
    };
    const refreshChatList = () => {
      page = 0;
      onlineChatListData.value = [];
      getOnlineChatList();
    };
    const getOnlineChatList = async () => {
      page++;
      const res = await api_index.onlineChatList({ page, limit: 10 });
      onlineChatListData.value = [...onlineChatListData.value, ...res.data];
    };
    const jumpMessagePage = (item) => {
      const { id, tp, train_id, train_name, online, is_follow } = item;
      if (tp === 1) {
        common_vendor.index.navigateTo({
          url: "/pages/message-user/message-user",
          success: (res) => {
            res.eventChannel.emit("messageUser", { id, train_id, train_name, online, is_follow });
          }
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/message-coach/message-coach?id=${id}&name=${train_name}`
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-logo"]: true,
          ["show-bg"]: true
        }),
        b: common_vendor.f(onlineChatListData.value, (item, index, i0) => {
          return {
            a: item.logo,
            b: common_vendor.t(item.tp === 1 ? "教练" : "用户"),
            c: common_vendor.t(item.train_name),
            d: common_vendor.t(item.online ? "在线" : "离线"),
            e: common_vendor.n(item.online ? "online" : "offline"),
            f: common_vendor.t(common_vendor.unref(utils_index.formatSecond)(item.extra_time)),
            g: common_vendor.t(item.last_msg),
            h: common_vendor.t(common_vendor.unref(utils_index.getWxTimeMemo)(item.ct)),
            i: common_vendor.o(($event) => jumpMessagePage(item), index),
            j: index,
            k: common_vendor.o(($event) => onActionItemClick($event, item, index), index),
            l: "4c1b26cf-2-" + i0 + ",4c1b26cf-1"
          };
        }),
        c: common_vendor.p({
          show: "none",
          ["right-options"]: actionOptions
        }),
        d: common_vendor.o(getOnlineChatList)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c1b26cf"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);
