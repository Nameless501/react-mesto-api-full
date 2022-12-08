import { useContext } from 'react';
import headerLogo from '../images/logo.svg'
import Navigation from './Navigation';
import { LoginContext } from '../contexts/LoginContext';
import { useLocation } from "react-router-dom";
import HeaderButton from './HeaderButton';

function Header({ signOut }) {
    const isLoggedIn = useContext(LoginContext);
    const currentLocation = useLocation();

    return(
        <div className={`
            header 
            page__header
            ${isLoggedIn ?
                "header_type_login" :
                "header_type_sign"}
            `} 
        >
            <img 
                src={headerLogo} 
                alt="Логотип" 
                className="header__logo"
            >
            </img>
            {isLoggedIn && 
                <Navigation signOut={signOut} />
            }
            {currentLocation.pathname === "/sign-in" &&
                <HeaderButton text="Регистрация" link="/sign-up" />
            }
            {currentLocation.pathname === "/sign-up" &&
                <HeaderButton text="Войти" link="/sign-in" />
            }
        </div>
    );
}

export default Header;