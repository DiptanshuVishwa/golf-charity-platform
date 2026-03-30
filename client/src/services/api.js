import axios from "axios";

const API = axios.create({
  baseURL: "https://golf-charity-platform-0prl.onrender.com/api",
});

export default API;