export const user = (({ searchParams, pathname }) => {
  console.log('searchparams', Object.fromEntries(searchParams), pathname)
  // load user from local cache
  if (!searchParams.has('login')) {
    const { user } = localStorage
    return user && JSON.parse(user)
  }

  // load user from URL
  if (pathname === '/learningchoice' || pathname === '/') {
    const user = Object.fromEntries(searchParams)
    localStorage.user = JSON.stringify(user)
    history.replaceState({}, null, pathname)
    return user
  }
})(new URL(window.location))
