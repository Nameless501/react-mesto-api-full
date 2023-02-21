import { useState, useEffect, useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { LoginContext } from '../contexts/LoginContext.js';
import { LoadingContext } from '../contexts/LoadingContext.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/Auth.js';

function App() {
  // popup state

  const [isEditProfilePopupOpen, setEditProfileState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ data: '', isOpen: false });
  const [deletedCard, setDeletedCard] = useState({ data: '', isOpen: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [registerStatus, setRegisterStatus] = useState({ isOpen: false, status: false });

  // cards and user data state

  const [currentUser, setCurrentUser] = useState({ data: {} });
  const [cardsData, setCardsData] = useState([]);

  // login state

  const [isLoggedIn, setLoginStatus] = useState(false);

  // history

  const history = useHistory();

  // Получение данных карточек и пользователя при открытии страницы

  useEffect(() => {    
    if (isLoggedIn && userToken) {
      api.getCardsData(userToken)
        .then(cardsData => setCardsData(cardsData.reverse()))
        .catch(err => console.log(`Не удалость загрузить данные. Ошибка: ${err}`));
    }
  }, [isLoggedIn, userToken]);

  // Изменения состояния попапов

  function onEditProfile() {
    setEditProfileState(true)
  }

  function onAddPlace() {
    setAddPlaceState(true)
  }

  function onEditAvatar() {
    setEditAvatarState(true)
  }

  function closeAllPopups() {
    setEditProfileState(false);
    setAddPlaceState(false);
    setEditAvatarState(false);
    setSelectedCard({ data: '', isOpen: false });
    setDeletedCard({ data: '', isOpen: false });
    setRegisterStatus({ isOpen: false, status: false });
  }

  function handleCardClick(card) {
    setSelectedCard({ data: card, isOpen: true });
  }

  function handleDeleteClick(card) {
    setDeletedCard({ data: card, isOpen: true });
  }

  // Обработчики сабмитов, лайков, удаления карточки

  function handleCardLike(card, isLiked) {
    api.handleLike(card._id, isLiked, userToken)
      .then((newCard) => {
        setCardsData((cardsData) => cardsData.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => console.log(`Не удалость загрузить данные. Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api.deleteCard(card._id, userToken)
      .then(() => {
        setCardsData(cardsData => cardsData.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость удалить карточку. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);

    api.setUserData(data, userToken)
      .then(newUserData => setCurrentUser(prevState => ({
        ...prevState,
        data: newUserData,
      })))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость обновить данные пользователя. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);

    api.setAvatar(data, userToken)
      .then(newUserData => setCurrentUser(prevState => ({
        ...prevState,
        data: newUserData,
      })))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость обновить аватар. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);

    api.postCard(data, userToken)
      .then(newCard => setCardsData([newCard, ...cardsData]))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость отправить карточку. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleRegisterInfo(isSuccess) {
    if (isSuccess) {
      setRegisterStatus({
        isOpen: true,
        status: true
      })
    } else {
      setRegisterStatus({
        isOpen: true,
        status: false
      })
    }
  }

  // регистрация, вход в аккаунт, проверка токена при входе, выход из аккаунта

  const checkToken = useCallback((userToken) => {
    auth.checkToken(userToken)
      .then(userData => {
        if (userData) {
          setCurrentUser(prevState => ({
            ...prevState,
            data: userData,
          }));
          setLoginStatus(true);
          history.push('/');
        }
      })
      .catch(err => {
        setLoginStatus(false);
        history.push('/sign-in');
        console.log('Необходима авторизация');
      });
  }, [history])

  useEffect(() => {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      setUserToken(jwt);
      checkToken(jwt);
    }
  }, [checkToken]);

  function signOut() {
    setUserToken('');
    setCurrentUser({ data: {} });
    setCardsData([]);
    setLoginStatus(false);

    localStorage.clear();

    history.push('/sign-in');
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then(() => handleRegisterInfo(true))
      .catch(err => {
        handleRegisterInfo(false);
        console.log(`Не удалось зарегистрировать пользователя. ${err}`);
      });
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then((userData) => {
        setCurrentUser(prevState => ({
          ...prevState,
          data: userData,
        }));
        setUserToken(userData.token);
        setLoginStatus(true);
        history.push('/');
      })
      .catch(err => {
        handleRegisterInfo(false);
        console.log(`Не удалось войти. ${err}`);
      });
  }

  // JSX

  return (
    <div className="App">
      <LoginContext.Provider value={isLoggedIn} >
        <CurrentUserContext.Provider value={currentUser} >
          <Header signOut={signOut} />
          <Switch>
            <ProtectedRoute
              path="/"
              component={Main}
              onEditProfile={onEditProfile}
              onAddPlace={onAddPlace}
              onEditAvatar={onEditAvatar}
              onCardClick={handleCardClick}
              cardsData={cardsData}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              exact
            />
            <Route path='/sign-in'>
              <Login
                handleLogin={handleLogin}
              />
            </Route>
            <Route path='/sign-up'>
              <Register handleRegister={handleRegister} />
            </Route>
          </Switch>
          <LoadingContext.Provider value={isLoading} >
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <DeleteCardPopup
              isOpen={deletedCard.isOpen}
              onClose={closeAllPopups}
              card={deletedCard.data}
              onDeleteCard={handleCardDelete}
            />
          </LoadingContext.Provider>
          <ImagePopup
            isOpen={selectedCard.isOpen}
            onClose={closeAllPopups}
            card={selectedCard.data}
            isLoading={isLoading}
          />
          <InfoTooltip
            isOpen={registerStatus.isOpen}
            isSuccess={registerStatus.status}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;