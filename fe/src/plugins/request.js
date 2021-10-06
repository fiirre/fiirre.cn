import axios from "axios";
import qs from "qs";
import _ from "lodash";
import { Message } from "element-ui";

// import router from '@/router'

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = _.get(store, "state.token", "no token");

    if (isFormData(config)) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.data = qs.stringify(config.data);
    }
    if (
      config.url.includes("/salary/web") ||
      config.url.includes("/salary/all")
    ) {
      const auth = {
        "x-eid": enterpriseId,
      };
      config.params = Object.assign({}, config.params, auth);
    }
    return config;
  },

  function (error) {
    return Promise.resolve({ code: -9999, data: null, msg: "", error });
  }
);

axios.interceptors.response.use(
  function (response) {
    const { code, msg, message } = response.data;
    // 浏览控件自定义接口
    if (!response.config.fetchOutDataShowError) {
      return response.data;
    }
    // 无权限
    if (code === -1000) {
      // ctrlResponseHandle  默认FALSE => 如TRUE获取数据处理的控制权
      if (response.config.ctrlResponseHandle) {
        return response.data;
      } else {
        store.state.showPermPic = true;
      }
    } else if (response.config.showError && code !== 200) {
      const { url } = response.config;
      if (
        !(url.includes("/qr_login_web") && code === -1) &&
        !(url.includes("sn_login") && code === -21) &&
        !(url.includes("qq_login") && code === -21) &&
        !(url.includes("wechat_login") && code === -1) &&
        !(url.includes("new_apply/set_apply") && code === -6)
      ) {
        Message.closeAll();
        Message({
          type: "error",
          message: msg || message,
        });
      }
    }

    return response.data;
  },

  function (error) {
    if (
      error &&
      error.response &&
      !error.response.config.fetchOutDataShowError
    ) {
      return Promise.resolve({});
    }
    if (error.response && error.response.status === 401) {
      const urls = ["welcomeJoin", "enterRegister"];
      let targetUrl = "/login";

      if (urls.some((x) => location.href.includes(x))) {
        targetUrl = "/registerLogin" + location.search;
      }

      Message.closeAll();
      Message({
        type: "error",
        message: "登录信息失效，请重新登录",
        onClose: () => {
          localStorage.removeItem("token");
          window.location.href = targetUrl;
        },
      });
    } else {
      Message.closeAll();
      Message({
        type: "error",
        message: "网络异常",
      });
    }
    store.commit("SET_UPLOADINGFLAG", false);
    return Promise.resolve({
      code: error.response.status,
      data: null,
      msg: error.message,
      error,
    });
  }
);

/**
 * 是否为 FormData 提交格式
 * @param {object} config axios 配置
 */
function isFormData(config) {
  if (_.get(config, "headers[Content-Type]")) {
    return false;
  }
  return (
    (config.url.includes("web_api") || config.url.includes("oauth2")) &&
    config.method === "post"
  );
}

/**
 * 将对象的某个属性移动到另一个对象中
 *
 * @param {object} from 原对象
 * @param {object} to 目标对象
 * @param {string} key 移动的 key 值
 * @param {any} defaultValue 默认值
 */
function moveProp(from, to, key, defaultValue) {
  if (!isObject(from)) {
    from = {};
  }

  if (!isObject(to)) {
    to = {};
  }

  if (Object.prototype.hasOwnProperty.call(from, key)) {
    to[key] = from[key];
    delete from[key];
  } else {
    to[key] = defaultValue;
  }
}

function isObject(o) {
  return o != null && typeof o === "object";
}

export default axios;
