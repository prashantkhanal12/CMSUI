export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = '*/*'
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: { accessToken, guestToken },
      } = store.getState()

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      } else if (guestToken) {
        config.headers.Authorization = `Bearer ${guestToken}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}
