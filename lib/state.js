import { eve } from './eve.js'

// Create a frame observable that will update every frame
const start = Date.now()
const frame = eve(start)
requestAnimationFrame(function loop(tick) {
  frame.trigger(start + tick)
  requestAnimationFrame(loop)
})

export const state = {
  href: frame.map(() => location.href),
}
