"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
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
  const _easycom_chat_message2 = common_vendor.resolveComponent("chat-message");
  (_easycom_nav_bar2 + _easycom_chat_message2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_chat_message = () => "../../components/chat-message/chat-message.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_chat_message + AiAnswer)();
}
const AiAnswer = () => "./ai-answer.js";
const _sfc_main = {
  __name: "ai-question",
  setup(__props) {
    const question = common_vendor.ref("");
    const askCount = common_vendor.ref(0);
    const chatRecord = common_vendor.ref([]);
    common_vendor.ref(null);
    const hasLogin = common_vendor.ref(common_vendor.index.getStorageSync("has_login"));
    const { onShareAppMessage } = hooks_useShare.useShare();
    common_vendor.onLoad(async (option) => {
      question.value = option.question;
      await getAiChatCount();
      onAsk();
    });
    onShareAppMessage({
      title: "SEEK",
      path: "/pages/ai/ai"
    });
    const onAsk = () => {
      if (question.value.length === 0)
        return;
      if (askCount.value === 0) {
        common_vendor.index.showToast({
          title: "提问次数不足",
          icon: "error"
        });
      } else {
        updateChatRecord("question", question.value);
        getAiChatAnswer();
        question.value = "";
      }
    };
    const getAiChatAnswer = async () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      const res = await api_index.aiChat({ ask: question.value });
      askCount.value--;
      updateChatRecord("answer", res.data);
      common_vendor.index.hideLoading();
    };
    const updateChatRecord = (type, content) => {
      if (type === "question") {
        chatRecord.value.push({ question: content });
      } else {
        const len = chatRecord.value.length;
        chatRecord.value[len - 1].answer = content;
      }
    };
    const getAiChatCount = async () => {
      const res = await api_index.aiChatCount();
      askCount.value = res.data.count;
    };
    const jumpPage = () => {
      let url;
      if (hasLogin.value) {
        url = "/pages/task/task";
      } else {
        url = "/pages/login/login";
      }
      common_vendor.index.redirectTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-back"]: true
        }),
        b: common_vendor.t(askCount.value),
        c: common_vendor.t(hasLogin.value ? "完成任务后可增加次数" : "登录后可增加3次"),
        d: common_vendor.t(hasLogin.value ? "去完成" : "去登录"),
        e: common_vendor.o(jumpPage),
        f: common_vendor.f(chatRecord.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.question),
            b: "863267ac-1-" + i0,
            c: common_vendor.t(item.answer),
            d: "863267ac-2-" + i0,
            e: common_vendor.p({
              question: item.question,
              answer: item.answer
            }),
            f: index
          };
        }),
        g: common_vendor.p({
          position: "left",
          ["show-status"]: false
        }),
        h: question.value,
        i: common_vendor.o(($event) => question.value = $event.detail.value),
        j: common_vendor.o(onAsk)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-863267ac"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/ai-question/ai-question.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
