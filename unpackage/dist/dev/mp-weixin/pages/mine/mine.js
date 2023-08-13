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
  const _easycom_seek_popup2 = common_vendor.resolveComponent("seek-popup");
  (_easycom_nav_bar2 + _easycom_seek_popup2)();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_seek_popup = () => "../../components/seek-popup/seek-popup.js";
if (!Math) {
  (_easycom_nav_bar + _easycom_seek_popup)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const avatarUrl = common_vendor.ref("/static/avatar.png");
    const nickName = common_vendor.ref("SEEK用户");
    const actionList = [
      {
        icon: "icon_save",
        title: "我的保存"
      },
      {
        icon: "icon_follow1",
        title: "我的关注"
      },
      {
        icon: "icon_order",
        title: "我的订单"
      }
    ];
    const navList = common_vendor.ref([
      {
        id: 1,
        icon: "icon_version",
        title: "当前版本",
        content: common_vendor.index.getSystemInfoSync().appVersion
      },
      {
        id: 2,
        icon: "icon_clear",
        title: "清理缓存"
      },
      {
        id: 3,
        icon: "icon_user",
        title: "用户ID",
        content: ""
      },
      {
        id: 4,
        icon: "icon_contact",
        title: "联系我们"
      }
    ]);
    const coachNavItems = [
      {
        id: 5,
        icon: "icon_user",
        title: "教练设置"
      },
      {
        id: 6,
        icon: "icon_user",
        title: "设置在线"
      }
    ];
    const settingPopupShow = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      getUserInfo();
    });
    const jumpPage = (index) => {
      const urlMap = {
        0: "/mine-save/mine-save",
        1: "/mine-follow/mine-follow",
        2: "/mine-order/mine-order"
      };
      common_vendor.index.navigateTo({
        url: `/pages${urlMap[index]}`
      });
    };
    const getUserInfo = async () => {
      const res = await api_index.userInfo();
      const { logo, nickname, train_id, id } = res.data;
      avatarUrl.value = logo;
      nickName.value = nickname;
      navList.value[2].content = id;
      if (train_id) {
        common_vendor.index.setStorageSync("train_id", train_id);
        navList.value.splice(3, 0, coachNavItems[0], coachNavItems[1]);
      }
    };
    const onChooseAvatar = (e) => {
      avatarUrl.value = e.detail.avatarUrl;
      handleUpdateUserInfo();
    };
    const onBlur = (e) => {
      handleUpdateUserInfo();
    };
    const handleUpdateUserInfo = async () => {
      await api_index.updateUserInfo({ logo: avatarUrl.value, nickname: nickName.value });
    };
    const onNavClick = (id) => {
      if (id === 5) {
        common_vendor.index.navigateTo({
          url: "/pages/coach-settings/coach-settings"
        });
      } else if (id === 4) {
        common_vendor.index.navigateTo({
          url: "/pages/contact-us/contact-us"
        });
      } else if (id === 6) {
        common_vendor.index.hideTabBar();
        settingPopupShow.value = true;
      }
    };
    const onMaskClick = () => {
      settingPopupShow.value = false;
      common_vendor.index.showTabBar();
    };
    const onSwitchChange = async (e) => {
      await api_index.setOnline({ online: e.detail.value });
      const text = e.detail.value ? "在线" : "离线";
      common_vendor.index.showToast({
        title: `您已设置${text}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-bg"]: true,
          ["show-logo"]: true
        }),
        b: avatarUrl.value,
        c: common_vendor.o(onChooseAvatar),
        d: common_vendor.o(onBlur),
        e: nickName.value,
        f: common_vendor.o(($event) => nickName.value = $event.detail.value),
        g: common_vendor.f(actionList, (item, index, i0) => {
          return {
            a: `/static/${item.icon}.png`,
            b: common_vendor.n(item.icon),
            c: common_vendor.t(item.title),
            d: index,
            e: common_vendor.o(($event) => jumpPage(index), index)
          };
        }),
        h: common_vendor.f(navList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: `/static/${item.icon}.png`,
            b: common_vendor.t(item.title),
            c: !item.content
          }, !item.content ? {} : {
            d: common_vendor.t(item.content)
          }, {
            e: item.id,
            f: common_vendor.o(($event) => onNavClick(item.id), item.id)
          });
        }),
        i: common_vendor.o(onSwitchChange),
        j: common_vendor.o(onMaskClick),
        k: common_vendor.p({
          show: settingPopupShow.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
