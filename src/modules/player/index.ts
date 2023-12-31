import domObserver from '../../observers/dom'
import { keyDownHandler, playerClickHandler } from './controls'
import './player.css'

// TODO: get this value from settings
const globalKeyBinds = true

export const selectors = {
  player: 'video.vjs-tech',
  volumeControl: '.vjs-slider-bar',
  buttons: {
    playPause: '.vjs-play-control',
    mute: '.vjs-mute-control',
    fullscreen: '.vjs-fullscreen-control',
    theater: '.vjs-control .kick-icon-theater',
    bigPlayButton: '.vjs-big-play-button',
  },
}

const player = () => {
  // let playerEl: HTMLVideoElement;
  domObserver.on<HTMLVideoElement>(selectors.player, (player, isConnected) => {
    if (!isConnected) return

    console.log('Player connected', player)

    // NOTE: these event listeners must be named functions
    // otherwise they will be added multiple times resulting in
    // multiple events firing
    // TODO: remove event listeners when player is disconnected? Or just before adding them?
    if (globalKeyBinds) {
      // window.removeEventListener("keydown", keyDownHandler);
      window.addEventListener('keydown', keyDownHandler)
    } else {
      // player.removeEventListener("keydown", keyDownHandler);
      player.addEventListener('keydown', keyDownHandler)
    }

    player.addEventListener('click', playerClickHandler)
  })
}

export default player
