import merge from 'lodash/merge'

const commonConfig = {
  auth: {

  },
}

const envConfigs = {
  qa: {
    auth: {

    },
    signup:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/signup',
    },
    signin:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/login',
    },
    forgotpw:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/password/forgot',
    },
  },
  dev: {
    auth: {

    },
    signup:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/signup',
    },
    signin:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/login',
    },
    forgotpw:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/password/forgot',
    },
  },
  stg: {
    auth: {

    },
    signup:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/signup',
    },
    signin:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/login',
    },
    forgotpw:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/password/forgot',
    },
  },
  prod: {
    auth: {
    },
    signup:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/signup',
    },
    signin:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/login',
    },
    forgotpw:{
      key: 'b9ef4b57f852f9a3c886bd8b0da5447c23eacb65',
      url: 'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/password/forgot',
    },
  },
}

// env.js sets APP_ENV
const appEnv = process.env.REACT_APP_ENV
const config = envConfigs[appEnv]
const apiConfig = merge(commonConfig, config)

export default apiConfig
