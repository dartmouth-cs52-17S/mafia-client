import axios from 'axios';
import { RUNNING_LOCALLY } from '../containers/app';

// keys for actiontypes
export const ActionTypes = {
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  KILL_PLAYER: 'KILL_PLAYER',
  FETCH_GAME: 'FETCH_GAME',
  FETCH_GAMES: 'FETCH_GAMES',
  CREATE_GAME: 'CREATE_GAME',
  UPDATE_GAME: 'UPDATE_GAME',
  AUTH_USER: 'AUTH_USER',
  ADD_USER: 'ADD_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  FETCH_PLAYERS: 'FETCH_PLAYERS',
  FETCH_PLAYER: 'FETCH_PLAYER',
  GET_PLAYERS: 'GET_PLAYERS',
  CREATE_USER: 'CREATE_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  HEAL_PLAYER: 'HEAL_PLAYER',
  GUESS_MAFIA: 'GUESS_MAFIA',
  UPDATE_STAGE: 'UPDATE_STAGE',
  VOTE_KILL: 'VOTE_KILL',
  VOTES_COUNTED: 'VOTES_COUNTED',
  DECLARE_WINNER: 'DECLARE_WINNER',
};

export const ROOT_URL = RUNNING_LOCALLY ? 'http://localhost:9090/api' : 'https://online-mafia.herokuapp.com/api';

export function createPlayers(gameId, userIds) { // actionCreator
  return (dispatch) => {
    axios.post(`${ROOT_URL}/players/${gameId}`, { gameId, userIds }).then((response) => {
      response.data.forEach((fragment) => {
        if (`${fragment.user}` === localStorage.getItem('userID')) {
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

export function getPlayers(jwt, gameID) { // actionCreator
  return (dispatch) => {
    console.log(`gameID is ${gameID}`);
    axios.put(`${ROOT_URL}/game/${gameID}`, null, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function killPlayer(id) { // actionCreator
  return (dispatch) => {
    axios.put(`${ROOT_URL}/players/kill/${id}`).then((response) => {
      dispatch({ type: ActionTypes.KILL_PLAYER });
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

export function voteKill(id) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/players/vote/${id}`).then((response) => {
      console.log(response.data);
      dispatch({ type: ActionTypes.VOTE_KILL, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function tallyVotes(gameID) {
  console.log(`tallyVotes for players in game ${gameID}`);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/players/${gameID}`).then((response) => {
      console.log(response.data);
      let deadMan;
      let max = 0;
      response.data.forEach((player) => {
        if (player.voteCount > max) {
          max = player.voteCount;
          deadMan = player;
        }
      });
      console.log(deadMan);
      dispatch({ type: ActionTypes.VOTES_COUNTED, payload: deadMan });
    });
  };
}

export function resetVotes(gameID) {
  console.log('resetVotes');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/players/clearvotes/${gameID}`)
    .catch((err) => { console.log(err); });
  };
}

export function guessMafia(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/player/${id}`).then((response) => {
      const payload = (response.data.role === 'mafia');
      localStorage.setItem('correctGuess', payload);
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

export function fetchGames() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/games`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_GAMES, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPlayers(gameID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/players/${gameID}`).then((response) => {
      // trim the payload to remove roles from the response
      const payload = response.data.map((fragment) => {
        return { id: fragment.id, userID: fragment.user, gameID: fragment.game, status: fragment.status, name: fragment.name };
      });
      dispatch({ type: ActionTypes.FETCH_PLAYERS, payload });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function checkEnd(gameID) {
  return (dispatch) => {
    let winner;
    axios.get(`${ROOT_URL}/players/${gameID}`).then((response) => {
      const survivor = response.data.filter((player) => { return (player.status === true); },
    );
      console.log(survivor);
      // update backend
      if (survivor.length <= 2) {
        axios.put(`${ROOT_URL}/game/end/${gameID}`);
        if (survivor.every((player) => { return player.role !== 'mafia'; })) {
          winner = 'villagers';
        } else if (survivor.some((player) => { return player.role !== 'doctor'; })) {
          winner = 'mafia';
        } else {
          winner = 'tie';
        }
      }
      dispatch({ type: ActionTypes.DECLARE_WINNER, payload: winner });
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
      localStorage.setItem('userID', response.data.user.id);
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

export function advanceStage(gameId) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/game/stage/${gameId}`, null).then((result) => {
      console.log(result);
      dispatch({ type: ActionTypes.UPDATE_STAGE, payload: result });
    }).catch((err) => { console.log(err); });
  };
}

export function updateStage(gameId, stage) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/game/stage/${gameId}`, { stage }).then((result) => {
      dispatch({ type: ActionTypes.UPDATE_STAGE, payload: result });
    }).catch((err) => { console.log(err); });
  };
}

export function mafiaChoose(gameId, selection) {
  console.log(selection);
  console.log('mafiaChoose');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/game/selection/${gameId}`, { type: 'mafiaSelection', selection })
    .catch((err) => { console.log(err); });
  };
}

export function doctorChoose(gameId, selection) {
  return (dispatch) => {
    console.log('doctorChoose');
    axios.put(`${ROOT_URL}/game/selection/${gameId}`, { type: 'doctorSelection', selection })
    .catch((err) => { console.log(err); });
  };
}

export function checkSelection(gameId) {
  console.log('checkSelection');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/game/check/${gameId}`)
    .catch((err) => { console.log(err); });
  };
}
