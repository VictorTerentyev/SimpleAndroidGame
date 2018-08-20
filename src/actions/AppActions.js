import * as types from '../constants/ActionTypes';

export function setSettings(settings) {
  return {
    type: types.SET_SETTINGS,
    settings
  };
}

export function setDisplays(displays) {
  return {
    type: types.SET_DISPLAYS,
    displays
  };
}

export function videoPlay(videoPaused) {
  return {
    type: types.VIDEO_PLAY,
    videoPaused
  };
}

export function setBrightness(brightness) {
  return {
    type: types.SET_BRIGHTNESS,
    brightness
  };
}