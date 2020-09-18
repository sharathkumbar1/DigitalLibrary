import merge from 'lodash/merge'

const commonConfig = {
  auth: {
    
  },
}

const envConfigs = {
  qa: {
    auth: {
     
    },
    fileTypes: {
      url: 'data/fileTypes.json',
    },
    domains: {
      url: 'data/domains.json',
    },
    vendors: {
      url: 'data/vendors.json',
    },
    templates: {
      url: 'data/templates.json',
    },
    saveTemplate: {
     
    },
    templatesByVendorName: {
      url: '',
    },
    pullValuesForSingleTemplate: {
      url: '',
    },
    uploadBulkDocsToTemplate: {
      url: '',
    },
    findDocsByUser: {
      
      url: '',
    },
    pullDocumentById: {
      url: '',
    },
    documentFeedback: {
      url: '',
    },
  },
  stg: {
    auth: {
      
    },
    fileTypes: {
      url: 'data/fileTypes.json',
    },
    domains: {
      url: 'data/domains.json',
    },
    vendors: {
      url: 'data/vendors.json',
    },
    templates: {
      url: 'data/templates.json',
    },
    saveTemplate: {
      url: '',
    },
    templatesByVendorName: {
      url: '',
    },
    pullValuesForSingleTemplate: {
      url: '',
    },
    uploadBulkDocsToTemplate: {
      url: '',
    },
    findDocsByUser: {
      url: '',
    },
    pullDocumentById: {
      url: '',
    },
    documentFeedback: {
      url: '',
    },
  },
  prod: {
    auth: {
    },
    fileTypes: {
      url: 'data/fileTypes.json',
    },
    domains: {
      url: 'data/domains.json',
    },
    vendors: {
      url: 'data/vendors.json',
    },
    templates: {
      url: 'data/templates.json',
    },
    saveTemplate: {
      url: '',
    },
    templatesByVendorName: {
      url: '',
    },
    pullValuesForSingleTemplate: {
      url: '',
    },
    uploadBulkDocsToTemplate: {
      url: '',
    },
    findDocsByUser: {
      url: '',
    },
    pullDocumentById: {
      url: '',
    },
    documentFeedback: {
      url: '',
    },
  },
}

// env.js sets APP_ENV
const appEnv = process.env.APP_ENV
const config = envConfigs[appEnv]
const apiConfig = merge(commonConfig, config)

export default apiConfig
