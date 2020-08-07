import axios from  'axios';

const _apiBase = 'http://192.168.35.5:8181/api/Directory/';

export default axios.create({
    baseURL: _apiBase,
    responseType: 'json'
});
