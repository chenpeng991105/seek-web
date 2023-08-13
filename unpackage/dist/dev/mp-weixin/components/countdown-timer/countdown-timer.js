"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    // 倒计时时长（单位：毫秒）
    time: {
      type: Number,
      default: 0
    },
    // 是否自动
    "autoStart": {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: null,
      timeData: {
        remain: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      }
    };
  },
  watch: {
    time() {
      this.reset();
    }
  },
  methods: {
    // 补0
    fillWithZero(num, n) {
      var len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    // 设置timeData
    updateTimeData() {
      let t = this.timeData.remain;
      this.timeData.day = Math.floor(t / 1e3 / 60 / 60 / 24);
      this.timeData.hour = Math.floor(t / 1e3 / 60 / 60 % 24);
      this.timeData.minute = this.fillWithZero(Math.floor(t / 1e3 / 60 % 60), 2);
      this.timeData.second = this.fillWithZero(Math.floor(t / 1e3 % 60), 2);
    },
    // 开启倒计时
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      if (this.timeData.remain < 1e3) {
        return;
      }
      this.timer = setInterval(() => {
        this.timeData.remain -= 1e3;
        this.updateTimeData();
        if (this.timeData.remain < 1e3) {
          this.pause();
          this.$emit("finish");
        }
      }, 1e3);
    },
    // 重置倒计时
    reset() {
      this.timeData.remain = this.time;
      this.updateTimeData();
      if (this.autoStart) {
        this.start();
      }
    },
    // 暂停倒计时
    pause() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    // 开始倒计时
    start() {
      if (this.timer) {
        return;
      }
      this.startTimer();
    }
  },
  mounted() {
    this.reset();
  },
  beforeDestroy() {
    this.pause();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.r("d", {
      time: $props.time,
      remain: $data.timeData.remain,
      day: $data.timeData.day,
      hour: $data.timeData.hour,
      minute: $data.timeData.minute,
      second: $data.timeData.second
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/chenpeng/HBuilderProjects/seek-web/components/countdown-timer/countdown-timer.vue"]]);
wx.createComponent(Component);
