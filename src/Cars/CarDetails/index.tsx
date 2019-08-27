import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Button } from 'common/components/Button';
import {IAppState} from 'common/reducers'
import { ICar } from 'common/types';
import { WithLoaderHOC } from 'common/hocs/WithLoaderHOC';
import {
    getCarDetails as getCarDetailsAction,
} from './actions';
import {
    toggleFavorites as toggleFavoritesAction,
} from '../FavoriteCars/actions';
import './styles.scss';

interface ICarDetails {
    stockNumber: number;
}

interface IStateProps {
    car: ICar;
    favoriteCars: number[];
    loading: boolean;
    loaded: boolean;
}

interface IDispatchProps {
    getCarDetails: (stockNumber: number) => void;
    toggleFavorites: (stockNumber: number) => void;
}

type IProps = ICarDetails & IStateProps & IDispatchProps;

class CarDetails extends React.Component<IProps> {

    componentDidMount() {
        const { stockNumber, loaded, getCarDetails, car } = this.props;
        if (!loaded || car.stockNumber !== +stockNumber) {
            getCarDetails(stockNumber);
        }
    }

    handleButtonClick = () => this.props.toggleFavorites(this.props.car.stockNumber)

    render() {
        const {car, favoriteCars} = this.props;
        const isFavorite = !!favoriteCars.filter((el) => el === car.stockNumber).length
        return (
            <div>
                <div className='car-details-image'>
                    <img src='/images/logo.png'/>
                </div>
                <div className='car-details-box'>
                    <div className='car-details-text'>
                        <div className='text-roboto--large-bold margin-bottom--large'>
                            {car.manufacturerName + ' ' + car.modelName}
                        </div>
                        <div className='text-roboto margin-bottom--large'>
                            {
                                `Stock # ${car.stockNumber} - 
                                ${get(car, 'mileage.number')} ${get(car, 'mileage.unit')} - 
                                ${car.fuelType} - 
                                ${car.color}`
                            }
                        </div>
                        <div className='text-roboto--small'>
                            This car is currently available and can be delivered as soon as tomorrow morning.
                             Please be aware that delivery times shown in this page is definitive and may changedue
                              to bad weather conditions.
                        </div>
                    </div>
                    <div className='car-details-save'>
                        <div className='margin-bottom'>
                            If you like this car, click the button and save it in your collection of favourit items
                        </div>
                        <Button
                            onClick={this.handleButtonClick}
                            pressed={isFavorite}
                            className='right'
                            text='Save'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    car: state.carDetails.car,
    loading: state.carDetails.loading,
    loaded: state.carDetails.loaded,
    favoriteCars: state.favoriteCars,
})

const mapDispatchToProps = (dispatch: any) => ({
    getCarDetails: (stockNumber: number) => dispatch(getCarDetailsAction(stockNumber)),
    toggleFavorites: (stockNumber: number) => dispatch(toggleFavoritesAction(stockNumber)),
})

const connectedCarDetails = connect(mapStateToProps, mapDispatchToProps)(WithLoaderHOC(CarDetails));

export {connectedCarDetails as CarDetails}
