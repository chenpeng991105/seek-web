"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "coach-info",
  props: {
    coachInfo: {
      type: Object,
      default: () => ({})
    },
    showCoachData: {
      type: Boolean,
      default: () => true
    }
  },
  setup(__props) {
    const props = __props;
    const jumpCoachDetail = () => {
      const { id } = props.coachInfo;
      common_vendor.index.navigateTo({
        url: `/pages/coach-detail/coach-detail?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return common_vendor.e({
        a: (_a = __props.coachInfo) == null ? void 0 : _a.head_img,
        b: common_vendor.t((_b = __props.coachInfo) == null ? void 0 : _b.name),
        c: common_vendor.t(((_c = __props.coachInfo) == null ? void 0 : _c.online) ? "在线" : "离线"),
        d: common_vendor.n(((_d = __props.coachInfo) == null ? void 0 : _d.online) ? "online" : "offline"),
        e: common_vendor.f(__props.coachInfo.tag, (item, index, i0) => {
          return {
            a: common_vendor.t(`#${item.name}`),
            b: index
          };
        }),
        f: __props.showCoachData
      }, __props.showCoachData ? {
        g: common_vendor.t((_e = __props.coachInfo) == null ? void 0 : _e.answer_num),
        h: common_vendor.t((_f = __props.coachInfo) == null ? void 0 : _f.online_num),
        i: common_vendor.t((_g = __props.coachInfo) == null ? void 0 : _g.fan_num)
      } : {}, {
        j: common_vendor.t((_h = __props.coachInfo) == null ? void 0 : _h.be_good),
        k: common_vendor.o(jumpCoachDetail)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50c71976"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/components/coach-info/coach-info.vue"]]);
wx.createComponent(Component);
