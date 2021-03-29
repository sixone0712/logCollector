import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '' : 'https://localhost:8080/logmoinitor/api';

export default client;
