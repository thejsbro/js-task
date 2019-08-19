import React from 'react';
import './styles.scss'

export interface IButton {
    pressed?: boolean;
    text: string;
    className?: string;
    handleClick?: () => void;
}

export const Button = ({text, className, pressed, handleClick} : IButton) => {
    return (
    <button
        onClick={handleClick}
        className={`button${pressed ? '--pressed' : ''} ${!!className ? className : ''}`}
    >
        {text}
    </button>
)}