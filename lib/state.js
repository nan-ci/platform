import { eve } from './eve.js'

// Create a frame observable that will update every frame
const start = Date.now()
export const frame = eve(start)
requestAnimationFrame(function loop(tick) {
  frame.set(start + tick)
  requestAnimationFrame(loop)
})
