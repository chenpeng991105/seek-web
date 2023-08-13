"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "ellipsis-text",
  props: {
    flag: {
      type: String,
      default: () => ""
    }
  },
  setup(__props) {
    const props = __props;
    const showAll = common_vendor.ref(false);
    const showBtn = common_vendor.ref(false);
    const instance = common_vendor.getCurrentInstance();
    const maxHeight = 144;
    common_vendor.onMounted(() => {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select(`#ellipsis-text-content${props.flag}`).boundingClientRect((rect) => {
        showBtn.value = rect.height > common_vendor.index.upx2px(maxHeight);
      }).exec();
    });
    return (_ctx, _cache) => {
      return {
        a: "ellipsis-text-content" + __props.flag,
        b: showBtn.value && !showAll.value,
        c: common_vendor.o(($event) => showAll.value = true),
        d: showBtn.value && showAll.value,
        e: common_vendor.o(($event) => showAll.value = false),
        f: !showAll.value ? 1 : ""
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-11cf254d"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/coach-detail/ellipsis-text.vue"]]);
wx.createComponent(Component);
