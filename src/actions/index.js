import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
};

// If running in localhost, switch the following lines!
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://online-mafia.herokuapp.com/api';

export function fetchUsers() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USERS, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function authUser(token, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { token })
    .then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
  };
}
