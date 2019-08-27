import React, { useState } from 'react';
import './styles.scss'

export interface ISelect {
    emptyName?: string;
    showEmptyInList?: boolean;
    label?: string;
    items: string[];
    selected?: string;
    onSelect?: (item: string) => void;
    className?: string;
}

export const Select = ({
    label,
    items,
    onSelect,
    emptyName = 'None',
    showEmptyInList = true,
    className,
    selected,
}: ISelect) => {
    const [state, setState] = useState({opened: false, selected: selected || ''});
    const toggleSelect = () => setState({...state, opened: !state.opened})
    const handleSelect = (item: string) => () => {
        setState({opened: false, selected: item});
        !!onSelect && onSelect(item);
    }
    return (
        <div className={!!className ? className : ''}>
            {!!label && <div className='select-label'>{label}</div>}
            <div className='select-box' onClick={toggleSelect}>
                {!!state.selected ? state.selected : emptyName}
                <img
                    className={`select-box__arrow${state.opened ? '--opened' : ''}`}
                    src='./images/drop-down-arrow .svg'
                />
            </div>
            {state.opened && <div className='select-box-list'>
                {
                    showEmptyInList &&
                    <div
                        onClick={handleSelect('')}
                        key={-1}
                        className='select-box-list__item'
                    >
                        {emptyName}
                    </div>}
                {
                    items.map(
                        (item, i) => (
                            <div
                                onClick={handleSelect(item)}
                                key={i}
                                className='select-box-list__item'
                            >
                                {item}
                            </div>
                            ))
                }
            </div>}
        </div>
    );
}
