export interface GoldRateModel {
  id?: string
  date?: string
  time?: string
  status?: boolean
}

export interface GoldCategory {
  id?: string
  unit_in_tola?: string
  rate_per_tola?: string
  unit_in_gram?: string
  rate_per_gram?: string
}

export interface DeleteGoldRateModel {
  id: string
}
