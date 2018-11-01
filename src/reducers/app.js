import * as types from '../constants/ActionTypes';

import { Dimensions } from 'react-native';

import NVidia from '../../assets/videos/nvidia.mp4';
import AMD from '../../assets/videos/amd.mp4';
import UE4 from '../../assets/videos/ue4.mp4';
import Frontier from '../../assets/videos/frontier.mp4';

const initialState = {
  //common reducer
  introDisp: true,
  menuDisp: false,
  mainDisp: false,
  settingsDisp: false,
  videoDisp: false,
  audioDisp: false,
  gameplayDisp: false,
  creditsDisp: false,
  exitDisp: false,
  gameDisp: false,
  shipDisp: true,
  Brightness: 1.0,
  Volume: 1.0,
  Effects: 1.0,
  Music: 1.0,
  Video: 1.0,
  mode: false,
  state: 'deactivated',
  //intro reducer
  introVids: [NVidia, AMD, UE4, Frontier],
  introVidsCurrentIndex: 0,
  introVidsCurrentTime: 0,
  introPause: true,
  //menu reducer
  menuInitFlag: false,
  menuMusicCurrentTime: 0.0,
  menuPause: true,
  //game reducer
  hitpoints: 3,
  position: Dimensions.get('window').height * 0.30,
  currentPosition: Dimensions.get('window').height * 0.30,
  shots: [],
  enemyShips: [],
  enemyShipsCurrentPositions: [],
  enemyShipsHitpoints: [],
  enemyShots: [],
  score: 0,
  controllerState: false
}

export default function simpleAndroidGame (state = initialState, action) {

  switch (action.type) {

    case types.VIDEO_PLAY:
      return ({
        ...state,
        [action.video]: action.value
      })

    case types.SET_INTRO_VIDEOS_CURRENT_INDEX:
      return ({
        ...state,
        introVidsCurrentIndex: action.currentIndex
      })

    case types.SET_INTRO_VIDEOS_CURRENT_TIME:
      return ({
        ...state,
        introVidsCurrentTime: action.currentTime
      })

    case types.SET_MENU_INIT_FLAG:
      return ({
        ...state,
        menuInitFlag: action.flag
      })

    case types.SET_MENU_MUSIC_CURRENT_TIME:
      return ({
        ...state,
        menuMusicCurrentTime: action.currentTime
      })

    case types.SET_DISPLAY:
      return ({
        ...state,
        [action.display]: action.value
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

    case types.SET_GAME_INITIAL_STATE:
      return ({
        ...state,
        shipDisp: initialState.shipDisp,
        position: initialState.position,
        hitpoints: action.hitpoints || initialState.hitpoints,
        currentPosition: initialState.currentPosition,
        shots: initialState.shots,
        enemyShips: initialState.enemyShips,
        enemyShipsCurrentPositions: initialState.enemyShipsCurrentPositions,
        enemyShipsHitpoints: initialState.enemyShipsHitpoints,
        enemyShots: initialState.enemyShots,
        score: initialState.score,
        controllerState: initialState.controllerState
      })

    case types.SET_POSITION:
      return ({
        ...state,
        position: action.position
      })

    case types.SET_SHIP_HITPOINTS:
      return ({
        ...state,
        hitpoints: action.hitpoints
      })


    case types.SET_SHIP_CURRENT_POSITION:  
      return ({
        ...state,
        currentPosition: action.position
      })

    case types.SET_ENEMY_SHIP_HITPOINTS:
      return ({
        ...state,
        enemyShipsHitpoints: [
          ...state.enemyShipsHitpoints.filter((e) => {
            if (e.id === action.id) {
              e.hitpoints = action.hitpoints;
            }
            return e;
          })
        ]
      })

    case types.SET_ENEMY_SHIP_CURRENT_POSITION:
      return ({
        ...state,
        enemyShipsCurrentPositions: [
          ...state.enemyShipsCurrentPositions.filter((e) => {
            if (e.id === action.id) {
              e.currentPosition = action.position;
            }
            return e;
          })
        ]
      })

    case types.ADD_SHIP:
      return ({
        ...state,
        hitpoints: action.hitpoints || initialState.hitpoints,
        position: action.position || initialState.position
      })

    case types.ADD_ENEMY_SHIP:
      return ({
        ...state,
        enemyShips: [
          ...state.enemyShips,
          action.ship
        ]
      })

    case types.ADD_ENEMY_SHIP_HITPOINTS:
      return ({
        ...state,
        enemyShipsHitpoints: [
          ...state.enemyShipsHitpoints,
          action.hitpoints
        ]
      })

    case types.ADD_ENEMY_SHIP_CURRENT_POSITION:
      return ({
        ...state,
        enemyShipsCurrentPositions: [
          ...state.enemyShipsCurrentPositions,
          action.position
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

    case types.REMOVE_ENEMY_SHIP_HITPOINTS:
      return ({
        ...state,
        enemyShipsHitpoints: [
          ...state.enemyShipsHitpoints.filter(e => e.id !== action.id)
        ]
      })

    case types.REMOVE_ENEMY_SHIP_CURRENT_POSITION:
      return ({
        ...state,
        enemyShipsCurrentPositions: [
          ...state.enemyShipsCurrentPositions.filter(e => e.id !== action.id)
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