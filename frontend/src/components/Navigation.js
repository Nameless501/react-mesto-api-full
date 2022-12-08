import { useContext, useState } from 'react';
import HeaderButton from './HeaderButton';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Navigation({ signOut }) {
    const [menuIsOpen, setMenuStatus] = useState(false);

    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        if(menuIsOpen) {
            setMenuStatus(false);
        } else {
            setMenuStatus(true);
        }
    }

    return(
        <>
            <ul 
                className={`header__navigation-bar ${menuIsOpen && "header__navigation-bar_opened"}`}
            >
                <li>
                    <p className="header__email" >
                        {currentUser.email}
                    </p>
                </li>
                <li>
                    <HeaderButton 
                        text="Выйти" 
                        link="/sign-in" 
                        signOut={signOut} 
                    />
                </li>
            </ul>
            <button 
                className={`header__menu-button 
                    ${menuIsOpen ? 
                        "header__menu-button_type_close" : "header__menu-button_type_open"}
                    `}
                onClick={handleClick}
            />
        </>
    );
}

export default Navigation;