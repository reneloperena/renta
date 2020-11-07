import NextAuth from 'next-auth'
import config from '../../../config'

const options = {
  providers: [
    {
      id: 'vuh',
      name: 'Vuh',
      type: 'oauth',
      version: '2.0',
      // scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: config.OAUTH2_TOKEN_URL,
      requestTokenUrl: config.OAUTH2_AUTH_URL,
      authorizationUrl: config.OAUTH2_AUTH_URL,
      /*
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      },
      */
      idToken: true,
      clientId: config.OAUTH2_CLIENT_ID,
      clientSecret: config.OAUTH2_CLIENT_SECRET
    }
  ]
}

export default (req, res) => NextAuth(req, res, options)