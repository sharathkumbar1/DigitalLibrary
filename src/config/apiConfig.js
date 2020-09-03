import merge from 'lodash/merge'

const commonConfig = {
  auth: {
    authorizationPath: '/auth/oauth/v2/authorize',
    logoutPath: '/login/responses/logoff.html',
    popupOptions: { width: 482, height: 680 },
    redirectUri: `${window.location.origin}/auth/login`,
    responseType: 'token id_token',
    scope: ['openid profile'],
    storageType: 'localStorage',
    tokenType: 'Bearer',
  },
}

const envConfigs = {
  qa: {
    auth: {
      host: 'https://oauth.iam.perf.target.com',
      logoutHost: 'https://logonservices.iam.perf.target.com',
      clientId: 'intelligent_cv_npe_im',
      nonce: '1234',
    },
    fileTypes: {
      url: 'data/fileTypes.json',
    },
    domains: {
      url: 'data/domains.json',
    },
    vendors: {
      url: 'data/vendors.json',
      // url: 'https://templateapi.dev.target.com/cv/listVendors',
    },
    templates: {
      url: 'data/templates.json',
    },
    saveTemplate: {
      url: 'https://templateapi.dev.target.com/cv/save',
    },
    templatesByVendorName: {
      url: 'https://templateapi.dev.target.com/cv/findByVendorName/',
    },
    pullValuesForSingleTemplate: {
      url: 'https://documentparserapi.dev.target.com/document/upload/extract/',
    },
    uploadBulkDocsToTemplate: {
      url: 'https://documentparserapi.dev.target.com/document/upload/parseDocuments',
    },
    findDocsByUser: {
      // url: 'data/mock-doc-listing.json',
      url: 'https://documentparserapi.dev.target.com/document/findDocumentsByUser/',
    },
    pullDocumentById: {
      url: 'https://documentparserapi.dev.target.com/document/',
    },
    documentFeedback: {
      url: 'https://documentparserapi.dev.target.com/document/feedback/',
    },
  },
  stg: {
    auth: {
      host: 'https://oauth.iam.perf.target.com',
      logoutHost: 'https://logonservices.iam.perf.target.com',
      clientId: 'intelligent_cv_npe_im',
      nonce: '1234',
    },
    fileTypes: {
      url: 'data/fileTypes.json',
    },
    domains: {
      url: 'data/domains.json',
    },
    vendors: {
      url: 'data/vendors.json',
      // url: 'https://templateapi.dev.target.com/cv/listVendors',
    },
    templates: {
      url: 'data/templates.json',
    },
    saveTemplate: {
      url: 'https://templateapi.dev.target.com/cv/save',
    },
    templatesByVendorName: {
      url: 'https://templateapi.dev.target.com/cv/findByVendorName/',
    },
    pullValuesForSingleTemplate: {
      url: 'https://documentparserapi.dev.target.com/document/upload/extract/',
    },
    uploadBulkDocsToTemplate: {
      url: 'https://documentparserapi.dev.target.com/document/upload/parseDocuments',
    },
    findDocsByUser: {
      // url: 'data/mock-doc-listing.json',
      url: 'https://documentparserapi.dev.target.com/document/findDocumentsByUser/',
    },
    pullDocumentById: {
      url: 'https://documentparserapi.dev.target.com/document/',
    },
    documentFeedback: {
      url: 'https://documentparserapi.dev.target.com/document/feedback/',
    },
  },
  prod: {
    auth: {
      host: 'https://oauth.iam.target.com',
      logoutHost: 'https://logonservices.iam.target.com',
      clientId: 'intelligent_cv_prod_im',
      nonce: '1234',
    },
    fileTypes: {
      url: 'data/fileTypes.json',
    },
    domains: {
      url: 'data/domains.json',
    },
    vendors: {
      url: 'data/vendors.json',
      // url: 'https://templateapi.dev.target.com/cv/listVendors',
    },
    templates: {
      url: 'data/templates.json',
    },
    saveTemplate: {
      url: 'https://templateapi.dev.target.com/cv/save',
    },
    templatesByVendorName: {
      url: 'https://templateapi.dev.target.com/cv/findByVendorName/',
    },
    pullValuesForSingleTemplate: {
      url: 'https://documentparserapi-stage.prod.target.com/document/upload/extract/',
    },
    uploadBulkDocsToTemplate: {
      url: 'https://documentparserapi-stage.prod.target.com/document/upload/parseDocuments',
    },
    findDocsByUser: {
      // url: 'data/mock-doc-listing.json',
      url: 'https://documentparserapi-stage.prod.target.com/document/findDocumentsByUser/',
    },
    pullDocumentById: {
      url: 'https://documentparserapi-stage.prod.target.com/document/',
    },
    documentFeedback: {
      url: 'https://documentparserapi-stage.prod.target.com/document/feedback/',
    },
  },
}

// env.js sets APP_ENV
const appEnv = process.env.APP_ENV
const config = envConfigs[appEnv]
const apiConfig = merge(commonConfig, config)

export default apiConfig
