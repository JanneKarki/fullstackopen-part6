import { create } from 'zustand'

let notificationTimer

const useNotificationStore = create(set => ({
  notification: null,
  actions: {
    notify: message => {
      clearTimeout(notificationTimer)
      set(() => ({ notification: message }))
      notificationTimer = setTimeout(() => {
        set(() => ({ notification: null }))
      }, 5000)
    }
  }
}))

export const useNotification = () =>
  useNotificationStore(state => state.notification)

export const useNotificationActions = () =>
  useNotificationStore(state => state.actions)
