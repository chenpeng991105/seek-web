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
  __name: "edit-homepage",
  setup(__props) {
    const state = common_vendor.reactive({
      avatarUrl: "/static/avatar.png",
      nickName: "SEEK用户",
      tagList: [],
      selectedTagId: [],
      trainImages: [],
      lifeImages: [],
      certImages: [],
      experience: "",
      beGood: ""
    });
    const tagPopupShow = common_vendor.ref(false);
    const baseInfoCount = common_vendor.computed(() => {
      const { avatarUrl, nickName, selectedTagId } = state;
      return Number(avatarUrl.length > 0) + Number(nickName.length > 0) + Number(selectedTagId.length > 0);
    });
    const imageInfoCount = common_vendor.computed(() => {
      const { trainImages, lifeImages, certImages } = state;
      return Number(trainImages.length > 0) + Number(lifeImages.length > 0) + Number(certImages.length > 0);
    });
    const otherInfoCount = common_vendor.computed(() => {
      const { experience, beGood } = state;
      return Number(experience.length > 0) + Number(beGood.length > 0);
    });
    common_vendor.onLoad(() => {
      getTagList();
      common_vendor.index.$on("upload-images", (data) => {
        handleUploadImages(data);
      });
      common_vendor.index.$on("edit-content", (data) => {
        handleEditContent(data);
      });
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("upload-images");
      common_vendor.index.$off("edit-content");
    });
    const onChooseAvatar = (e) => {
      state.avatarUrl = e.detail.avatarUrl;
    };
    const getTagList = async () => {
      const res = await api_index.tagList();
      state.tagList = res.data;
    };
    const onSelectTag = (id) => {
      if (state.selectedTagId.includes(id)) {
        const index = state.selectedTagId.findIndex((item) => item === id);
        state.selectedTagId.splice(index, 1);
      } else {
        state.selectedTagId.push(id);
      }
    };
    const imageTypeMap = {
      1: "trainImages",
      2: "lifeImages",
      3: "certImages"
    };
    const jumpUploadImages = (type) => {
      const images = state[imageTypeMap[type]];
      common_vendor.index.navigateTo({
        url: `/pages/upload-images/upload-images?type=${type}`,
        success: (res) => {
          res.eventChannel.emit("images", images);
        }
      });
    };
    const handleUploadImages = (data) => {
      const { images, type } = data;
      state[imageTypeMap[type]] = images;
    };
    const contentTypeMap = {
      1: "experience",
      2: "beGood"
    };
    const jumpEditContent = (type) => {
      const content = state[contentTypeMap[type]];
      common_vendor.index.navigateTo({
        url: `/pages/edit-content/edit-content?type=${type}`,
        success: (res) => {
          res.eventChannel.emit("content", content);
        }
      });
    };
    const handleEditContent = (data) => {
      const { content, type } = data;
      state[contentTypeMap[type]] = content;
    };
    const tipsContentMap = {
      nickName: "请输入姓名",
      selectedTagId: "请选择标签",
      trainImages: "请上传训练照",
      lifeImages: "请上传生活照",
      certImages: "请上传证件",
      experience: "请填写职业经历",
      beGood: "请填写擅长内容"
    };
    const checkState = () => {
      const keys = Object.keys(state);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = state[key];
        if (!val || !val.length) {
          common_vendor.index.showToast({
            title: tipsContentMap[key],
            icon: "none"
          });
          return false;
        }
      }
      return true;
    };
    const getConvertState = () => {
      const { avatarUrl, nickName, selectedTagId, tagList, trainImages, lifeImages, certImages, experience, beGood } = state;
      return {
        head_img: avatarUrl,
        name: nickName,
        train_img: trainImages,
        life_img: lifeImages,
        cert_img: certImages,
        experience,
        be_good: beGood,
        tag: selectedTagId
      };
    };
    const onSubmit = async () => {
      if (!checkState())
        return;
      const data = getConvertState();
      await api_index.updateCoach(data);
      common_vendor.index.showToast({
        title: "编辑成功",
        success: () => {
          common_vendor.index.navigateBack();
        }
      });
    };
    const jumpPreview = () => {
      const data = getConvertState();
      const trainId = common_vendor.index.getStorageSync("train_id");
      common_vendor.index.navigateTo({
        url: `/pages/coach-detail/coach-detail?id=${trainId}&view_mode=preview`,
        success: (res) => {
          res.eventChannel.emit("coachDetail", data);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-bg"]: true,
          ["show-back"]: true
        }),
        b: common_vendor.o(jumpPreview),
        c: common_vendor.t(common_vendor.unref(baseInfoCount)),
        d: state.avatarUrl,
        e: common_vendor.o(onChooseAvatar),
        f: state.nickName,
        g: common_vendor.o(($event) => state.nickName = $event.detail.value),
        h: common_vendor.t(state.selectedTagId.length),
        i: common_vendor.o(($event) => tagPopupShow.value = true),
        j: common_vendor.t(common_vendor.unref(imageInfoCount)),
        k: common_vendor.t(state.trainImages.length),
        l: common_vendor.o(($event) => jumpUploadImages(1)),
        m: common_vendor.t(state.lifeImages.length),
        n: common_vendor.o(($event) => jumpUploadImages(2)),
        o: common_vendor.t(state.certImages.length),
        p: common_vendor.o(($event) => jumpUploadImages(3)),
        q: common_vendor.t(common_vendor.unref(otherInfoCount)),
        r: state.experience,
        s: common_vendor.o(($event) => jumpEditContent(1)),
        t: state.beGood,
        v: common_vendor.o(($event) => jumpEditContent(2)),
        w: common_vendor.o(onSubmit),
        x: common_vendor.f(state.tagList, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag.name),
            b: state.selectedTagId.includes(tag.id) ? 1 : "",
            c: tag.id,
            d: common_vendor.o(($event) => onSelectTag(tag.id), tag.id)
          };
        }),
        y: common_vendor.o(($event) => tagPopupShow.value = false),
        z: common_vendor.p({
          show: tagPopupShow.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e9daed4"], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/pages/edit-homepage/edit-homepage.vue"]]);
wx.createPage(MiniProgramPage);
