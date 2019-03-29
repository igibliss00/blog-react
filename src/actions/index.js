import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceHolder';

// action creators

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts() );
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(userId => {
        return dispatch(fetchUser(userId));
    });
};

export const fetchPosts = () => {
    return async dispatch => {
        const response = await jsonPlaceHolder.get('/posts');       
        dispatch({ type: 'FETCH_POSTS', payload: response.data });
    };
};

export const fetchUser = id => {
    return async dispatch => {
        const response = await jsonPlaceHolder.get(`/users/${id}`);
        dispatch({type: 'FETCH_USER', payload: response.data});
    };
};
