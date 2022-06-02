export {}

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      API_URL: string
      NODE_ENV: string
      REACT_APP_API_URL: string
      REACT_APP_PURCHASE_URL: string
      REACT_APP_THEME_NAME: string
      PUBLIC_URL: string
      REACT_APP_BASE_URL: string
      REACT_APP_I18N_CONFIG_KEY: string
      REACT_APP_BASE_LAYOUT_CONFIG_KEY: string
      REACT_APP_THEME_DEMO: string
      REACT_APP_PREVIEW_REACT_URL: string
    }
  }
}
