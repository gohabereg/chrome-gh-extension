import io from 'socket.io-client'
import feathers from '@feathersjs/client'
import EventEmitter from 'event-emitter-es6'

export class FeathersClient extends EventEmitter {
  public user: any = null

  private socket: SocketIOClient.Socket
  private app: any

  constructor () {
    super()

    this.socket = io('http://localhost:3030')
    this.app = feathers()

    this.app.configure(feathers.socketio(this.socket))
    this.app.configure(feathers.authentication({
      storage: window.localStorage
    }))

    this.bindEvents()
  }

  bindEvents (): void {
    this.app.service('user').on('update', (user) => {
      this.user = user
      this.emit('user', this.user)
    })
  }

  public async authenticate (options?): Promise<void> {
    try {
      const response = await this.app.authenticate(options)
      const JWTPayload = await this.app.passport.verifyJWT(response.accessToken)

      this.user = await this.app.service('users').get(JWTPayload.userId)

      this.emit('user', this.user)
    } catch (e) {
      this.user = null
      console.log(e)
    }
  }
}

export default new FeathersClient()
