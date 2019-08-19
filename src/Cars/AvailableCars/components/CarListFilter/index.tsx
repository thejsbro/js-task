import * as React from 'react';
import { Select } from 'common/components/Select';
import { Button } from 'common/components/Button';
import { ICarSearchParams } from 'common/types'
import './styles.scss'
import 'common/styles.scss';

interface ICarListFilter {
    colors: string[];
    manufacturers: string[];
    onSelect: (params: Partial<ICarSearchParams>) => void;
    onButtonClick: () => void;
}

export class CarListFilter extends React.Component<ICarListFilter> {

    onColorSelect = (color:string) => this.props.onSelect({color});

    onManufacturerSelect = (manufacturer:string) => this.props.onSelect({manufacturer});

    render() {
        return (
            <div className='car-list-filter'>
                <Select
                    className='car-list-filter__select'
                    items={this.props.colors}
                    label='Color'
                    onSelect={this.onColorSelect}
                />
                <Select
                    items={this.props.manufacturers}
                    label='Manufacturer'
                    onSelect={this.onManufacturerSelect}
                />
                <Button
                    handleClick={this.props.onButtonClick}
                    text='Filter'
                    className='filter-button'
                />
            </div>
    )}
}