import io from 'socket.io-client'
import feathers from '@feathersjs/client'
import EventEmitter from 'event-emitter-es6'

export class FeathersClient extends EventEmitter {
  public app: any

  private socket: SocketIOClient.Socket

  constructor () {
    super()

    this.socket = io(process.env.BACKEND_URL as string)
    this.app = feathers()

    this.app.configure(feathers.socketio(this.socket))
    this.app.configure(feathers.authentication({
      storage: window.localStorage
    }))

    this.bindEvents()
  }

  bindEvents (): void {
    this.app.service('notifications').on('created', (notification) => {
      this.emit('notification', notification)
    })
  }

  public async logout (): Promise<void> {
    await this.app.logout()
  }

  public async authenticate (options?): Promise<void> {
    try {
      await this.app.authenticate(options)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FeathersClient()
