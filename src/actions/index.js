import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  UPDATE_PLAYER: 'UPDATE_PLAYER',
  FETCH_GAME: 'FETCH_GAME',
  CREATE_GAME: 'CREATE_GAME',
  AUTH_USER: 'AUTH_USER',
  ADD_USER: 'ADD_USER',
  FETCH_PLAYERS: 'FETCH_PLAYERS',
  FETCH_PLAYER: 'FETCH_PLAYER',
  UPDATE_PLAYERS: 'UPDATE_PLAYERS',
  CREATE_USER: 'CREATE_USER',
};

// If running in localhost, switch the following lines!
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://online-mafia.herokuapp.com/api';

export function updatePlayers(gameId, userIds) { // actionCreator
  return (dispatch) => {
    axios.post(`${ROOT_URL}/games`, { gameId, userIds }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_PLAYERS, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createPlayers(gameId, userIds) { // actionCreator
  return (dispatch) => {
    axios.post(`${ROOT_URL}/createplayers`, { gameId, userIds }).then((response) => {
      dispatch({ type: ActionTypes.CREATE_PLAYERS, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}


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

export function createGame(fbid) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/games`, { fbid }).then((response) => {
      console.log(response);
      dispatch({ type: ActionTypes.CREATE_GAME, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchGame(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/game`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_GAME, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPlayers() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/players`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_PLAYERS, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPlayer(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/players/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_PLAYER, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function authUser(authData, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { authData })
    .then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      dispatch({ type: ActionTypes.CREATE_USER, payload: response.data.user });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

export function addUserToGame(fbid) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/games`, { fbid })
    .then((response) => {
      dispatch({ type: ActionTypes.ADD_USER, payload: response });
    });
  };
}

// export function getNameFromFBID(fbid) {
//   axios.post(`${ROOT_URL}/getNameFromFBID`, { fbid }).then((response) => {
//     // dispatch({ type: ActionTypes.ADD_USER, payload: response });
//   });
// }
