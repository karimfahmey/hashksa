export const persistMyInfo = (payload) => {
    window.localStorage.setItem('id_token', payload.token.accessToken)
    window.localStorage.setItem('id_user', payload.data.id)
    window.localStorage.setItem('type_user', 'user')
}

export const unpersistMyInfo = () => {
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('id_user')
    window.localStorage.removeItem('type_user')
}