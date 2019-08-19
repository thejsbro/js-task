import * as React from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { getCars as getCarsAction, setRequestParams } from './actions';
import { Pagination } from 'common/components/Pagination'
import { Select } from 'common/components/Select';
import { ICar, ICarSearchParams } from 'common/types';
import { CarListItem } from './components/CarListItem';
import { CarListFilter } from './components/CarListFilter';
import { sortTypes } from './consts';
import 'common/styles.scss';
import './styles.scss';

interface IStateToProps {
    cars: ICar[];
    searchParams: ICarSearchParams;
    manufacturers: string[];
    colors: string[];
    totalCarsCount: number;
    totalPageCount: number;
}

interface IDispatchToProps {
    getCars: (params?: ICarSearchParams) => void;
    setParams: (params?: ICarSearchParams) => void;
}

type IProps = IStateToProps & IDispatchToProps;

class AvailableCars extends React.Component<IProps> {

    componentDidMount() {
        this.props.getCars();
    }

    handleSortSelect = (name: string) => {
        const { sort = '' } = find(sortTypes, { name }) || {};
        const newSearchParams = { ...this.props.searchParams, sort}
        this.props.setParams(newSearchParams);
        this.props.getCars(newSearchParams);
    }

    handlePagination = (page: number) => {
        const newSearchParams = { ...this.props.searchParams, page}
        this.props.setParams(newSearchParams);
        this.props.getCars(newSearchParams);
    }

    handleSearch = () => this.props.getCars(this.props.searchParams);

    handleFilterSelect = (item: Partial<ICarSearchParams>) =>
        this.props.setParams({...this.props.searchParams, ...item});

    render() {
        const sortList = sortTypes.map((el) => el.name)
        return (
            <div className='car-list' >
                <div className='car-list__filter-container'>
                    <CarListFilter
                        colors={this.props.colors}
                        manufacturers={this.props.manufacturers}
                        onSelect={this.handleFilterSelect}
                        onButtonClick={this.handleSearch}
                    />
                </div>
                <div className='car-list__container'>
                    <div>
                        <div className='car-list__container__title'>
                            <div className='text-roboto--bold margin-bottom'>
                                Available cars
                            </div>
                            <div className='text-roboto margin-bottom--large'>
                                {`Showing ${'10'} of ${'100'} results`}
                            </div>
                        </div>
                        <Select
                            className='car-list__container__filter'
                            items={sortList} label='Sort by'
                            onSelect={this.handleSortSelect}
                        />
                    </div>
                    {this.props.cars.map((car, i) => <CarListItem key={i} car={car} />)}
                    {this.props.totalCarsCount > 10 && <Pagination
                        page={this.props.searchParams.page}
                        maxPage={this.props.totalPageCount}
                        action={this.handlePagination}
                    />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    cars: state.availableCars.cars,
    searchParams: state.availableCars.searchParams,
    manufacturers: state.availableCars.manufacturers,
    colors: state.availableCars.colors,
    totalCarsCount: state.availableCars.totalCarsCount,
    totalPageCount: state.availableCars.totalPageCount,
});

const mapDispatchToProps = (dispatch: any) => ({
    getCars: (params?: ICarSearchParams) => dispatch(getCarsAction(params)),
    setParams: (params: ICarSearchParams) => dispatch(setRequestParams(params)),
});

const AvailableCarsConncted = connect(mapStateToProps, mapDispatchToProps)(AvailableCars);

export { AvailableCarsConncted as AvailableCars };
