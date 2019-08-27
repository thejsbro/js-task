import * as types from './actionTypes';

export const toggleFavorites = (stockNumber: number) => ({
    type: types.TOGGLE_FAVORITES,
    data: stockNumber,
});
