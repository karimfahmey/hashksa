import axios from 'axios';
import { store } from '../reducers';

axios.defaults.baseURL = 'https://dashboard.hashksa.co/api/'
axios.interceptors.response.use(res=> res.data, err=> Promise.reject(err.response))
const lang = localStorage.getItem('lang') || 'ar';

const getAuthHeader = () => ({"Accept-Language": lang, "X-Authorization": `${store.getState().authStoreState.token}`});
const getAuthHeaderForm = () => ({"Accept-Language": lang, "X-Authorization": `${store.getState().authStoreState.token}`, 'content-type': 'multipart/form-data'});
const getAuthHeaderLang = () => ({"Accept-Language": lang })
const SearchValue = () => (localStorage.getItem('SearchValue'))

export const ApiService = {

    login(item) {
        return axios.post('emailLogin', item, {headers: getAuthHeader()}) 
    },

    updatePassword(item) {
        return axios.post('updatePassword', item, {headers: getAuthHeader()}) 
    },

    registerStepOne(item) {
        return axios.post('registerStepOne', item, {headers: getAuthHeaderLang()})  
    },

    provider(item) {
        return axios.post('provider', item, {headers: getAuthHeaderLang()})  
    },

    posts(item) {
        return axios.post('postAll', item, {headers: getAuthHeader()})   
    },
    
    postsShow(item) {
        return axios.post('posts/show', item, {headers: getAuthHeader()})   
    },
    
    postLike(item) {
        return axios.post('posts/like', item, {headers: getAuthHeader()})   
    },

    postBookmark(item) {
        return axios.post('posts/bookmark', item, {headers: getAuthHeader()})   
    },

    postComment(item) {
        return axios.post('comment', item, {headers: getAuthHeader()})   
    },
    
    postReplay(item) {
        return axios.post('comment/replay', item, {headers: getAuthHeader()})   
    },

    getEvents(item) {
        return axios.post('getEvents', item, {headers: getAuthHeader()})
    },

    getEventByID(item) {
        return axios.post('events/showEvent', item, {headers: getAuthHeader()})
    },
    
    getEventsCalender(item) {
        return axios.post('eventCalender', item, {headers: getAuthHeader()})
    },
    
    addEvents(item) {
        return axios.post('events/web', item, {headers: getAuthHeaderForm()})   
    },

    events(item) {
        return axios.post('postAll')   
    },

    eventBookmark(item) {
        return axios.post('events/bookmark', item, {headers: getAuthHeader()});
    },

    poll(item) {
        return axios.post('poll', item, {headers: getAuthHeader()})   
    },

    postContactUs(item) {
        return axios.post('contactUs', item, {headers: getAuthHeaderLang()}) 
    },

    getContactUs(item) {
        return axios.get('contactUs')   
    },

    getPrivacy(item) {
        return axios.get('privacy')   
    },

    getTerms(item) {
        return axios.get('terms')   
    },

    getBookmarkPosts(item) {
        return axios.post('bookmark/getPosts', item, {headers: getAuthHeader()})   
    },

    getBookmarkEvents(item) {
        return axios.post('bookmark/getEvents', item, {headers: getAuthHeader()})   
    },

    getTags(item) {
        return axios.get('getTags')   
    },

    getTagsWeb(item) {
        return axios.get('getTagsWeb')   
    },

    getCity(item) {
        return axios.get('getCity')   
    },

    getCategory(item) {
        return axios.get('getCategory')   
    },

    getCategoryWeb(item) {
        return axios.get('getCategoryWeb')   
    },

    getEventCategory(item) {
        return axios.get('event_type')   
    },

    getEventCategoryWeb(item) {
        return axios.get('event_type_web')   
    },

    twitterGetTrends(item) {
        return axios.get('trends/twitterGetTrends')   
    },
    googleGetTrends(item) {
        return axios.get('trends/google_trends')   
    },
    googleNewsGetTrends(item) {
        return axios.get('trends/google_news')   
    },
    youtubeGetTrends(item) {
        return axios.get('trends/youtube')   
    },

    sendPollItem(item) {
        return axios.post('sendPollItem', item, {headers: getAuthHeader()})   
    },

    getProfile(item) {
        return axios.get('profile', {headers: getAuthHeader()})   
    },

    updateProfile(item) {
        return axios.post('updateProfile', item, {headers: getAuthHeader()})   
    },

    SearchItems(item) {
        return axios.post('search', item, { headers: getAuthHeader()}) 
    },




    collections(item) {
        return axios.get('collections', {headers: getAuthHeader()})   
    },

    suggestedCollections(item) {
        return axios.get('collections/suggested', {headers: getAuthHeader()})   
    },

    users(item) {
        return axios.get('user', {headers: getAuthHeader()})   
    },

    suggestedUsers(item) {
        return axios.get('user/suggestedUsers', {headers: getAuthHeader()})   
    },



    // editMyProfile(id, item) {
    //     return axios.put(`users/${id}/info`, item, {headers: getAuthHeader()})  
    // },

    // getUser(id) {
    //     return axios.get(`users/${id}`, {headers: getAuthHeader()})  
    // }
}