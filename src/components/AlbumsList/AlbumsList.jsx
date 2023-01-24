import './AlbumsList.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAlbumsSelector,
  getUsersSelector,
  getCurrentUserIdSelector,
 } from '../../store/selectors';
import { loadAlbums, setIsOpenModal } from '../../store';

export const AlbumsList = () => {
  const dispatch = useDispatch();
  const currentAlbumsList = useSelector(getAlbumsSelector);
  const currentUsersList = useSelector(getUsersSelector);
  const currentUserId = useSelector(getCurrentUserIdSelector);

  const currentUser = currentUsersList.find(user => user.id === +currentUserId);

  let currentAlbumsUser;
  if (currentUserId) {
    currentAlbumsUser = currentAlbumsList.filter(album => album.userId === +currentUserId);
  }
  const handlerCloseModal = () => {
    dispatch(setIsOpenModal(false));
  }
  
  useEffect(() => {
    dispatch(loadAlbums());
  }, [ dispatch]);

  return (
    <>
      <div className="AlbumsList">
        <div
          title='Press to me and close!'
          className="AlbumsList__container"
          onClick={() => {
            handlerCloseModal();
          }}
        >
          <h2 className="AlbumsList__title">{`Albums of ${currentUser.name}`}</h2>
          <ul
            className="AlbumsList__list"
          >
            {currentAlbumsUser.map(album => (
            <li
              className="AlbumsList__item"
              key={album.id}
            >
              <h2 className="AlbumsList__post-title">{album.title}</h2>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}