export const SUCCESS = { status: 200, statusText: 'OK' }
export const INTERNAL = { status: 500, statusText: 'Internal Server Error' }
export const NOT_FOUND = { status: 404, statusText: 'Not Found' }
export const BAD_REQUEST = { status: 400, statusText: 'Bad Request' }
export const UNAUTHORIZED = { status: 401, statusText: 'Unauthorized' }
export const TYPE_JSON = { 'content-type': 'application/json' }

export const rand = () => Math.random().toString(36).slice(2, 12).padEnd(10, '0')