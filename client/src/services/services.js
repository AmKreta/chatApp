export const server = process.env.REACT_APP_SERVER_URL;

//emoji routes
const openEmojiApiKey = process.env.REACT_APP_OPEN_EMOJI_API_KEY;
export const getEmojiCategories = `https://emoji-api.com/categories?access_key=${openEmojiApiKey}`;
export const getEmojis = (category) => `https://emoji-api.com/categories/${category}?access_key=${openEmojiApiKey}`;
export const searchEmoji = (query) => `https://emoji-api.com/emojis?search=${query}&access_key=${openEmojiApiKey}`;
export const getAllEmojis = `https://emoji-api.com/emojis?access_key=${openEmojiApiKey}`;


//giphy toutes
const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY;
export const getGif = ({ query, page }) => {
    const url = query === ''
        ? `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=30&rating=g`
        : `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&limit=30&offset=${page}&rating=g&lang=en`;
    return url;
}

//user crud operations
export const post_signup = `${server}/api/user`;
export const get_login = `${server}/api/user`;
export const put_updateUser = `${server}/api/user`;
export const get_searchUser = `${server}/api/user/search`;
export const get_userById = `${server}/api/user/findById`;
export const get_userListById = `${server}/api/user/findListById`;
export const post_addToContactRequest = `${server}/api/user/contact/sendRequest`;
export const put_confirmRequest = `${server}/api/user/contact/confirmRequest`;
export const put_removeContact = `${server}/api/user/contact/removeContact`
export const put_cancelRequest = `${server}/api/user/contact/cancelRequest`;
export const put_rejectRequest = `${server}/api/user/contact/rejectRequest`;
export const put_addToFavorite = `${server}/api/user/favorite`;
export const delete_removeFavorite = `${server}/api/user/favorite`;

//file upload single/multi
export const post_upload = `${server}/api/upload`;

//group crud operations

//chat crud operations
export const get_chat = `${server}/api/chat`;
export const post_chat = `${server}/api/chat`;
export const get_ChatList = `${server}/api/chat/getChatList`;
export const put_markasRead = `${server}/api/chat/markAsRead`;
