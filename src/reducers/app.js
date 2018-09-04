import * as types from '../constants/ActionTypes';
import NVidia from '../../assets/videos/nvidia.mp4';
import AMD from '../../assets/videos/amd.mp4';
import UE4 from '../../assets/videos/ue4.mp4';
import Frontier from '../../assets/videos/frontier.mp4';

const initialState = {
  introVids: [NVidia, AMD, UE4, Frontier],
  introPause: false,
  menuPause: true,
  introDisp: 'flex',
  gameDisp: 'none',
  menuDisp: 'none',
  mainDisp: 'none',
  settingsDisp: 'none',
  videoDisp: 'none',
  audioDisp: 'none',
  gameplayDisp: 'none',
  creditsDisp: 'none',
  exitDisp: 'none',
  Brightness: 1.0,
  Volume: 1.0,
  Effects: 1.0,
  Music: 1.0,
  Video: 1.0,
  mod: 'default',
  state: 'deactivated',
  hitpoints: 3,
  position: 0,
  shots: [],
  enemyShips: [],
  enemyShots: [],
  score: 0
}

export default function simpleAndroidGame (state = initialState, action) {

  switch (action.type) {

    case types.SET_DISPLAY:
      return ({
        ...state,
        [action.display]: action.value
      })

    case types.VIDEO_PLAY:
      return ({
        ...state,
        [action.video]: action.value,
      })

    case types.SET_SETTING:
      return ({
        ...state,
        [action.setting]: action.value
      })

    case types.SET_GAME_STATE:
      return ({
        ...state,
        state: action.state || initialState.state
      })

    case types.SET_POSITION:  
      return ({
        ...state,
        position: action.position
      })

    case types.ADD__SHIP:
      return ({
        ...state,
        hitpoints: action.hitpoints || initialState.hitpoints,
        position: action.position || initialState.position
      })

    case types.ADD_ENEMY_SHIP:
      state.enemyShips.push(action.ship);
      return ({
        ...state,
        enemyShips: state.enemyShips
      })

    case types.ADD_SHOT:
      state.shots.push(action.shot);
      return ({
        ...state,
        shots: state.shots
      })

    case types.ADD_ENEMY_SHOT:
      state.enemyShots.push(action.shot);
      return ({
        ...state,
        enemyShots: state.enemyShots
      })

    case types.REMOVE_ENEMY_SHIP:
      delete state.enemyShips[action.id]  
      return ({
        ...state,
        enemyShips: state.enemyShips
      })

    case types.REMOVE_SHOT:
      delete state.shots[action.id];  
      return ({
        ...state,
        shots: state.shots
      })

    case types.REMOVE_ENEMY_SHOT:
      delete state.enemyShots[action.id];  
      return ({
        ...state,
        enemyShots: state.enemyShots
      })

    default:
      return state;
  }
}