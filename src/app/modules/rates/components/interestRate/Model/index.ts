export interface InterestRateModel {
  id?: string
  date?: string
  loanInterestRateFile?: any
  depositInterestRateFile?: any
  firstSectionInfoText?: string
  secondSectionInfoText?: string
  thirdSectionHeaderOneText?: string
  thirdSectionHeaderTwoText?: string
  thirdSectionBodyOneText?: string
  thirdSectionBodyTwoText?: string
}

export interface DeleteInterestRateModel {
  id: string
}
