import React from 'react';
import './styles.scss';
import 'common/styles.scss';

interface IPagination {
    page: number;
    maxPage: number;
    action: (page: number) => void;
}

export class Pagination extends React.Component<IPagination> {

    nextPage = () => {
        const { page, maxPage, action } = this.props;
        return (page === maxPage ? null : action(page + 1));
    };

    prevPage = () => {
        const { page, action } = this.props;
        return (page === 1 ? null : action(page -1));
    };

    lastPage = () => {
        const { page, maxPage, action } = this.props;
        return (page === maxPage ? null : action(maxPage));
    };

    firstPage = () => {
        const { page, action } = this.props;
        return (page === 1 ? null : action(1));
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