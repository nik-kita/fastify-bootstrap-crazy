export type WaitInitType<T> = {
  target: T | null,
  isReady: boolean,
  emitterLabel: string
}
