import { combineReducers } from 'redux'
import {availableCars, IAvailableCarsState} from '../Cars/AvailableCars/reducers'
import {carDetails, ICarDetailsState} from '../Cars/CarDetails/reducers'

export interface IAppState {
  availableCars: IAvailableCarsState,
  carDetails: ICarDetailsState
}

export default combineReducers({
  availableCars,
  carDetails,
});
