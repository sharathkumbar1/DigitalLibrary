import merge from "lodash/merge";
import { url } from "./apiCalls";

const commonConfig = {
  auth: {},
};

const envConfigs = {
  qa: {
    auth: {},
    signup: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/signup"
    },
    signup: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/signup',
    },
    signin: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/login',
    },
    forgotpw: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/password/forgot',
    },
    updatepw: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/password/update',
    },
    accountvf: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/signup/verify',
    },
  },
  dev: {
    auth: {},
    signup: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/signup",
    },
    signup: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/signup',
    },
    signin: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/login',
    },
    forgotpw: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/password/forgot',
    },
    updatepw: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/password/update',
    },
    accountvf: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: url+'user/signup/verify',
    },
  },
  stg: {
    auth: {},
    signup: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/signup",
    },
    signin: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/login",
    },
    forgotpw: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/password/forgot",
    },
    updatepw: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/password/update",
    },
    accountvf: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/signup/verify",
    },
  },
  prod: {
    auth: {},
    signup: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/signup",
    },
    signin: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/login",
    },
    forgotpw: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/password/forgot",
    },
    updatepw: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/password/update",
    },
    accountvf: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: url+"user/signup/verify",
    },
  },
};

// env.js sets APP_ENV
const appEnv = process.env.REACT_APP_ENV;
const config = envConfigs[appEnv];
const apiConfig = merge(commonConfig, config);

export default apiConfig;
