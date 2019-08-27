// import { VisibilityFilters } from './actions'
import * as types from './actionTypes';
import { AnyAction } from 'redux';

export interface ICarDetailsState {
    cars: number[];
}

const initialState: number[] = [];

export function favoriteCars(state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.TOGGLE_FAVORITES: {
            if (!state.filter((el) => el === action.data).length) {
                return [...state, action.data]
            } else {
                return state.filter((el) => el !== action.data)
            }
        }
        default: {
            return state;
        }
    }
}
