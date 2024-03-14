import Cookies from 'universal-cookie';

export const fetcher = (...args) => {
    return fetch(...args)
        .then(async (res) => {
            //TODO: if the error is 403 
            if (res.status === 403) {
                //TODO: get refresh token from the local storage
                const cookies = new Cookies();
                const refreshToken = localStorage.getItem('refresh_token');

                //TODO: fetch to the /refreshToken route
                try {
                    const result = await fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/users/refreshToken`,
                        {
                            method: 'POST',
                            headers: {
                                authorization: `JWT ${refreshToken}`
                            }
                        }
                    )

                    if (result.status !== 200) {
                        throw res;
                    }

                    //TODO: REMOVE THE OLD TOKENS FROM THE LOCAL STORAGE AND THE COOKIES
                    localStorage.removeItem('refresh_token');
                    cookies.remove('access_token');

                    //TODO: place the access token in the cookies and the refresh token in the local storage
                    const data = await result.json();
                    localStorage.setItem('refresh_token', data.refreshToken);
                    cookies.set('access_token', data.accessToken);
                    localStorage.setItem('user_id', data.userId);

                    //TODO: new fetch request with the new tokens
                    const newArgs = [...args];

                    if (args[0].includes('/logout')) {
                        newArgs[1].headers.authorization = `JWT ${data.refreshToken}`;
                    } else {
                        newArgs[1].headers.authorization = `JWT ${data.accessToken}`;
                    }

                    return fetch(...newArgs);
                } catch (error) {
                    console.error(error);

                    throw error;
                }
            } else {
                return res;
            }
        });
};
