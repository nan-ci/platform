export const user = (({ searchParams, pathname }) => {
  console.log(
    'data',
    searchParams,
    pathname,
    pathname === '/professor/dashboard',
  )
  // load user from local cache
  if (!searchParams.has('login')) {
    const { user } = localStorage
    return user && JSON.parse(user)
  }

  // load user from URL
  if (
    pathname === '/learningchoice' ||
    pathname === '/student/dashboard' ||
    pathname === '/professor/dashboard' ||
    pathname === '/admin/dashboard'
  ) {
    const user = Object.fromEntries(searchParams)
    localStorage.user = JSON.stringify(user)
    history.replaceState({}, null, pathname)
    return user
  }
})(new URL(window.location))
