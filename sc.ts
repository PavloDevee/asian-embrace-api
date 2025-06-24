const jwt = require("jsonwebtoken");
const API_KEY = "161dcb90-911d-4e59-a0db-7382b6bad7d0"; // This would be "361c3d59-a001-470b-a35d-6d8eac8baffa"
const SECRET =
  "d230c4cfda89f582b1993657ac1fc4cddbb5da733bc3ce5ddad00cefd3a05cdd"; // The secret associated with the API key above

const options = {
  expiresIn: "120m", // Or longer for a more static API token
  algorithm: "HS256",
};
const payload = {
  apikey: API_KEY,
  permissions: [`allow_join`], // Or other permissions if needed for room creation
  version: 2,
  // roles: ['crawler'] // 'crawler' is specifically for server-to-server API access
};

const token = jwt.sign(payload, SECRET, options);
console.log(token); // This output is the JWT you need for authToken
