import axios from 'axios';
import { RUNNING_LOCALLY } from '../containers/app';

// keys for actiontypes
export const ActionTypes = {
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  UPDATE_PLAYER: 'UPDATE_PLAYER',
  FETCH_GAME: 'FETCH_GAME',
  CREATE_GAME: 'CREATE_GAME',
  UPDATE_GAME: 'UPDATE_GAME',
  AUTH_USER: 'AUTH_USER',
  ADD_USER: 'ADD_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  FETCH_PLAYERS: 'FETCH_PLAYERS',
  FETCH_PLAYER: 'FETCH_PLAYER',
  UPDATE_PLAYERS: 'UPDATE_PLAYERS',
  CREATE_USER: 'CREATE_USER',
  ADVANCE_STAGE: 'ADVANCE_STAGE',
  AUTH_ERROR: 'AUTH_ERROR',
  HEAL_PLAYER: 'HEAL_PLAYER',
};

export const ROOT_URL = RUNNING_LOCALLY ? 'http://localhost:9090/api' : 'https://online-mafia.herokuapp.com/api';

export function createPlayers(gameId, userIds) { // actionCreator
  return (dispatch) => {
    axios.post(`${ROOT_URL}/players`, { gameId, userIds }).then((response) => {
      response.data.forEach((fragment) => {
        if (fragment.user === localStorage.getItem('userID')) {
          localStorage.setItem('role', fragment.role);
        }
      });
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

export function createGame(jwt, history) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${ROOT_URL}/games`, null, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
        history.push(`/lobby/${response.data.id}`);
        resolve();
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  };
}

export function updatePlayers(jwt, gameID) { // actionCreator
  return (dispatch) => {
    axios.put(`${ROOT_URL}/game/${gameID}`, null, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log(`response is ${JSON.stringify(response.data)}`);
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function healPlayer(id) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/players/heal/${id}`).then((response) => {
      dispatch({ type: ActionTypes.HEAL_PLAYER, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchGame(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/game/${id}`).then((response) => {
      console.log(response.data);
      dispatch({ type: ActionTypes.FETCH_GAME, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPlayers(gameID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/players/${gameID}`).then((response) => {
      console.log(`fetchPlayers response is ${JSON.stringify(response.data)}`);
      dispatch({ type: ActionTypes.FETCH_PLAYERS, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}
// !! for above method
// const payload = response.data.map((fragment) => {
//   if (fragment.user === localStorage.getItem('userID')) {
//     localStorage.setItem('role', fragment.role);
//   }
//   return { userID: fragment.user, game: fragment.game, isAlive: fragment.status };
// });
// dispatch({ type: ActionTypes.CREATE_PLAYERS, payload });

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
      localStorage.setItem('userID', JSON.stringify(response.data.user.id));
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
  };
}


export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
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

export function advanceStage() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADVANCE_STAGE });
  };
}

// export function addUserToGame(fbid) {
//   return (dispatch) => {
//     axios.put(`${ROOT_URL}/games`, { fbid })
//     .then((response) => {
//       dispatch({ type: ActionTypes.ADD_USER, payload: response });
//     });
//   };
// }

// export function getNameFromFBID(fbid) {
//   axios.post(`${ROOT_URL}/getNameFromFBID`, { fbid }).then((response) => {
//     // dispatch({ type: ActionTypes.ADD_USER, payload: response });
//   });
// }
