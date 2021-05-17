export const user = (({ searchParams, pathname }) => {
  // load user from local cache
  if (!searchParams.has('login')) {
    const { user } = localStorage
    return user && JSON.parse(user)
  }

  if (pathname === '/auth' || pathname === '/') {
    const user = Object.fromEntries(searchParams)
    localStorage.user = JSON.stringify(user)
    history.replaceState({}, null, pathname)
    return user
  }
})(new URL(window.location))
