// import { VisibilityFilters } from './actions'
import * as types from './actionTypes';
import { AnyAction } from 'redux';
import { ICar, ICarSearchParams } from 'common/types';

export interface IAvailableCarsState {
    cars: ICar[];
    searchParams: ICarSearchParams;
}

const initialState = {
    cars: [],
    searchParams: {
        page: 1,
        sort: 'desc',
        manufacturer: '',
        color:'',
    },
    colors: [],
    manufacturers: [],
    totalPageCount: 0,
    totalCarsCount: 0,
};

export function availableCars(state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.CARS_DATA_LOADING: {
            return { ...state, loading: true }
        }
        case types.CARS_DATA_LOADED: {
            const {cars, totalCarsCount, totalPageCount} = action.data[0].data;
            const newState = {...state, cars, totalCarsCount, totalPageCount, loading: false, loaded: true}
            if (action.data.length === 1) {
                return newState;
            } else {
                const manufacturers = action.data[1].data.manufacturers.map((el: any) => el.name);
                const colors = action.data[2].data.colors;
                return {...newState, manufacturers, colors}
            }
        }
        case types.SET_SEARCH_PARAMS: {
            return {...state, searchParams: action.data}
        }
        case types.DROP_PAGINATION: {
            const searchParams = {
                ...state.searchParams,
                page: 1,
            }
            return {...state, searchParams}
        }
        default: {
            return state;
        }
    }
}
