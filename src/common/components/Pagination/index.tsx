import React from 'react';
import './styles.scss';

interface IPagination {
    page: number;
    maxPage: number;
    onPageSelect: (page: number) => void;
}

export class Pagination extends React.Component<IPagination> {

    nextPage = () => {
        const { page, maxPage, onPageSelect } = this.props;
        return (page === maxPage ? null : onPageSelect(page + 1));
    };

    prevPage = () => {
        const { page, onPageSelect } = this.props;
        return (page === 1 ? null : onPageSelect(page -1));
    };

    lastPage = () => {
        const { page, maxPage, onPageSelect } = this.props;
        return (page === maxPage ? null : onPageSelect(maxPage));
    };

    firstPage = () => {
        const { page, onPageSelect } = this.props;
        return (page === 1 ? null : onPageSelect(1));
    };

    render() {
        const { maxPage, page } = this.props;
        return (
            <div className='pagination-container'>
                <span onClick={this.firstPage} >First</span>
                <span onClick={this.prevPage} >Previous</span>
                <span className='pagination-pages'>{`Page ${page} of ${maxPage}`}</span>
                <span onClick={this.nextPage} >Next</span>
                <span onClick={this.lastPage} >Last</span>
            </div>
    )}
}
