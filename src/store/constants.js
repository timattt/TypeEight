export const AuthActionTypes = {
    authorize: "AUTHORIZE",
    updateTokenState: "CHECK_TOKEN_VALID",
    refreshAccessToken: "REFRESH_ACCESS_TOKEN",
}

export const SSO_URL = process.env.REACT_APP_TYPE8_SERVER_IP
export const CLIENT_ID = process.env.REACT_APP_TYPE8_CLIENT_ID
export const CLIENT_SECRET = process.env.REACT_APP_TYPE8_CLIENT_SECRET
export const REDIRECT_URI = process.env.REACT_APP_TYPE8_REDIRECT_URI

export const OAUTH2_TOKEN_ENDPOINT = "/public/oauth2/token"
export const OAUTH2_AUTHORIZATION_ENDPOINT = "/public/oauth2/authorize"
export const LOGOUT_ENDPOINT = "/public/logout"
export const INTROSPECTION_ENDPOINT = '/public/oauth2/introspect'