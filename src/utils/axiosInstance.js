import axios from 'axios';
/// always update the STRAPIURL to utils/socket.js too
import { STRAPIURL } from '@env';
//const STRAPIURL = 'http://localhost:1337';

export const strapiClient = axios.create({
  baseURL: STRAPIURL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
  },
});

export default { strapiClient };
