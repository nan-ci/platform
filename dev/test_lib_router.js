import { eq } from './utils.js'
import { match, rank } from '../lib/router.js'

export const o = {}

// EXACT
o['exact route match'] = {
  it: () => match('/hello/there', '/hello/there'),
  is: {},
}

o['exact route match, ignore trailing in route'] = {
  it: () => match('/hello/there/', '/hello/there'),
  is: {},
}

o['exact route match, ignore trailing in path'] = {
  it: () => match('/hello/there', '/hello/there/'),
  is: {},
}

o['simple route missmatch (begining)'] = {
  it: () => match('/hello/there', '/by/there'),
}

o['simple route missmatch (end)'] = {
  it: () => match('/hello/there', '/hello/you'),
}

// PARAMS
o['single param'] = {
  it: () => match('/hello/:you', '/hello/there'),
  is: { you: 'there' },
}

o['single param (sandwitch)'] = {
  it: () => match('/hello/:you/else', '/hello/there/else'),
  is: { you: 'there' },
}

o['single param (long param name)'] = {
  it: () => match('/user/:userId/else', '/user/5/else'),
  is: { userId: '5' },
}

o['multiple 2 params'] = {
  it: () => match('/user/:user/event/:event/', '/user/marie/event/chrismas'),
  is: { user: 'marie', event: 'chrismas' },
}

o['multiple 3 params'] = {
  it: () =>
    match(
      '/user/:user/event/:eventId/group/:groupId',
      '/user/patrick/event/157/group/987',
    ),
  is: { user: 'patrick', eventId: '157', groupId: '987' },
}

o['multiple 2 params (missmatch first)'] = {
  it: () => match('/user/:user/event/:event/', '/aser/marie/event/chrismas'),
}

o['multiple 2 params (missmatch last)'] = {
  it: () => match('/user/:user/event/:event/', '/user/marie/evant/chrismas'),
}

// WILDCARD
o['* should match anything'] = {
  it: () => match('*', '/user/marie/evant/chrismas'),
  is: { '*': '/user/marie/evant/chrismas' },
}

o['partial * should match anything after the match'] = {
  it: () => match('/user/marie/*', '/user/marie/evant/chrismas'),
  is: { '*': 'evant/chrismas' },
}

o['partial * should match anything after the match also handle params'] = {
  it: () => match('/user/:user/*', '/user/marie/evant/chrismas'),
  is: { user: 'marie', '*': 'evant/chrismas' },
}

// RANKING
o['get the total number when we compute each word after the slash tag'] = {
  it: () => rank('/admin/user/:userId'),
  is: 8
}

o['get the correct number when we match to *'] = {
  it: () => rank('*'),
  is: 1,
}

o['get the correct number when we create a new user '] = {
  it: () => rank('/admin/user/new'),
  is: 9,
}

o['* should match anything and handle all params to get the correct number'] = {
  it: () => rank('/admin/user/:userId/*'),
  is: 9
}

o['trailing slash with user param to get the correct number'] = {
  it: () => rank('/admin/user/:userId/'),
  is: 8,
}

o['handle all params to get correct number'] = {
  it: () => rank('/admin/user/:user/:userId/'),
  is: 10,
}
