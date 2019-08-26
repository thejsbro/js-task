import React from 'react';
import { connect } from 'react-redux';
import { getCarDetails as getCarDetailsAction } from './actions';
import './styles.scss';

interface ICarDetails {
    stockNumber: string;
    getCarDetails: (stockNumber: string) => void;
}

class CarDetails extends React.Component<ICarDetails> {

    componentDidMount() {
        const { stockNumber } = this.props;
        this.props.getCarDetails(stockNumber);
    }

    render() {
        return (
            <div>
                <div className='car-details__image'></div>
                TEXT
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = (dispatch: any) => ({
    getCarDetails: (stockNumber: string) => dispatch(getCarDetailsAction(stockNumber))
})

const connectedCarDetails = connect(mapStateToProps, mapDispatchToProps)(CarDetails);

export {connectedCarDetails as CarDetails}
