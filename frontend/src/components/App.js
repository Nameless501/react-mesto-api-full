import { useState, useEffect } from 'react';
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
  const [selectedCard, setSelectedCard] = useState({data: '', isOpen: false});
  const [deletedCard, setDeletedCard] = useState({data: '', isOpen: false});
  const [isLoading, setIsLoading] = useState(false);
  const [registerStatus, setRegisterStatus] = useState({isOpen: false, status: false});
  
  // cards and user data state

  const [currentUser, setCurrentUser] = useState({data: {}, email: ''});
  const [cardsData, setCardsData] = useState([]);

  // login state

  const [isLoggedIn, setLoginStatus] = useState(false);

  // history

  const history = useHistory();

  // Получение данных карточек и пользователя при открытии страницы

  useEffect(() => {
    Promise.all([api.getCardsData(), api.getUserData()])
        .then(allData => {
          const [cardsData, userData] = allData;
          return [cardsData, userData]
        })
        .then(([cardsData, userData]) => {
          setCurrentUser(prevState => ({
            ...prevState,
            data: userData,
          }));
          setCardsData(cardsData);
        })
        .catch(err => console.log(`Не удалость загрузить данные. Ошибка: ${err}`));
  }, []);

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
    setSelectedCard({data: '', isOpen: false});
    setDeletedCard({data: '', isOpen: false});
    setRegisterStatus({isOpen: false, status: false});
  }

  function handleCardClick(card) {
    setSelectedCard({data: card, isOpen: true});
  }

  function handleDeleteClick(card) {
    setDeletedCard({data: card, isOpen: true});
  }

  // Обработчики сабмитов, лайков, удаления карточки

  function handleCardLike(card, isLiked) {
    api.handleLike(card._id, isLiked)
      .then((newCard) => {
        setCardsData((cardsData) => cardsData.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => console.log(`Не удалость загрузить данные. Ошибка: ${err}`));
  }

  function handleCardDelete(card) { 
    setIsLoading(true);
    
    api.deleteCard(card._id)
      .then(() => {
        setCardsData(cardsData => cardsData.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость удалить карточку. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);

    api.setUserData(data)
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

    api.setAvatar(data)
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

    api.postCard(data)
      .then(newCard => setCardsData([newCard, ...cardsData]))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость отправить карточку. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleRegisterInfo(isSuccess) {
    if(isSuccess) {
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

  function checkToken() {
    const token = localStorage.getItem('token');

    if(token) {
      auth.checkToken(token)
        .then(res => {
          if(res) {
            setCurrentUser(prevState => ({
              ...prevState,
              email: res.email,
            }))
            setLoginStatus(true);
            history.push('/');
          }
        })
        .catch(err => console.log(`Не удалось проверить токен. ${err}`));
    }
  }

  useEffect(() => {
    checkToken()
  }, [isLoggedIn]);

  function signOut(){
    localStorage.removeItem('token');
    setLoginStatus(false);
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
      .then(() => {
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