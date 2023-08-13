"use strict";
const common_vendor = require("../common/vendor.js");
const useShare = (params = {}) => {
  let defaultOptions = {
    title: "Hello SEEK",
    path: "/pages/ai/ai",
    ...params
  };
  const shareApp = (options = {}) => {
    common_vendor.onShareAppMessage(() => {
      return {
        ...defaultOptions,
        ...options
      };
    });
  };
  return {
    onShareAppMessage: shareApp
  };
};
exports.useShare = useShare;
