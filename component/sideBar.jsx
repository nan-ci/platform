import {Link,Image} from './elements.jsx';

export const SideBar = ({path}) =>{
  return <div class="sidebar" id="sideMenu">
                <div class="sidebar__first">
                    <ul>
                        <li>
                            <Link href="/profil">
                                <div class="user-photo">
                                  <Image image="user.png" alt="photo de profil" />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <title>home</title>
                                    <path d="M2.386 8.211c-0.236 0.184-0.386 0.469-0.386 0.789v11c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-11c-0.001-0.3-0.134-0.593-0.386-0.789l-9-7c-0.358-0.275-0.861-0.285-1.228 0zM16 21v-9c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v9h-3c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-10.511l8-6.222 8 6.222v10.511c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293zM10 21v-8h4v8z"></path>
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <title>log-out</title>
                                <path d="M9 20h-4c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-14c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.552 0 1-0.448 1-1s-0.448-1-1-1h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h4c0.552 0 1-0.448 1-1s-0.448-1-1-1zM18.586 11h-9.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h9.586l-3.293 3.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5-5c0.092-0.092 0.166-0.202 0.217-0.324 0.15-0.362 0.078-0.795-0.217-1.090l-5-5c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                            </svg>
                        </li>
                    </ul>
                </div>
                <div class="sidebar__second">
                   <ul class="mac-control">
                        <li>
                            <span class="--red"></span>
                        </li>
                        <li>
                            <span class="--yellow"></span>
                        </li>
                        <li>
                            <span class="--green"></span>
                        </li>
                    </ul>

                    <nav class="side-nav">
                        <ul>
                            <li>
                                <div class="n-item" id="sidebar_close_controller">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff">
                                        <title>icon-arrow-left-circle</title>
                                        <path d="M23 12c0-3.037-1.232-5.789-3.222-7.778s-4.741-3.222-7.778-3.222-5.789 1.232-7.778 3.222-3.222 4.741-3.222 7.778 1.232 5.789 3.222 7.778 4.741 3.222 7.778 3.222 5.789-1.232 7.778-3.222 3.222-4.741 3.222-7.778zM21 12c0 2.486-1.006 4.734-2.636 6.364s-3.878 2.636-6.364 2.636-4.734-1.006-6.364-2.636-2.636-3.878-2.636-6.364 1.006-4.734 2.636-6.364 3.878-2.636 6.364-2.636 4.734 1.006 6.364 2.636 2.636 3.878 2.636 6.364zM16 11h-5.586l2.293-2.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-4 4c-0.096 0.096-0.168 0.206-0.217 0.324-0.051 0.122-0.076 0.253-0.076 0.383 0 0.256 0.098 0.512 0.293 0.707l4 4c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-2.293-2.293h5.586c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
                                    </svg>
                                    <span>Fermer</span>
                                </div>
                            </li>
                            <li>
                                <Link href="/">
                                    <div class={`n-item${path === "*" ? " active":""}`}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <title>chevron-right</title>
                                            <path d="M9.707 18.707l6-6c0.391-0.391 0.391-1.024 0-1.414l-6-6c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
                                        </svg>
                                        <span>Tableau de bord</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/evaluations">
                                    <div class={`n-item${path === "/evaluations" ? " active":""}`}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <title>chevron-right</title>
                                            <path d="M9.707 18.707l6-6c0.391-0.391 0.391-1.024 0-1.414l-6-6c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
                                        </svg>
                                        <span>Evaluations quiz</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/results">
                                    <div class={`n-item${path === "/results"?" active":""}`}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <title>chevron-right</title>
                                            <path d="M9.707 18.707l6-6c0.391-0.391 0.391-1.024 0-1.414l-6-6c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
                                        </svg>
                                        <span>Mes Résultats</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profil">
                                    <div class={`n-item${path === "/profil"? " active":""}`}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <title>chevron-right</title>
                                            <path d="M9.707 18.707l6-6c0.391-0.391 0.391-1.024 0-1.414l-6-6c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
                                        </svg>
                                        <span>Mon Profil</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
}
