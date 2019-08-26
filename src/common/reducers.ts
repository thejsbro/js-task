import { combineReducers } from 'redux'
import {availableCars} from '../Cars/AvailableCars/reducers'
import {carDetails} from '../Cars/CarDetails/reducers'

export default combineReducers({
  availableCars,
  carDetails,
});
