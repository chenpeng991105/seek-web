"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_nav_bar2 = common_vendor.resolveComponent("nav-bar");
  _easycom_nav_bar2();
}
const _easycom_nav_bar = () => "../../components/nav-bar/nav-bar.js";
if (!Math) {
  _easycom_nav_bar();
}
const _sfc_main = {
  __name: "coach-settings",
  setup(__props) {
    const settingsList = [
      {
        icon: "icon_user1",
        title: "个人主页"
      },
      {
        icon: "icon_income",
        title: "我的收入"
      },
      {
        icon: "icon_fans",
        title: "我的粉丝"
      }
    ];
    const jumpPage = (index) => {
      const urlMap = {
        0: "/pages/edit-homepage/edit-homepage",
        1: "/pages/mine-income/mine-income"
      };
      common_vendor.index.navigateTo({
        url: urlMap[index]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-bg"]: true,
          ["show-back"]: true,
          title: "教练设置"
        }),
        b: common_vendor.f(settingsList, (item, index, i0) => {
          return {
            a: `/static/${item.icon}.png`,
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => jumpPage(index), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c0abeb4"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/coach-settings/coach-settings.vue"]]);
wx.createPage(MiniProgramPage);
