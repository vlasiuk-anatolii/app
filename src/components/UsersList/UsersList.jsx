import React, { useEffect} from 'react';
import './UsersList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getIsOpenModalSelector,
  getUsersSelector,
  getStateLoadSelector,
} from '../../store/selectors';
import { loadUsers, setCurrentUserId, setIsOpenModal } from '../../store';
import { AlbumsList } from '../AlbumsList';
import { Loader } from '../Loader';

export const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerAlbums = (id) => {
    dispatch(setIsOpenModal(true));
    dispatch(setCurrentUserId(id));
  }

  const currentUsersList = useSelector(getUsersSelector);
  const isOpenModal = useSelector(getIsOpenModalSelector);
  const isLoading = useSelector(getStateLoadSelector);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <>
      <div className="UsersList">
        <h2 className="UsersList__title">Users:</h2>
        {isLoading && <Loader />}
          <ul
            className="UsersList__list"
          >
            {currentUsersList.map(user => (
              <li
                className="UsersList__item"
                key={user.id}
              >
                <b>{user.name}</b>
                <div className="UsersList__box-buttons">
                  <button 
                    className="UsersList__button"
                    onClick={() => {
                      navigate(`/posts/${user.id}`);
                    }}
                  >
                    Пости
                  </button>
                  <button 
                    className="UsersList__button"
                    onClick={() => {
                      handlerAlbums(user.id);
                    }}
                  >
                    Альбоми
                  </button>
                </div>
              </li>
            ))}
          </ul>
      </div>
      {isOpenModal && <AlbumsList />}
    </>
  );
};
