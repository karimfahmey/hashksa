const initialState = {
    data: {},
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    id: localStorage.getItem('id'),
    token: localStorage.getItem('id_token')
}

export const authStoreState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                id: action.payload.data.id,
                isAuthenticated: true,
                token: action.payload.token.accessToken,
                data: action.payload.data
            }
        case 'LOGGED_OUT':
            return {
                isAuthenticated: false,
                id: undefined,
                token: undefined,
                data: undefined
            }
        case 'SEARCH':
            return {
                isAuthenticated: false,
                id: undefined,
                token: undefined,
                data: undefined
            }
        default:
            return {...state};
    }
}