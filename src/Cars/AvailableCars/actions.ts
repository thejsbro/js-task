import * as types from './actionTypes';
import axios from 'axios';
import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {IAppState} from 'common/reducers'

interface ICarSearchParams {
    page: number;
    sort: string;
    manufacturer: string;
    color: string;
}

type CARS_DATA_LOADED = typeof types.CARS_DATA_LOADED

export const getCars = (params?: ICarSearchParams) => {
    // const params = {page:1, sort:'desc', manufacturer: 'Audi', color:'red'}
    return (dispatch: Dispatch, getState: () => IAppState) => {
        dispatch({
            type: types.CARS_DATA_LOADING,
        })
        const {searchParams} = getState().availableCars;
        const newSearchParams = !!params ? params : searchParams;
        const cars = axios.get('/api/cars', {params: newSearchParams});
        const promises = [cars];
        if (!params) {
            const manufacturers = axios.get('/api/manufacturers');
            const colors = axios.get('/api/colors');
            promises.push(manufacturers, colors);
        }
        return (
            Promise.all(promises)
                .then((response) => {
                    dispatch({
                    type: types.CARS_DATA_LOADED,
                    data: response,
                })})
                .catch((error) => console.log('ERROR: ', error))
        )};
}

export const setRequestParams = (params: ICarSearchParams) => ({
    type: types.SET_SEARCH_PARAMS,
    data: params,
});

export const dropPagination = () => ({
    type: types.DROP_PAGINATION
})
