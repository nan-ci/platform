export const specialities = {
  python: { id: '849954699209605160', name: 'Python', color: 6585772 },
  flutter: { id: '849954550076669972', name: 'Flutter', color: 4576457 },
  frontend: { id: '849955164739338241', name: 'Front-End', color: 15105570 },
  javascript: { id: '849950496637583380', name: 'JavaScript', color: 15844367 },
  php: { id: '849966898103058442', name: 'Php', color: 15844367 },
  reseauxvoip: {
    id: '849966615210491934',
    name: 'Réseaux Voip',
    color: 15844367,
  },
  multimedia: { id: '849955412761116723', name: 'Multimédia', color: 15844367 },
  marketingdigital: {
    id: '849966532511399936',
    name: 'Marketing Digital',
    color: 15844367,
  },
}

// Order matter
export const roles = [
  { id: '849619495814299669', name: 'Admin', key: 'admin' },
  { id: '849684606952538143', name: 'Professor', key: 'professor' },
  { id: '849687232201490442', name: 'Visitor', key: 'visitor' },
  { id: '849685964334039080', name: 'Student', key: 'student' },
]

export const rolesById = Object.fromEntries(roles.map((r) => [r.id, r]))
export const rolesByKey = Object.fromEntries(roles.map((r) => [r.key, r]))


