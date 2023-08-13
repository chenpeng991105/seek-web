"use strict";
const utils_request = require("../utils/request.js");
const login = (data) => {
  return utils_request.http.request({
    url: "/api/login/wx",
    method: "POST",
    data
  });
};
const auth = (data) => {
  return utils_request.http.request({
    url: "/api/wxuser/auth",
    method: "POST",
    data
  });
};
const updateUserInfo = (data) => {
  return utils_request.http.request({
    url: "/api/wxuser/update",
    method: "POST",
    data
  });
};
const userInfo = () => {
  return utils_request.http.request({
    url: "/api/wxuser/info"
  });
};
const hotSearch = () => {
  return utils_request.http.request({
    url: "/api/hotsearch/list"
  });
};
const aiChat = (data) => {
  return utils_request.http.request({
    url: "/api/chat",
    method: "POST",
    data
  });
};
const aiChatCount = () => {
  return utils_request.http.request({
    url: "/api/chat/count"
  });
};
const saveAiChat = (data) => {
  return utils_request.http.request({
    url: "/api/chat/save",
    method: "POST",
    data
  });
};
const chatSaveList = (data) => {
  return utils_request.http.request({
    url: "/api/chat/save/list",
    data
  });
};
const onlineChatList = (data) => {
  return utils_request.http.request({
    url: "/api/chat/msg",
    data
  });
};
const placementChat = (data) => {
  return utils_request.http.request({
    url: "/api/chat/msg/top",
    method: "POST",
    data
  });
};
const deleteChat = (data) => {
  return utils_request.http.request({
    url: "/api/chat/msg/del",
    method: "POST",
    data
  });
};
const taskList = () => {
  return utils_request.http.request({
    url: "/api/task/list"
  });
};
const tagInfo = (data) => {
  return utils_request.http.request({
    url: "/api/tag/info",
    data
  });
};
const tagList = (data) => {
  return utils_request.http.request({
    url: "/api/tag/list",
    data
  });
};
const recommendCoachList = (data) => {
  return utils_request.http.request({
    url: "/api/trainer/list",
    data
  });
};
const coachDetail = (data) => {
  return utils_request.http.request({
    url: "/api/trainer/info",
    data
  });
};
const searchCoach = (data) => {
  return utils_request.http.request({
    url: "/api/trainer/search",
    method: "POST",
    data
  });
};
const followCoach = (data) => {
  return utils_request.http.request({
    url: "/api/follow/sub",
    method: "POST",
    data
  });
};
const userFollowList = (data) => {
  return utils_request.http.request({
    url: "/api/follow/list",
    data
  });
};
const orderList = (data) => {
  return utils_request.http.request({
    url: "/api/order/list",
    data
  });
};
const orderPrePayInfo = (data) => {
  return utils_request.http.request({
    url: "/api/order/pre_pay",
    method: "POST",
    data
  });
};
const incomeList = (data) => {
  return utils_request.http.request({
    url: "/api/income/list",
    data
  });
};
const updateCoach = (data) => {
  return utils_request.http.request({
    url: "/api/trainer/update",
    method: "POST",
    data
  });
};
const complaint = (data) => {
  return utils_request.http.request({
    url: "/api/advice/add",
    method: "POST",
    data
  });
};
const setOnline = (data) => {
  return utils_request.http.request({
    url: "/api/trainer/online",
    method: "POST",
    data
  });
};
const deviceId = (data) => {
  return utils_request.http.request({
    url: "/api/im/device",
    method: "POST",
    data
  });
};
const wsUrl = "ws://101.200.74.207:20002/wx_ws";
const imUserInfo = (data) => {
  return utils_request.http.request({
    url: "/api/im/login",
    method: "POST",
    data
  });
};
const sendMessage = (data) => {
  return utils_request.http.request({
    url: "/api/im/send",
    method: "POST",
    data
  });
};
exports.aiChat = aiChat;
exports.aiChatCount = aiChatCount;
exports.auth = auth;
exports.chatSaveList = chatSaveList;
exports.coachDetail = coachDetail;
exports.complaint = complaint;
exports.deleteChat = deleteChat;
exports.deviceId = deviceId;
exports.followCoach = followCoach;
exports.hotSearch = hotSearch;
exports.imUserInfo = imUserInfo;
exports.incomeList = incomeList;
exports.login = login;
exports.onlineChatList = onlineChatList;
exports.orderList = orderList;
exports.orderPrePayInfo = orderPrePayInfo;
exports.placementChat = placementChat;
exports.recommendCoachList = recommendCoachList;
exports.saveAiChat = saveAiChat;
exports.searchCoach = searchCoach;
exports.sendMessage = sendMessage;
exports.setOnline = setOnline;
exports.tagInfo = tagInfo;
exports.tagList = tagList;
exports.taskList = taskList;
exports.updateCoach = updateCoach;
exports.updateUserInfo = updateUserInfo;
exports.userFollowList = userFollowList;
exports.userInfo = userInfo;
exports.wsUrl = wsUrl;
