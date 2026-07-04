// Стор easter egg «перережь тросы».
// Двойной клик по лого включает режим-нож (active). Режешь трос над карточкой
// Hero → она падает (fallen). Упавшие сохраняются после выхода из режима,
// счётчик «травм» = число упавших.
export type SecretState = { active: boolean; fallen: string[] }
type Listener = (s: SecretState) => void

let state: SecretState = { active: false, fallen: [] }
const listeners = new Set<Listener>()
const emit = () => listeners.forEach(l => l(state))

export function setActive(v: boolean) {
  if (v === state.active) return
  // При выходе из режима фотки возвращаются на место — чистим упавшие.
  state = { active: v, fallen: v ? state.fallen : [] }
  emit()
}

export function toggleActive() {
  setActive(!state.active)
}

export function fall(id: string) {
  if (state.fallen.includes(id)) return
  state = { ...state, fallen: [...state.fallen, id] }
  emit()
}

export function getSecret() {
  return state
}

export function subscribeSecret(l: Listener) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
