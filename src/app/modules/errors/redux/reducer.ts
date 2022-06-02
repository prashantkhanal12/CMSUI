
import { Action } from 'redux'
import { globalActionTypes } from './constants'

export interface ActionWithPayload<T> extends Action {
    payload?: T
}


export interface IErrorState {
    errorMessage?: string | null
    loading?: boolean
}


const initialErrorState: IErrorState = {
    errorMessage: null,
    loading: true
}

export const globalErrorReducer = (state: IErrorState = initialErrorState, action: ActionWithPayload<IErrorState>) => {
    switch (action.type) {
        case globalActionTypes.GLOBAL_ERROR: {
            return { ...state, errorMessage: action.payload, loading: false }
        }

        default:
            return state
    }
}