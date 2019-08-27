import { combineReducers } from 'redux'
import {availableCars, IAvailableCarsState} from '../Cars/AvailableCars/reducers'
import {carDetails, ICarDetailsState} from '../Cars/CarDetails/reducers'
import {favoriteCars} from '../Cars/FavoriteCars/reducers'
import {ICar} from './types'


export interface IAppState {
  availableCars: IAvailableCarsState,
  carDetails: ICarDetailsState,
  favoriteCars: number[]
}

export default combineReducers({
  availableCars,
  carDetails,
  favoriteCars,
});
