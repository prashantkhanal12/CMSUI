export interface ServiceManagerResponseType {
  config: {[key: string]: string}
  data: {data: ServiceManagerDataType}
  status: number
  statusText: string
}

export interface ServiceManagerDataType {
  serviceManager: Array<ServiceManagerType> | []
  meta: {
    current_page: 0
    perPage: 10
    total: 0
  }
}

export interface SortServiceManagerModel {
  serviceManagerId: Array<{id: string}>
}

export interface SortServiceManagerActionModel {
  payload: SortServiceManagerModel
  type: {[key: string]: string}
}

export interface ServiceManagerType {
  id: string
  title: string
  titleNp: string
  slug: string
  serviceCategory: {
    id: string
    name: string
    name_np: string
    slug: string
    status: boolean
    order: string
  }
  shortDescription: string
  shortDescriptionNp: string
  description: string
  descriptionNp: string
  featuredInHome: boolean
  servicePopularity: {
    id: string
    systemName: string
    displayName: string
  }
  serviceLeadForm: {
    id: string
    systemName: string
    displayName: string
  }
  serviceReview: {
    id: string
    systemName: string
    displayName: string
  }
  rating: string
  serviceFeature: {
    id: string
    systemName: string
    displayName: string
  }
  featureTitle: string
  featureTitleNp: string
  featureDescription: string
  featureDescriptionNp: string
  featureHelpText: string
  featureHelpTextNp: string
  serviceFaq: {
    id: string
    systemName: string
    displayName: string
  }
  faq: {
    id: string
    name: string
    tableViewName: string
    name_np: string
    slug: string
    status: boolean
    order: number
    faq_icon_type: {
      id: string
      system_name: string
      display_name: string
    }
    image: string
    iconType: string
    parent: Array<{
      id: string
      name: string
    }>
  }
  serviceDocument: {
    id: string
    systemName: string
    displayName: string
  }
  documentTitle: string
  documentTitleNp: string
  documentDescription: string
  documentDescriptionNp: string
  serviceRelated: {
    id: string
    systemName: string
    displayName: string
  }
  serviceApplyNow: {
    id: string
    systemName: string
    displayName: string
  }
  status: true
  serviceTags: {
    serviceTag: Array<{
      id: string
      name: string
      name_np: string
      status: boolean
      serviceCategory: {
        id: string
        name: string
        name_np: string
        slug: string
        status: boolean
        order: string
      }
    }>
  }
  pageHeader: {
    id: string
    headerImage: string
    tagLine: string
    tagLineNp: string
    firstCtaButtonText: string
    firstCtaButtonTextNp: string
    firstCtaButtonLink: string
    secondCtaButtonText: string
    secondCtaButtonTextNp: string
    secondCtaButtonLink: string
  }
  mediaSetting: {
    id: string
    thumbImage: string
    mediaType: {
      id: string
      systemName: string
      displayName: string
    }
    image: string
    iframe: string
  }
  featureSetting: Array<{
    id: string
    description: string
    description_np: string
    order: string
  }>
  documentSetting: Array<{
    id: string
    description: string
    description_np: string
    order: string
  }>
  additionalSetting: Array<{
    id: string
    text: string
    text_np: string
    description: string
    description_np: string
    order: string
  }>
  applyNowSetting: {
    id: string
    text: string
    textNp: string
    firstButtonText: string
    firstButtonTextNp: string
    firstButtonLink: string
    secondButtonText: string
    secondButtonTextNp: string
    secondButtonLink: string
  }
  relatedSetting: {
    id: string
    text: string
    textNp: string
    subText: string
    subTextNp: string
    buttonText: string
    buttonTextNp: string
    buttonLink: string
    relatedService: Array<{
      id: string
      title: string
    }>
  }
  modelType: string
}

export interface ServiceOptionType {
  id?: string
  systemName?: string
  displayName?: string
  name?: string
}

export interface FormOptionModal {
  label: string
  value: string
  systemName?: string
  name?: string
}

export interface CategoryModel {
  id?: string
  name?: string
  nameNp?: string
  slug?: string
  // typeId?: ContentOptionModal[]
  order?: number
}

export interface FeatureArrayType {
  description: string
  descriptionNp: string
  order: number
}
