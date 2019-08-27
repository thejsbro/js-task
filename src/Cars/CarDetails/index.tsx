import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { get } from 'lodash';
import { Button } from 'common/components/Button';
import {IAppState} from 'common/reducers'
import { ICar } from 'common/types';
import { WithLoaderHOC } from 'common/hocs/WithLoaderHOC';
import {
    getCarDetails as getCarDetailsAction,
} from './actions';
import './styles.scss';

interface ICarDetails {
    stockNumber: string;
}

interface IStateProps {
    car: ICar;
    loading: boolean;
    loaded: boolean;
}

interface IDispatchProps {
    getCarDetails: (stockNumber: string) => void;
}

type IProps = ICarDetails & IStateProps & IDispatchProps;

class CarDetails extends React.Component<IProps> {

    componentDidMount() {
        const { stockNumber, loaded, getCarDetails, car } = this.props;
        if (!loaded || car.stockNumber !== +stockNumber) {
            getCarDetails(stockNumber);
        }
    }

    render() {
        const {car} = this.props;
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
                        <Button className='right' text='Save'/>
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
})

const mapDispatchToProps = (dispatch: any) => ({
    getCarDetails: (stockNumber: string) => dispatch(getCarDetailsAction(stockNumber)),
})

const connectedCarDetails = connect(mapStateToProps, mapDispatchToProps)(WithLoaderHOC(CarDetails));

export {connectedCarDetails as CarDetails}
