import './PostsList.scss';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getPostsSelector,
  getUsersSelector,
} from '../../store/selectors';
import { loadPosts } from '../../store';

export const PostsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const currentPostsList = useSelector(getPostsSelector);
  const currentUsersList = useSelector(getUsersSelector);
  const currentUser = currentUsersList.find(user => user.id === +id);
  
  let currentPostsUser;
  if (id) {
    currentPostsUser = currentPostsList.filter(post => post.userId === +id);
  }

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  return (
    <>
      <div className="PostsList">
        <button 
          className="UsersList__button PostsList__button"
          onClick={() => {
            navigate('/');
          }}
        >
          {'⬅ home'}
        </button>
      {currentUser 
        ? <h2 className="PostsList__title">{`Posts of ${currentUser.name}`}</h2>
        : <h2 
          className="PostsList__title"
          onClick={() => {
            navigate('/');
          }}
          >
            {'Something went wrong! Press to me and go home'}
          </h2>}
          <ul className="PostsList__list">
            {currentPostsUser.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <h2 className="PostsList__post-title">{post.title}</h2>
              <p>{post.body}</p>
            </li>
            ))}
          </ul>
      </div>
    </>
  );
}