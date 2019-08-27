// import { VisibilityFilters } from './actions'
import * as types from './actionTypes';
import { AnyAction } from 'redux';
import { ICar } from 'common/types';

export interface ICarDetailsState {
    car: ICar | {};
    loading: false;
    loaded: false;
}

const initialState: ICarDetailsState = {
    car: {},
    loading: false,
    loaded: false
};

export function carDetails(state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.CAR_DETAILS_LOADING: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case types.CAR_DETAILS_LOADED: {
            return {
                ...state,
                car: action.data,
                loading: false,
                loaded: true
            }
        }
        default: {
            return state;
        }
    }
}
