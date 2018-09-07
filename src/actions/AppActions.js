import * as types from '../constants/ActionTypes';

export function setDisplay(display, value) {
  return {
    type: types.SET_DISPLAY,
    display,
    value
  };
}

export function videoPlay(video, value) {
  return {
    type: types.VIDEO_PLAY,
    video,
    value
  };
}

export function setSetting(setting, value) {
  return {
    type: types.SET_SETTING,
    setting,
    value
  };
}

export function setGameState(state) {
  return {
    type: types.SET_GAME_STATE,
    state
  };
}

export function setPosition(position) {
  return {
    type: types.SET_POSITION,
    position
  };
}

export function setCurrentShipPosition(position) {
  return {
    type: types.SET_CURRENT_SHIP_POSITION,
    position
  };
}

export function addShip(ship) {
  return {
    type: types.ADD_SHIP,
    ship
  };
}

export function setShipHitpoints(hitpoints) {
  return {
    type: types.SET_SHIP_HITPOINTS,
    hitpoints
  };
}

export function addEnemyShip(ship) {
  return {
    type: types.ADD_ENEMY_SHIP,
    ship
  };
}

export function setEnemyShipProp(ship, prop, value) {
  return {
    type: types.SET_ENEMY_SHIP_PROP,
    ship,
    prop,
    value
  }
}

export function addShot(shot) {
  return {
    type: types.ADD_SHOT,
    shot
  };
}

export function addEnemyShot(shot) {
  return {
    type: types.ADD_ENEMY_SHOT,
    shot
  };
}

export function removeEnemyShip(id) {
  return {
    type: types.REMOVE_ENEMY_SHIP,
    id
  };
}

export function removeShot(id) {
  return {
    type: types.REMOVE_SHOT,
    id
  };
}

export function removeEnemyShot(id) {
  return {
    type: types.REMOVE_ENEMY_SHOT,
    id
  };
}

export function setScore(score) {
  return {
    type: types.SET_SCORE,
    score
  };
}

export function setControllerState(state) {
  return {
    type: types.SET_CONTROLLER_STATE,
    state
  };
}