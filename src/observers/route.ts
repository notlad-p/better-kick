import EventEmitter from '../event-emitter'

// used to communicate page information when the page changes
class RouteObserver extends EventEmitter {
  constructor() {
    super()
    // this.on('navigation', this.onNavigation)
  }

  // onNavigation(url: string) {
  //   console.log('PAGE CONTEXT NAVIGATION', url)
  // }
  //
}

export default new RouteObserver()
