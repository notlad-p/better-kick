import domObserver from '../../observers/dom'

const general = () => {
  // FEATURE: grey out offline channels
  domObserver.on('.sidebar-item', (item, isConnected) => {
    if (!isConnected) return

    const name = item.querySelector('.item-name')
    // console.log("NAME: ", name)
    if (name?.classList.contains('!text-gray-500')) {
      // console.log("OFFLINE");
      const profilePic = item.querySelector('.profile-picture img') as HTMLImageElement

      profilePic?.style.setProperty('filter', 'grayscale(100%)')
      profilePic?.style.setProperty('opacity', '0.75')
      // console.log(profilePic);
    }
  })

  // FEATURE: remember sidebar state (instead of it always being open)
  domObserver.on('.sidebar', (sidebar, isConnected) => {
    if (!isConnected) return

    let sidebarIsOpen = sidebar.classList.contains('w-64')

    sidebar.addEventListener('click', () => {
      console.log('sidebar clicked')
      sidebarIsOpen = !sidebarIsOpen
      // TODO: MIGRATE THIS TO STORAGE API
      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage
      localStorage.setItem('betterKickSidebarOpen', sidebarIsOpen ? '1' : '0')
    })

    const savedSidebarState = localStorage.getItem('betterKickSidebarOpen')
    if (savedSidebarState === '0' && sidebarIsOpen) {
      sidebar.click()
    }
  })
}

export default general
