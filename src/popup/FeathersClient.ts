import io from 'socket.io-client'
import feathers from '@feathersjs/client'
import EventEmitter from 'event-emitter-es6'

export class FeathersClient extends EventEmitter {
  public app: any

  private socket: SocketIOClient.Socket
  private _user: any = null

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
    this.app.service('users').on('updated', this.updateUser)
    this.app.service('users').on('patched', this.updateUser)
    this.app.service('notifications').on('created', (notification) => {
      this.emit('notification', notification)
    })
  }

  public async logout (): Promise<void> {
    await this.app.logout()
    this.updateUser(null)
  }

  public async authenticate (options?): Promise<void> {
    try {
      const response = await this.app.authenticate(options)
      const JWTPayload = await this.app.passport.verifyJWT(response.accessToken)

      this.user = await this.app.service('users').get(JWTPayload.userId)

      chrome.runtime.sendMessage({ event: 'authentication' })
    } catch (e) {
      this.user = null
      console.log(e)
    }
  }

  public get user () {
    return this._user
  }

  public set user (user) {
    this._user = user
    this.emit('user', user)
  }

  private updateUser = (user) => {
    this.user = user
  }
}

export default new FeathersClient()
