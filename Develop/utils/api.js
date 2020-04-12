require("dotenv").config({ path: "../.env" });
const axios = require("axios");


  async function getUser(username) {
    const url = `https://api.github.com/users/${username}`;
    const token = process.env.token;
    const config = {
      headers: {'Authorization': `token ${token}`}
    };

    let userData;
    try {
      const response = await axios.get(url, config)
      userData = {
        name: response.data.login,
        email: response.data.email,
        image: response.data.avatar_url
      }
    } catch (err) {
        throw new Error(`${err.response.status}: ${err.response.statusText}`)
    };
    return userData;
  };


module.exports = getUser
