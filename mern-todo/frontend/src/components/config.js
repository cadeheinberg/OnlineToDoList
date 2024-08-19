let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = process.env.REACT_APP_API_URL_PRODUCTION;
} else {
    API_URL = process.env.REACT_APP_API_URL_DEVELOPMENT;
}

export default API_URL;