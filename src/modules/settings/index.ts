import Button from './Button.svelte'
import Overlay from './Overlay.svelte'
import domObserver from '../../observers/dom'
import settingsObserver from '../../observers/settings'

const settings = () => {
  console.log('Settings module loaded')
  // TODO: mount svelte SettingsModal component
  // INSIDE COMPONENT: use event listener to listen for settings button click, then render Settings Modal

  // TODO: move this into Overlay component
  // Then instantiate the component in the `modules/index.ts` file
  settingsObserver.on('open', () => {
    console.log('Settings opened')

    // if (settingsModal) {
    //   console.log("SETTINGS MODAL: ", settingsModal);
    //   // settingsModal.$destroy();
    // }

    new Overlay({
      target: document.body,
    })

    document.body.style.overflow = 'auto'
    document.body.style.position = 'static'
  })

  // this adds the settings button to the chat settings
  domObserver.on('.chat-actions-content', (chatActions, isConnected) => {
    if (!isConnected) return

    console.log('Chat actions connected', chatActions)
    // TODO: inject settings UI

    new Button({
      target: chatActions,
    })
  })
}

export default settings
