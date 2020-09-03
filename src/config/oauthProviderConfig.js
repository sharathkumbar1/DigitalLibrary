import apiConfig from './apiConfig'

const OAuthProviderConfig = {
  authorizationUrl: `${apiConfig.auth.host}${apiConfig.auth.authorizationPath}`,
  clientId: apiConfig.auth.clientId,
  logoutUrl: `${apiConfig.auth.logoutHost}${apiConfig.auth.logoutPath}`,
  nonce: apiConfig.auth.nonce,
  popupOptions: apiConfig.auth.popupOptions,
  redirectUri: apiConfig.auth.redirectUri,
  responseType: apiConfig.auth.responseType,
  scope: apiConfig.auth.scope,
  storageType: apiConfig.auth.storageType,
  tokenType: apiConfig.auth.tokenType,
}

export default OAuthProviderConfig
