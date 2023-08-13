"use strict";
const common_vendor = require("../common/vendor.js");
const useLogin = () => {
  const hasLogin = () => {
    if (!common_vendor.index.getStorageSync("has_login")) {
      common_vendor.index.showToast({
        title: "请先登录",
        icon: "error",
        success: () => {
          const timer = setTimeout(() => {
            common_vendor.index.redirectTo({
              url: "/pages/login/login"
            });
            clearTimeout(timer);
          }, 1500);
        }
      });
      return false;
    }
    return true;
  };
  return {
    hasLogin
  };
};
exports.useLogin = useLogin;
