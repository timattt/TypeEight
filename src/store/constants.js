export const AuthActionTypes = {
    authorize: "AUTHORIZE",
    updateTokenState: "CHECK_TOKEN_VALID",
    refreshAccessToken: "REFRESH_ACCESS_TOKEN",
}

const BACKEND_HOST = 'https://backend.quiz.mipt.io'

export const LIST_TESTS = BACKEND_HOST + '/api/v1/public/test/all'
export const DELETE_TEST = BACKEND_HOST + '/api/v1/public/test/{id}'
export const CREATE_TEST = BACKEND_HOST + '/api/v1/public/test/create'

export const LOAD_ALL_RUNS = BACKEND_HOST + '/api/v1/public/run/all'
export const GET_RUN = BACKEND_HOST + '/api/v1/public/run/{id}'
export const CREATE_TEST_RUN = BACKEND_HOST + '/api/v1/public/test/{id}/run'

export const ALL_TRIES = BACKEND_HOST + '/api/v1/public/run/tries'
export const CREATE_TEST_TRY = BACKEND_HOST + '/api/v1/public/run/{id}/join'
export const GET_RESULT = BACKEND_HOST + '/api/v1/public/run/{id}/result'

export const GET_QUESTION = BACKEND_HOST + '/api/v1/public/run/{id}/question'
export const ANSWER_QUESTION = BACKEND_HOST + '/api/v1/public/run/{id}/question/{questionId}/answer'

export const SSO_URL = process.env.REACT_APP_TYPE8_SERVER_IP
export const CLIENT_ID = process.env.REACT_APP_TYPE8_CLIENT_ID
export const CLIENT_SECRET = process.env.REACT_APP_TYPE8_CLIENT_SECRET
export const REDIRECT_URI = process.env.REACT_APP_TYPE8_REDIRECT_URI

export const OAUTH2_TOKEN_ENDPOINT = "/api/v1/public/oauth2/token"
export const OAUTH2_AUTHORIZATION_ENDPOINT = "/api/v1/public/oauth2/authorize"
export const LOGOUT_ENDPOINT = "/api/v1/public/logout"
export const INTROSPECTION_ENDPOINT = '/api/v1/public/oauth2/introspect'