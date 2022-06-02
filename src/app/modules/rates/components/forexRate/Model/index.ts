export interface ForexRateModel {
  id?: string
  date?: string
  time?: string
  status?: boolean
}

export interface ForexCategory {
  id?: string
  unit?: string
  cash_buy?: string
  non_cash_buy?: string
  sell?: string
  feature_order?: string
}

export interface DeleteForexRateModel {
  id: string
}
