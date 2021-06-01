import { Notify } from 'quasar'

export default function notifyAlert (type, message) {
  Notify.create({
    color: (type === 'success' || type === 1) ? 'positive' : 'negative', // 'positive' and 'negative' are keywords for different colors
    message: message,
    position: 'top', // position can also be change to others, like 'bottom'
    timeout: (type === 'success' || type === 1) ? 2000 : 60000, // time(ms) can be set respectively for success(2s) and err(60s)
    actions: [{ icon: 'close', color: 'white' }]
  })
}
