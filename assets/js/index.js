
const hmenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sideMenu');
const closeSidebarController = document.getElementById('sidebar_close_controller');

console.log('hmenu',hmenu);

hmenu.addEventListener('click',() => {
    sidebar.classList.contains('open') ? sidebar.classList.remove('open') : sidebar.classList.add('open')
});

closeSidebarController.addEventListener('click',() => {
    sidebar.classList.contains('open') ? sidebar.classList.remove('open') : sidebar.classList.add('')
});
