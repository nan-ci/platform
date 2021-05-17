const hmenu = document.getElementById('hamburgerMenu')
const sidebar = document.getElementById('sideMenu')
const closeSidebarController = document.getElementById(
  'sidebar_close_controller',
)

hmenu.addEventListener('click', () => {
  sidebar.classList.toggle('open')
})

closeSidebarController.addEventListener('click', () => {
  sidebar.classList.toggle('open')
})
