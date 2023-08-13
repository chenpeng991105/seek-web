"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const hooks_useFollow = require("../../hooks/useFollow.js");
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
  __name: "mine-follow",
  setup(__props) {
    const followList = common_vendor.ref([]);
    let page = 0;
    common_vendor.onLoad(() => {
      getUserFollowList();
    });
    const getUserFollowList = async () => {
      page++;
      const res = await api_index.userFollowList({ page, limit: 10 });
      followList.value = [...followList.value, ...res.data];
    };
    const { onFollowCoach } = hooks_useFollow.useFollow();
    const handleFollowCoach = (item) => {
      const { is_follow: isFollow, id } = item;
      onFollowCoach({ is_follow: !isFollow, train_id: id }, () => {
        item.is_follow = !isFollow;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-bg"]: true,
          ["show-back"]: true,
          title: "我的关注"
        }),
        b: common_vendor.f(followList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.is_follow ? "已关注" : "关注"),
            b: common_vendor.o(($event) => handleFollowCoach(item), item.id),
            c: item.id,
            d: "baadbee8-1-" + i0,
            e: common_vendor.p({
              ["coach-info"]: item,
              ["show-coach-data"]: false
            })
          };
        }),
        c: common_vendor.o(getUserFollowList)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-baadbee8"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/mine-follow/mine-follow.vue"]]);
wx.createPage(MiniProgramPage);
