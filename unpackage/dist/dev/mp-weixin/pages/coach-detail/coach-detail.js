"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const hooks_useShare = require("../../hooks/useShare.js");
const hooks_useFollow = require("../../hooks/useFollow.js");
const hooks_useLogin = require("../../hooks/useLogin.js");
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
  const _easycom_kevy_swiper2 = common_vendor.resolveComponent("kevy-swiper");
  const _easycom_share_popup2 = common_vendor.resolveComponent("share-popup");
  (_easycom_nav_bar2 + _easycom_kevy_swiper2 + _easycom_share_popup2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_kevy_swiper = () => "../../components/kevy-swiper/kevy-swiper.js";
const _easycom_share_popup = () => "../../components/share-popup/share-popup.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_kevy_swiper + EllipsisText + _easycom_share_popup)();
}
const EllipsisText = () => "./ellipsis-text.js";
const _sfc_main = {
  __name: "coach-detail",
  setup(__props) {
    const _this = common_vendor.getCurrentInstance();
    const coachDetailState = common_vendor.reactive({});
    common_vendor.ref(1);
    const sharePopupShow = common_vendor.ref(false);
    const { onShareAppMessage } = hooks_useShare.useShare();
    let trainId;
    let isPreview = false;
    let tempCoachDetail = {};
    onShareAppMessage({
      title: "SEEK",
      path: "/pages/ai/ai"
    });
    common_vendor.onLoad((option) => {
      const { id, view_mode } = option;
      trainId = +id;
      getCoachDetail(option.id);
      if (view_mode === "preview") {
        isPreview = true;
        const eventChannel = _this.ctx.getOpenerEventChannel();
        eventChannel.on("coachDetail", (data) => {
          tempCoachDetail = data;
        });
      }
    });
    const getCoachDetail = async (id) => {
      const res = await api_index.coachDetail({ id });
      if (!isPreview) {
        Object.assign(coachDetailState, res.data);
      } else {
        Object.assign(coachDetailState, { ...res.data, ...tempCoachDetail });
      }
    };
    common_vendor.ref();
    const list = [
      "https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe1.jpg",
      "https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg",
      "https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe3.jpg",
      "https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe4.jpg",
      "https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe5.jpg"
    ];
    const { onFollowCoach } = hooks_useFollow.useFollow();
    const handleFollowCoach = () => {
      const { is_follow: isFollow, id } = coachDetailState;
      onFollowCoach({ is_follow: !isFollow, train_id: id }, () => {
        coachDetailState.is_follow = !isFollow;
      });
    };
    const { hasLogin } = hooks_useLogin.useLogin();
    const onPay = async () => {
      if (!hasLogin())
        return;
      const { data } = await api_index.orderPrePayInfo({ train_id: trainId });
      common_vendor.index.requestPayment({
        provider: "wxpay",
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: (res) => {
          console.log("支付成功", res);
        },
        fail: (res) => {
          console.log("支付失败", res);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-back"]: true
        }),
        b: common_vendor.o(($event) => sharePopupShow.value = true),
        c: common_vendor.t((coachDetailState == null ? void 0 : coachDetailState.is_follow) ? "已关注" : "关注"),
        d: common_vendor.o(handleFollowCoach),
        e: common_vendor.t(coachDetailState == null ? void 0 : coachDetailState.name),
        f: common_vendor.t((coachDetailState == null ? void 0 : coachDetailState.online) ? "在线" : "离线"),
        g: common_vendor.n((coachDetailState == null ? void 0 : coachDetailState.online) ? "online" : "offline"),
        h: common_vendor.t(coachDetailState == null ? void 0 : coachDetailState.price),
        i: common_vendor.t((coachDetailState == null ? void 0 : coachDetailState.chat_time) + "min"),
        j: common_vendor.o(onPay),
        k: common_vendor.t(coachDetailState == null ? void 0 : coachDetailState.answer_num),
        l: common_vendor.t(coachDetailState == null ? void 0 : coachDetailState.online_num),
        m: common_vendor.t(coachDetailState == null ? void 0 : coachDetailState.cert_count),
        n: common_vendor.t(coachDetailState == null ? void 0 : coachDetailState.fan_num),
        o: common_vendor.p({
          list,
          height: 289
        }),
        p: common_vendor.t(coachDetailState == null ? void 0 : coachDetailState.experience),
        q: common_vendor.p({
          flag: "1"
        }),
        r: common_vendor.t(coachDetailState == null ? void 0 : coachDetailState.be_good),
        s: common_vendor.p({
          flag: "2"
        }),
        t: common_vendor.o(($event) => sharePopupShow.value = $event),
        v: common_vendor.p({
          show: sharePopupShow.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-10c6efaa"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/coach-detail/coach-detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
