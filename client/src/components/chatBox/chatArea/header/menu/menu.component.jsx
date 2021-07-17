import React from 'react';

//importing reusable components
import Menu from '../../../../../reusableComponents/menu/menu.component';

const MenuItems = ({ displayMenu }) => {
    return <Menu displayMenu={displayMenu} showAtRight />
}

export default MenuItems;