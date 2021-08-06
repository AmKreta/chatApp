import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

//importing reusable components
import Menu from '../../../../../reusableComponents/menu/menu.component';
import Icon from '../../../../../reusableComponents/icon/icon.component';

//icons
import { AiFillSetting } from 'react-icons/ai';
import { RiLogoutCircleFill } from 'react-icons/ri';

const MenuItems = ({ displayMenu }) => {

    const history = useHistory();

    const goToSetting = useCallback(() => {
        history.push('/setting');
    }, [history]);

    const goToLogout = useCallback(() => {
        history.push('/logout');
    }, [history]);

    const goToCreateGroup = useCallback(() => {
        history.push('/newGroup');
    }, [history]);

    return (
        <Menu displayMenu={displayMenu}>
            {
                (variant) => (
                    <>
                        <motion.div variants={variant} onClick={goToSetting}>
                            <Icon icon={AiFillSetting} size='23px' />
                            <p>Setting</p>
                        </motion.div>
                        <motion.div variants={variant} onClick={goToLogout}>
                            <Icon icon={RiLogoutCircleFill} size='23px' />
                            <p>Logout</p>
                        </motion.div>
                    </>
                )
            }
        </Menu>
    );
}

export default MenuItems;