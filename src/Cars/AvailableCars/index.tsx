import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { find } from 'lodash';
import {
    getCars as getCarsAction,
    setRequestParams,
    dropPagination as dropPaginationAction
} from './actions';
import { Pagination } from 'common/components/Pagination'
import { Select } from 'common/components/Select';
import {WithLoaderHOC} from 'common/hocs/WithLoaderHOC'
import {IAppState} from 'common/reducers'
import { ICar, ICarSearchParams } from 'common/types';
import { CarListItem } from './components/CarListItem';
import { CarListFilter } from './components/CarListFilter';
import { sortTypes } from './consts';
import './styles.scss';

interface IStateToProps {
    cars: ICar[];
    searchParams: ICarSearchParams;
    manufacturers: string[];
    colors: string[];
    totalCarsCount: number;
    totalPageCount: number;
    loading: boolean;
    loaded: boolean;
}

interface IDispatchToProps {
    getCars: (params?: ICarSearchParams) => void;
    setParams: (params?: ICarSearchParams) => void;
    dropPagination: () => void;
}

type IProps = IStateToProps & IDispatchToProps;

class AvailableCars extends React.Component<IProps> {

    componentDidMount() {
        !this.props.loaded && this.props.getCars();
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

    handleFilterButtonClick = () => {
        const {searchParams} = this.props
        this.props.getCars(searchParams);
        this.props.dropPagination();
    }

    render() {
        const sortList = sortTypes.map((el) => el.name)
        const {name: selectedSort = ''} = find(sortTypes, { sort: this.props.searchParams.sort }) || {};
        return (
            <div className='car-list' >
                <div className='car-list-filter-container'>
                    <CarListFilter
                        colors={this.props.colors}
                        manufacturers={this.props.manufacturers}
                        selectedColor={this.props.searchParams.color}
                        selectedManufacturer={this.props.searchParams.manufacturer}
                        onSelect={this.handleFilterSelect}
                        onButtonClick={this.handleFilterButtonClick}
                    />
                </div>
                <div className='car-list-container'>
                    <div>
                        <div className='car-list-container__title'>
                            <div className='text-roboto--bold margin-bottom'>
                                Available cars
                            </div>
                            <div className='text-roboto margin-bottom--large'>
                                {`Showing ${'10'} of ${'100'} results`}
                            </div>
                        </div>
                        <Select
                            className='car-list-container__filter'
                            items={sortList} label='Sort by'
                            onSelect={this.handleSortSelect}
                            selected={selectedSort}
                        />
                    </div>
                    {this.props.cars.map((car, i) => <CarListItem key={i} car={car} />)}
                    {this.props.totalCarsCount > 10 && <Pagination
                        page={this.props.searchParams.page}
                        maxPage={this.props.totalPageCount}
                        onPageSelect={this.handlePagination}
                    />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    cars: state.availableCars.cars,
    searchParams: state.availableCars.searchParams,
    manufacturers: state.availableCars.manufacturers,
    colors: state.availableCars.colors,
    totalCarsCount: state.availableCars.totalCarsCount,
    totalPageCount: state.availableCars.totalPageCount,
    loading: state.availableCars.loading,
    loaded: state.availableCars.loaded,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getCars: (params?: ICarSearchParams) => dispatch((getCarsAction(params) as any)),
    setParams: (params: ICarSearchParams) => dispatch(setRequestParams(params)),
    dropPagination: () => dispatch(dropPaginationAction()),
});

const AvailableCarsConncted = connect(mapStateToProps, mapDispatchToProps)((WithLoaderHOC<IProps>(AvailableCars) as any));
// const AvailableCarsConncted = connect(mapStateToProps, mapDispatchToProps)(AvailableCars);

export { AvailableCarsConncted as AvailableCars };
