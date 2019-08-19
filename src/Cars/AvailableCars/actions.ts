import * as types from './actionsTypes';
import axios from 'axios';
import { availableCars } from './reducers';

interface ICarSearchParams {
    page: number;
    sort: string;
    manufacturer: string;
    color: string;
}

export const getCars = (params?: ICarSearchParams) => {
    // const params = {page:1, sort:'desc', manufacturer: 'Audi', color:'red'}
    return (dispatch: any, getState: any) => {
        dispatch({
            type: types.CARS_DATA_LOADING,
        })
        const searchParams = !!params ? params : getState().availableCars.searchParams;
        const manufacturers = axios.get('/api/manufacturers');
        const colors = axios.get('/api/colors');
        console.log(searchParams)
        const cars = axios.get('/api/cars', {params: searchParams});
        const promises = !!params ? [cars] : [cars, manufacturers, colors];
        return (
            Promise.all(promises)
                .then((response) => {
                    console.log(response);
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
