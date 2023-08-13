"use strict";
const common_vendor = require("../common/vendor.js");
const js_sdk_luchRequest_luchRequest_core_Request = require("../js_sdk/luch-request/luch-request/core/Request.js");
const api_index = require("../api/index.js");
const baseURL = "http://101.200.74.207:20031";
const http = new js_sdk_luchRequest_luchRequest_core_Request.Request();
http.setConfig((config) => {
  config.baseURL = baseURL;
  return config;
});
http.interceptors.request.use(
  (config) => {
    config.header = {
      ...config.header,
      token: common_vendor.index.getStorageSync("token") || ""
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
let isRefresh = false;
let requestQueues = [];
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.log(err);
    if (err.statusCode === 401) {
      const config = err.config;
      if (!isRefresh) {
        isRefresh = true;
        return getToken().then(() => {
          requestQueues.forEach((cb) => cb());
          requestQueues = [];
          return http.request(config);
        }).finally(() => {
          isRefresh = false;
        });
      } else {
        return new Promise((resolve) => {
          requestQueues.push(() => {
            resolve(http.request(config));
          });
        });
      }
    } else {
      common_vendor.index.showToast({
        title: "出错了，请重试",
        icon: "error"
      });
    }
    return Promise.reject(err);
  }
);
const getToken = () => {
  return new Promise((resolve) => {
    common_vendor.index.login({
      provider: "weixin",
      success: async ({ code }) => {
        api_index.login({ code }).then((res) => {
          common_vendor.index.setStorageSync("token", res.data.token);
          resolve();
        });
      }
    });
  });
};
exports.getToken = getToken;
exports.http = http;
