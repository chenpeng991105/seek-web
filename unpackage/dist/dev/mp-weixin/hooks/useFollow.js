"use strict";
const common_vendor = require("../common/vendor.js");
const api_index = require("../api/index.js");
const useFollow = () => {
  const onFollowCoach = async (params, cb) => {
    await api_index.followCoach(params);
    cb();
    common_vendor.index.showToast({
      title: params.is_follow ? "关注成功" : "取消关注"
    });
  };
  return {
    onFollowCoach
  };
};
exports.useFollow = useFollow;
