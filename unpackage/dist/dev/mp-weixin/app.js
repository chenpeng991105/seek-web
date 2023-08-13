"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/ai/ai.js";
  "./pages/message-user/message-user.js";
  "./pages/question/question.js";
  "./pages/message/message.js";
  "./pages/message-coach/message-coach.js";
  "./pages/mine/mine.js";
  "./pages/login/login.js";
  "./pages/ai-question/ai-question.js";
  "./pages/task/task.js";
  "./pages/search/search.js";
  "./pages/category-detail/category-detail.js";
  "./pages/coach-detail/coach-detail.js";
  "./pages/product-feedback/product-feedback.js";
  "./pages/complaint/complaint.js";
  "./pages/mine-save/mine-save.js";
  "./pages/save-detail/save-detail.js";
  "./pages/mine-follow/mine-follow.js";
  "./pages/mine-order/mine-order.js";
  "./pages/edit-content/edit-content.js";
  "./pages/upload-images/upload-images.js";
  "./pages/coach-settings/coach-settings.js";
  "./pages/mine-income/mine-income.js";
  "./pages/edit-homepage/edit-homepage.js";
  "./pages/contact-us/contact-us.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/chenpeng/HBuilderProjects/seek-web/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
