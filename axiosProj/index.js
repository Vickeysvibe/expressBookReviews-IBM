const axios = require("axios");
async function run() {
  const response = await axios.get("http://localhost:3434/title/Fairy tales");
  console.log(response.data);
}

run();
