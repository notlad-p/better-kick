import EventEmitter from '../event-emitter.js'

const localExtensionStorage =
  typeof browser.storage.local.get === 'function' ? browser.storage.local : chrome.storage.local

// TODO: on install, set default settings
interface ISettings {
  globalKeyBinds: boolean
}

const defaultSettings: ISettings = {
  globalKeyBinds: true,
}

// What is needed from this settings class
// - emit event when settings change (using `onChanged` event & this.emit)
// - get settings
// - set settings
class Settings extends EventEmitter {
  settings: ISettings

  constructor() {
    super()

    const storedSettings = localExtensionStorage.get('settings')
    this.settings = { ...defaultSettings, ...storedSettings }

    localExtensionStorage.onChanged.addListener((changes) => {
      for (const item of Object.keys(changes)) {
        this.emit(`settings.${item}`, changes[item].newValue)
      }
    })
  }

  get(key: string) {
    // returns promise with object
    // localExtensionStorage.get().then((settings) => console.log(settings));
    // const storedSettings = localExtensionStorage.get("settings");
    // return storedSettings[key];
    // return new Promise((resolve, reject) => {
    //   localExtensionStorage.get(defaultSettings, (settings) => {
    //     resolve(settings);
    //   });
    // });
  }

  set(key: string, value: any) {
    // adds one object to storage & returns promise with object
    // localExtensionStorage.set({ globalKeyBinds: true, test: "test" });
    // return new Promise((resolve, reject) => {
    //   localExtensionStorage.set(settings, () => {
    //     resolve(settings);
    //   });
    // });
  }
}

export default new Settings()
