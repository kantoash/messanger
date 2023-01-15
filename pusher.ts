import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
    appId: "1509612",
    key:  "a8290de6204ca225cdf8",
    secret: process.env.PUSHER_PASSWORD!,
    cluster: "ap2",
    useTLS: true,
})

export const clientPusher =  new ClientPusher('a8290de6204ca225cdf8', {
    cluster: 'ap2',
    forceTLS: true,
});