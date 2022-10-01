import axios from 'axios';

export default axios.create({
  baseURL: 'http://api.ravelry.com/',
  headers: {
    Authorization: 'read-f304127ff38142c8444f373be8dee11e:2Q34GKTk9FEE1MR7Tep7t7tUo4ZNC63eR7b/X2KX'
  }
});