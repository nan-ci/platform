export const specialities = {
  python: { id: '821352790474620998', name: 'Python', color: 6585772 },
  flutter: { id: '821352856077991987', name: 'Flutter', color: 4576457 },
  frontend: { id: '821352943328559175', name: 'Front-End', color: 15105570 },
  javascript: { id: '821352893704699938', name: 'JavaScript', color: 15844367 },
}

// Order matter
export const roles = [
  { id: '821037355082579998', name: 'Admin', key: 'admin' },
  { id: '821038983076118538', name: 'Professor', key: 'professor' },
  { id: '821037355162271744', name: 'Monitor', key: 'monitor' },
  { id: '833808124317532221', name: 'Student', key: 'student' },
]

export const rolesById = Object.fromEntries(roles.map((r) => [r.id, r]))
export const rolesByKey = Object.fromEntries(roles.map((r) => [r.key, r]))
