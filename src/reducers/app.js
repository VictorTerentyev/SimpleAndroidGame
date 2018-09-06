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
  shipDisp: 'flex',
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
  currentShipPosition: 0,
  shots: [],
  enemyShips: [],
  enemyShots: [],
  score: 0,
  controllerState: 'deactivated'
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

    case types.SET_CURRENT_SHIP_POSITION:  
      return ({
        ...state,
        currentShipPosition: action.position
      })

    case types.ADD_SHIP:
      return ({
        ...state,
        hitpoints: action.hitpoints || initialState.hitpoints,
        position: action.position || initialState.position
      })

    case types.SET_SHIP_HITPOINTS:
      return ({
        ...state,
        hitpoints: action.hitpoints
      })

    case types.ADD_ENEMY_SHIP:
      return ({
        ...state,
        enemyShips: [
          ...state.enemyShips,
          action.ship
        ]
      })

    case types.ADD_SHOT:
      return ({
        ...state,
        shots: [
          ...state.shots,
          action.shot
        ]
      })

    case types.ADD_ENEMY_SHOT:
      return ({
        ...state,
        enemyShots: [
          ...state.enemyShots,
          action.shot
        ]
      })

    case types.REMOVE_ENEMY_SHIP:
      return ({
        ...state,
        enemyShips: [
          ...state.enemyShips.filter(e => e.id !== action.id)
        ]
      })

    case types.REMOVE_SHOT:
      return ({
        ...state,
        shots: [
          ...state.shots.filter(e => e.id !== action.id)
        ]
      })

    case types.REMOVE_ENEMY_SHOT: 
      return ({
        ...state,
        enemyShots: [
          ...state.enemyShots.filter(e => e.id !== action.id)
        ]
      })

    case types.SET_SCORE:
      return ({
        ...state,
        score: action.score
      })

    case types.SET_CONTROLLER_STATE:
      return ({
        ...state,
        controllerState: action.state
      })

    default:
      return state;
  }
}