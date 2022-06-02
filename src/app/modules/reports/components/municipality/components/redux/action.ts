import {ParamsModel} from 'src/app/modules/common/Model'
import {actionTypes} from './constants'
export const actions = {
  // get Municipality DATA
  getMunicipality: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MUNICIPALITY_START,
    payload: params,
  }),
  getMunicipalitySuccess: (data: any) => ({
    type: actionTypes.GET_MUNICIPALITY_SUCCESS,
    payload: data,
  }),
  getMunicipalityFinish: () => ({
    type: actionTypes.GET_MUNICIPALITY_FINISH,
  }),
}
