import moment from "moment"

export const toAbsoluteUrl = (pathname: string) => window.__RUNTIME_CONFIG__.PUBLIC_URL + pathname

export const getTodayDate = () => moment().format('YYYY-MM-DD')
