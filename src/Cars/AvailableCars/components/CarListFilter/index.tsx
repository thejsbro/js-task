import * as React from 'react';
import { Select } from 'common/components/Select';
import { Button } from 'common/components/Button';
import { ICarSearchParams } from 'common/types'
import './styles.scss'

interface ICarListFilter {
    colors: string[];
    selectedColor: string;
    manufacturers: string[];
    selectedManufacturer: string;
    onSelect: (params: Partial<ICarSearchParams>) => void;
    onButtonClick: () => void;
}

export class CarListFilter extends React.Component<ICarListFilter> {

    onColorSelect = (color:string) => this.props.onSelect({color});

    onManufacturerSelect = (manufacturer:string) => this.props.onSelect({manufacturer});

    render() {
        const {selectedManufacturer, selectedColor} = this.props;
        return (
            <div className='car-list-filter'>
                <Select
                    className='car-list-filter__select'
                    items={this.props.colors}
                    label='Color'
                    onSelect={this.onColorSelect}
                    selected={selectedColor}
                />
                <Select
                    items={this.props.manufacturers}
                    label='Manufacturer'
                    onSelect={this.onManufacturerSelect}
                    selected={selectedManufacturer}
                />
                <Button
                    onClick={this.props.onButtonClick}
                    text='Filter'
                    className='car-list-filter__button'
                />
            </div>
    )}
}
