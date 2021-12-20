export const loggerMiddleware = store => next => action => {
  console.groupCollapsed('@STATE')
  console.log(store.getState())
  console.groupEnd()
  console.group('@ACTION')
  console.log(action)
  console.groupEnd()

  next(action)
}
