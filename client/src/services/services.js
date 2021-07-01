export const server = 'http://localhost:8000';

export const openEmojiApiKey = `d14ba6d429746157a8035ff475b6bc925a71dcae`;
export const getEmojiCategories = `https://emoji-api.com/categories?access_key=${openEmojiApiKey}`;
export const getEmojis = (category) => `https://emoji-api.com/categories/${category}?access_key=${openEmojiApiKey}`;
export const searchEmoji = (query) => `https://emoji-api.com/emojis?search=${query}&access_key=${openEmojiApiKey}`;
export const getAllEmojis = `https://emoji-api.com/emojis?access_key=${openEmojiApiKey}`;

export const getGif = ({ query, page }) => {
    const giphyApiKey = `n0gTMxbskDas7UI5DeAYMMHNR0aPCzqq`;
    const url = query === ''
        ? `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=30&rating=g`
        : `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&limit=30&offset=${page}&rating=g&lang=en`;
    return url;
}



export const post_signup = `${server}/api/user`;
export const get_login = `${server}/api/user`;
export const get_searchUser = `${server}/api/user/search`;
export const get_userById = `${server}/api./user/findById`;