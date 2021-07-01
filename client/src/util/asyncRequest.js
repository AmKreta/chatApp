import axios from 'axios';

//importing redux store
import store from '../store/rootReducer';

//importing actions
import { updateTokens } from '../actions/actions';

function AsyncRequest({ method, url, body, headers, params }) {
    let { access_token, refresh_token } = store.getState().token;
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axios({
                url,
                method,
                params,
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    ...headers
                },
                data: {
                    refresh_token,
                    ...body
                }
            });
            if (result.data.sucess) {
                let { tokens, ...payload } = result.data.payload;
                tokens && store.dispatch(updateTokens(tokens));
                resolve(payload);
            }
            else {
                reject(result.data.payload);
            }
        }
        catch (err) {
            console.log(err);
            reject(err);
        };
    });
};

export default AsyncRequest;