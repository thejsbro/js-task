import * as types from './actionTypes';
import axios from 'axios';
import {get} from 'lodash';

interface ICarSearchParams {
    page: number;
    sort: string;
    manufacturer: string;
    color: string;
}

export const getCarDetails = (stockNumber: string) =>
    (dispatch: any) => {
        dispatch({
            type: types.CAR_DETAILS_LOADING,
        })
        return (
            axios.get(`/api/cars/${stockNumber}`)
                .then((response) => {
                    dispatch({
                    type: types.CAR_DETAILS_LOADED,
                    data: get(response, 'data.car', {}),
                })})
                .catch((error) => console.log('ERROR: ', error))
    )};
