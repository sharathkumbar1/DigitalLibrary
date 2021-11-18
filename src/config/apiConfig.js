import merge from "lodash/merge";

const commonConfig = {
  auth: {},
};

const envConfigs = {
  qa: {
    auth: {},
    signup: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup",
    },
    signup: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup',
    },
    signin: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/login',
    },
    forgotpw: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/password/forgot',
    },
    updatepw: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/password/update',
    },
    accountvf: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup/verify',
    },
  },
  dev: {
    auth: {},
    signup: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup",
    },
    signup: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup',
    },
    signin: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/login',
    },
    forgotpw: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/password/forgot',
    },
    updatepw: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/password/update',
    },
    accountvf: {
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup/verify',
    },
  },
  stg: {
    auth: {},
    signup: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup",
    },
    signin: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/login",
    },
    forgotpw: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/password/forgot",
    },
    updatepw: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/password/update",
    },
    accountvf: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup/verify",
    },
  },
  prod: {
    auth: {},
    signup: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup",
    },
    signin: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/login",
    },
    forgotpw: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/password/forgot",
    },
    updatepw: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/password/update",
    },
    accountvf: {
      key: "b9ef4b57f852f9a3c886bd8b0da5447c23eacb65",
      url: "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/user/signup/verify",
    },
  },
};

// env.js sets APP_ENV
const appEnv = process.env.REACT_APP_ENV;
const config = envConfigs[appEnv];
const apiConfig = merge(commonConfig, config);

export default apiConfig;
