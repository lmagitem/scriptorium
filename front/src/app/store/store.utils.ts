/** Enrich an initial state from a previously filled state (found in localStorage and passed via the "storage" param). Stolen with love from https://github.com/orizens/echoes-player */
export function migrateReducerState(
  prevReducerKey: string,
  newReducerState: any,
  storage: { getItem: Function; removeItem: Function }
): any {
  const prevReducerState = storage.getItem(prevReducerKey);
  const prevStateJson =
    prevReducerState && prevReducerState.length > 0
      ? JSON.parse(prevReducerState)
      : false;

  if (prevStateJson) storage.removeItem(prevReducerKey);

  return prevStateJson
    ? { ...newReducerState, ...prevStateJson }
    : newReducerState;
}
