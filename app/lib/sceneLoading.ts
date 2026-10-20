type SceneLoading = { progress: number; ready: boolean; entered: boolean };
const initial: SceneLoading = { progress: 0, ready: false, entered: false };
let state = initial;
const listeners = new Set<() => void>();
export function subscribeScene(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export function getSceneLoading() {
  return state;
}
export function getServerLoading() {
  return initial;
}
function update(next: Partial<SceneLoading>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}
export function reportSceneProgress(progress: number) {
  update({ progress: Math.max(state.progress, Math.min(99, progress)) });
}
export function finishSceneLoading() {
  update({ progress: 100, ready: true });
}
export function enterPortfolio() {
  update({ entered: true });
}
