export type InitType<T, U = null> = {
  target: T | U,
  isReady: boolean,
  emitterLabel: string
}
