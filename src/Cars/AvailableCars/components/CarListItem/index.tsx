import React from 'react';
import { ICar } from 'common/types'
import './styles.scss'
import 'common/styles.scss';

interface IProps {
    car: ICar;
    key: number;
}

export const CarListItem = ({ car }: IProps) => (
    <div className='car-list-item'>
            <img className='car-list-item__image' src={`./public${car.pictureUrl}`}/>
            <div className='car-list-item__info'>
                <div className='text-roboto--bold'>
                    {car.manufacturerName + ' ' + car.modelName}
                </div>
                <div className='text-roboto--x-small'>
                    {
                        `Stock # ${car.stockNumber} - 
                        ${car.mileage.number} ${car.mileage.unit} - 
                        ${car.fuelType} - 
                        ${car.color}`}
                </div>
                <div className='text-link'>View details</div>
            </div>
    </div>
)