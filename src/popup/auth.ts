export default class Auth {
  public static AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
  public static ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token'
  public static SCOPES = ['user', 'repo', 'notifications']

  public token?: string

  private state: number

  constructor () {
    this.state = Math.round(Math.random() * 100)

    this.launchAuthFlow()
  }

  launchAuthFlow () {
    chrome.identity.launchWebAuthFlow({
      url: this.getAuthorizeUrl(),
      interactive: true
    }, this.processRedirectUrl)
  }

  private processRedirectUrl = (url?: string) => {
    if (!url) {
      alert('Authentication error!')
      throw Error('Authentication error!')
    }

    const [host, queryParams] = url!.split('?')
    const params: {[key: string]: string} = {}

    queryParams.split('&').forEach(param => {
      const [key, value] = param.split('=')

      params[key] = decodeURIComponent(value)
    })

    if (params.state !== this.state.toString()) {
      throw Error('Auth error')
    }

    if (params.code) {
      this.processCode(params.code)
    }
  }

  private processCode (code: string) {
    const body = new FormData()

    body.append('client_id', process.env.GH_CLIENT_ID!)
    body.append('client_secret', process.env.GH_CLIENT_SECRET!)
    body.append('code', code)
    body.append('state', this.state.toString())

    fetch(Auth.ACCESS_TOKEN_URL, {
      method: 'POST',
      body
    })
      .then(response => response.json())
      .then(json => {
        this.token = json.access_token
      })
  }

  private processAccessToken (token: string) {
    this.token = token
    console.log(token)
  }

  private getAuthorizeUrl () {
    return `${Auth.AUTHORIZE_URL}?client_id=${process.env.GH_CLIENT_ID}&scope=${encodeURIComponent(Auth.SCOPES.join(' '))}&state=${this.state}`
  }
}
