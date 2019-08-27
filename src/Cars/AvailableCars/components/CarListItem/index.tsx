import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICar } from 'common/types'
import './styles.scss'

interface IProps {
    car: ICar;
    key: number;
}

export const CarListItem = ({ car }: IProps) => {
    return (
    <div className='car-list-item'>
            <img className='car-list-item__image' src={`${car.pictureUrl}`}/>
            <div className='car-list-item__info'>
                <div className='text-roboto--bold'>
                    {car.manufacturerName + ' ' + car.modelName}
                </div>
                <div className='text-roboto--x-small'>
                    {
                        `Stock # ${car.stockNumber} - 
                        ${car.mileage.number} ${car.mileage.unit} - 
                        ${car.fuelType} - 
                        ${car.color}`
                    }
                </div>
                <div>
                    <NavLink
                        className='text-roboto--x-small text-link'
                        to={`/details/${car.stockNumber}`}
                        exact
                    >
                        View details
                    </NavLink>
                </div>
            </div>
    </div>
)}
