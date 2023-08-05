// import type { VideoElements } from ".";
import { selectors } from ".";

// TODO: get this value from settings
const globalKeyBinds = true;

const togglePlayPause = (player: HTMLVideoElement) => {
  const isVideoPlaying = !!(
    player.currentTime > 0 &&
    !player.paused &&
    !player.ended &&
    player.readyState > 2
  );

  if (isVideoPlaying) {
    player.pause();
  } else {
    player.play();
  }
};

export const keyDownHandler = (e: KeyboardEvent) => {
  console.log("KEYDOWN: ", e.key);
  const player: HTMLVideoElement | null = document.querySelector(
    selectors.player
  );

  if (!player) return;

  // if (e.target !== document.querySelector(selectors.player)) return;

  // -----------------------
  // GENERAL PLAYER KEYBINDS
  // -----------------------
  if (e.key === "ArrowUp" && e.shiftKey) {
    // FEATURE: Up / Down arrow keys to change volume
    e.preventDefault();

    if (player.volume < 1) {
      player.volume = Math.round((player.volume + 0.1) * 10) / 10;
      console.log(player.volume);
      // updateVolumeBar(elements.player.volume);
    }
  } else if (e.key === "ArrowDown" && e.shiftKey) {
    e.preventDefault();

    if (player.volume > 0) {
      player.volume = Math.round((player.volume - 0.1) * 10) / 10;
      console.log(player.volume);
      // updateVolumeBar(elements.player.volume);
      // TODO: update volume icon to show muted if volume is 0
    }
  }

  // ------------
  // VOD KEYBINDS
  // ------------
  const isVod = window.location.pathname.includes("/video/");
  if (isVod) {
    if (e.key === "ArrowRight" || e.key === "l") {
      // FEATURE: skip through VODS with arrow keys & j/l
      player.currentTime += 10;
    } else if (e.key === "ArrowLeft" || e.key === "j") {
      player.currentTime -= 10;
    }
  }

  // set keybinds implemented by kick to global ones
  if (globalKeyBinds) {
    if (e.key === " " || e.key === "k") {
      // FEATURE: spacebar/k to play/pause
      e.preventDefault();
      togglePlayPause(player);
    } else if (e.key === "m") {
      const muteButton = document.querySelector(
        selectors.buttons.mute
      ) as HTMLButtonElement | null;
      // FEATURE: Toggle mute / Unmute with m
      muteButton?.click();
    } else if (e.key === "f") {
      // FEATURE: Toggle fullscreen with f
      const fullscreenButton = document.querySelector(
        selectors.buttons.fullscreen
      ) as HTMLButtonElement | null;
      fullscreenButton?.click();
    }
  }
};

export const playerClickHandler = (e: MouseEvent) => {
  console.log("PLAYER CLICKED");
  console.log(e.currentTarget);

  const player = e.currentTarget as HTMLVideoElement;

  togglePlayPause(player);
};

