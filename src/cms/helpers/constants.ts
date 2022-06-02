export const imageBaseUrl =
  window.__RUNTIME_CONFIG__.NODE_ENV !== 'development'
    ? window.__RUNTIME_CONFIG__.REACT_APP_BASE_URL
    : '/framework'
