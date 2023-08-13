"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const hooks_useFollow = require("../../hooks/useFollow.js");
const hooks_useShare = require("../../hooks/useShare.js");
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
  const _easycom_countdown_timer2 = common_vendor.resolveComponent("countdown-timer");
  const _easycom_chat_message2 = common_vendor.resolveComponent("chat-message");
  const _easycom_share_popup2 = common_vendor.resolveComponent("share-popup");
  (_easycom_nav_bar2 + _easycom_countdown_timer2 + _easycom_chat_message2 + _easycom_share_popup2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_countdown_timer = () => "../../components/countdown-timer/countdown-timer.js";
const _easycom_chat_message = () => "../../components/chat-message/chat-message.js";
const _easycom_share_popup = () => "../../components/share-popup/share-popup.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_countdown_timer + _easycom_chat_message + _easycom_share_popup)();
}
const _sfc_main = {
  __name: "message-user",
  setup(__props) {
    const actionList = [
      {
        icon: "icon_check",
        title: "查看"
      },
      {
        icon: "icon_follow",
        title: "关注"
      },
      {
        icon: "icon_share",
        title: "分享"
      },
      {
        icon: "icon_more",
        title: "更多"
      }
    ];
    const autoStartCountdown = common_vendor.ref(false);
    const sharePopupShow = common_vendor.ref(false);
    const content = common_vendor.ref("");
    const name = common_vendor.ref("");
    const online = common_vendor.ref(false);
    const isFollow = common_vendor.ref(false);
    let chatId, trainId, imToken, sendData;
    const deviceId = common_vendor.index.getStorageSync("device_id");
    const { onFollowCoach } = hooks_useFollow.useFollow();
    const { onShareAppMessage } = hooks_useShare.useShare();
    const _this = common_vendor.getCurrentInstance();
    common_vendor.onLoad(() => {
      const eventChannel = _this.ctx.getOpenerEventChannel();
      eventChannel.on("messageUser", (data) => {
        const { id, tp, train_id, train_name, is_follow } = data;
        name.value = train_name;
        online.value = data.online;
        isFollow.value = is_follow;
        chatId = id;
        trainId = train_id;
      });
      connectSocket();
    });
    onShareAppMessage({
      title: "SEEK",
      path: "/pages/message/message"
    });
    const onActionClick = (index) => {
      switch (index) {
        case 0:
          common_vendor.index.navigateTo({
            url: `/pages/coach-detail/coach-detail?id=${trainId}`
          });
          break;
        case 1:
          onFollowCoach({ is_follow: !isFollow.value, train_id: trainId }, () => {
            isFollow.value = !isFollow.value;
          });
          break;
        case 2:
          sharePopupShow.value = true;
          break;
        case 3:
          handleMoreAction();
          break;
      }
    };
    let isPlacement = false;
    const handleMoreAction = () => {
      common_vendor.index.showActionSheet({
        itemList: ["置顶", "投诉"],
        success: async (res) => {
          if (res.tapIndex === 0) {
            await api_index.placementChat({ id: chatId, top: true });
            isPlacement = true;
            common_vendor.index.showToast({
              title: "置顶成功"
            });
          } else {
            common_vendor.index.navigateTo({
              url: `/pages/complaint/complaint?id=${trainId}&name=${name.value}`
            });
          }
        }
      });
    };
    const onPageBack = () => {
      isPlacement && common_vendor.index.$emit("refreshChatList");
      isPlacement = false;
      common_vendor.index.navigateBack();
    };
    const getImUserInfo = async () => {
      const res = await api_index.imUserInfo({ device_id: deviceId });
      const { im_token, im_user_id } = res.data;
      imToken = im_token;
      sendData = {
        type: 1,
        data: JSON.stringify({
          user_id: im_user_id,
          device_id: deviceId,
          token: imToken
        })
      };
    };
    const connectSocket = () => {
      common_vendor.index.connectSocket({
        url: api_index.wsUrl,
        success: (res) => {
          console.log("WebSocket连接成功！");
        },
        fail: (res) => {
          console.log("WebSocket连接失败！");
        }
      });
    };
    common_vendor.index.onSocketOpen(async (res) => {
      console.log("WebSocket连接已打开！");
      await getImUserInfo();
      sendData.request_id = (/* @__PURE__ */ new Date()).getTime();
      common_vendor.index.sendSocketMessage({
        data: JSON.stringify(sendData),
        success: () => {
          console.log("socket登录消息发送成功");
        },
        fail: () => {
          console.log("socket登录消息发送失败");
        }
      });
    });
    common_vendor.index.onSocketError((res) => {
      console.log("WebSocket连接打开失败，请检查！");
    });
    common_vendor.index.onSocketMessage((res) => {
      console.log("收到消息", res.data);
      common_vendor.index.showToast({
        title: JSON.stringify(res.data),
        icon: "none"
      });
    });
    const onSendMessage = async () => {
      await api_index.sendMessage({
        content: content.value || "你好",
        device_id: common_vendor.index.getStorageSync("device_id"),
        id: chatId,
        token: imToken
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(name.value),
        b: common_vendor.t(online.value ? "在线" : "离线"),
        c: common_vendor.o(onPageBack),
        d: common_vendor.p({
          ["show-back"]: true,
          ["custom-back"]: true
        }),
        e: common_vendor.f(actionList, (item, index, i0) => {
          return common_vendor.e({
            a: `/static/${item.icon}.png`,
            b: common_vendor.n(item.icon),
            c: index === 1
          }, index === 1 ? {
            d: common_vendor.t(isFollow.value ? "已关注" : "关注")
          } : {
            e: common_vendor.t(item.title)
          }, {
            f: index,
            g: common_vendor.o(($event) => onActionClick(index), index)
          });
        }),
        f: common_vendor.w(({
          minute,
          second
        }, s0, i0) => {
          return {
            a: common_vendor.t(minute),
            b: common_vendor.t(second),
            c: i0,
            d: s0
          };
        }, {
          name: "d",
          path: "f",
          vueId: "980b718b-1"
        }),
        g: common_vendor.p({
          time: 12e5,
          ["auto-start"]: autoStartCountdown.value
        }),
        h: content.value,
        i: common_vendor.o(($event) => content.value = $event.detail.value),
        j: common_vendor.o(onSendMessage),
        k: common_vendor.p({
          position: "right"
        }),
        l: common_vendor.o(($event) => sharePopupShow.value = $event),
        m: common_vendor.p({
          show: sharePopupShow.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-980b718b"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/message-user/message-user.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
