import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { Link } from 'react-router-dom';

function HeaderButton({ text, link, signOut }) {
    const isLoggedIn = useContext(LoginContext);

    return(
        <Link to={link} >
            <button 
                type="button" 
                className={`
                    header__button 
                    ${isLoggedIn ? 
                        "header__button_type_logout" : "header__button_type_sign"
                    }
                `}
                onClick={isLoggedIn ? signOut : undefined}
            >
                {text}
            </button>
        </Link>
    )
}

export default HeaderButton;