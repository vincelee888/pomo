import { lpad } from './string'

export const msInSecond = 1000

export const msInMinute = 60 * msInSecond

export const formatTime = (ms) => {
  const minutes = Math.floor(ms / msInMinute)
  const seconds = Math.floor((ms - minutes * msInMinute) / msInSecond)
  return `${lpad(minutes)}:${lpad(seconds)}`
}