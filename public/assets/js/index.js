
const hmenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sideMenu');
const closeSidebarController = document.getElementById('sidebar_close_controller');



hmenu.addEventListener('click',() => {
  console.log('test',  sidebar.classList.contains('open'));
    sidebar.classList.contains('open') ? sidebar.classList.remove('open') : sidebar.classList.add('open')
});

closeSidebarController.addEventListener('click',() => {
  console.log('test',  sidebar.classList.contains('open'));
    sidebar.classList.contains('open') ? sidebar.classList.remove('open') : sidebar.classList.add('')
});
