// import { VisibilityFilters } from './actions'
import * as types from './actionTypes';
import { AnyAction } from 'redux';

export interface IAvailableCarsState {
    cars: string;
}

const initialState = {
    cars: '',
};

export function carDetails(state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.CAR_DETAILS_LOADING: {
            return {...state, loading: true}
        }
        case types.CAR_DETAILS_LOADED: {
            return {...state, car: action.data}
        }
        default: {
            return state;
        }
    }
}
