import React from 'react';
import { IconContext } from 'react-icons';
import './icon.styles.css';

const Icon = ({ icon, size = '25px', ...props }) => {
    return (
        <IconContext.Provider value={{ className: 'icon', size }}>
            {icon({ ...props })}
        </IconContext.Provider >
    );
}

export default Icon;