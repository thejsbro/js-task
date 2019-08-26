import React from 'react';
import './styles.scss'

export interface IButton {
    pressed?: boolean;
    text: string;
    className?: string;
    onClick?: () => void;
}

export const Button = ({text, className, pressed, onClick} : IButton) => {
    return (
    <button
        onClick={onClick}
        className={`button${pressed ? '--pressed' : ''} ${!!className ? className : ''}`}
    >
        {text}
    </button>
)}
