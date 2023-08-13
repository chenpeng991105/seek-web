"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "upload-image",
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: () => 5
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const images = common_vendor.ref([]);
    common_vendor.watch(
      () => props.modelValue,
      (value) => {
        images.value = value;
      }
    );
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        success: (res) => {
          images.value = [...images.value, ...res.tempFilePaths].slice(0, 20);
          emit("update:modelValue", images.value);
        }
      });
    };
    const deleteImage = (index) => {
      images.value.splice(index, 1);
      emit("update:modelValue", images.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(images.value, (image, index, i0) => {
          return {
            a: image,
            b: common_vendor.o(($event) => deleteImage(index), index),
            c: index
          };
        }),
        b: images.value.length < __props.limit,
        c: common_vendor.o(chooseImage),
        d: common_vendor.t(images.value.length),
        e: common_vendor.t(__props.limit)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6c5b0980"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/components/upload-image/upload-image.vue"]]);
wx.createComponent(Component);
