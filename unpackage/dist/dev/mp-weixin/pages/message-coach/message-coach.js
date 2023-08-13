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
  const _easycom_countdown_timer2 = common_vendor.resolveComponent("countdown-timer");
  const _easycom_chat_message2 = common_vendor.resolveComponent("chat-message");
  (_easycom_nav_bar2 + _easycom_countdown_timer2 + _easycom_chat_message2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_countdown_timer = () => "../../components/countdown-timer/countdown-timer.js";
const _easycom_chat_message = () => "../../components/chat-message/chat-message.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_countdown_timer + _easycom_chat_message)();
}
const _sfc_main = {
  __name: "message-coach",
  setup(__props) {
    const autoStartCountdown = common_vendor.ref(false);
    const name = common_vendor.ref("");
    const content = common_vendor.ref("");
    const deviceId = common_vendor.index.getStorageSync("device_id");
    let chatId, imToken, sendData;
    common_vendor.onLoad((option) => {
      chatId = +option.id;
      name.value = option.name;
      connectSocket();
    });
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
    });
    const onSendMessage = async () => {
      await api_index.sendMessage({
        content: content.value,
        device_id: common_vendor.index.getStorageSync("device_id"),
        id: chatId,
        token: imToken
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-back"]: true,
          ["show-bg"]: true,
          title: name.value
        }),
        b: common_vendor.w(({
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
          path: "b",
          vueId: "08d1d56b-1"
        }),
        c: common_vendor.p({
          time: 12e5,
          ["auto-start"]: autoStartCountdown.value
        }),
        d: content.value,
        e: common_vendor.o(($event) => content.value = $event.detail.value),
        f: common_vendor.o(onSendMessage),
        g: common_vendor.p({
          position: "right"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08d1d56b"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/message-coach/message-coach.vue"]]);
wx.createPage(MiniProgramPage);
