export interface ResponseModel {
  config: { [key: string]: string }
  data: { data: any }
  status: number
  statusText: string
}
