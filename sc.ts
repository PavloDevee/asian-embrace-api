const jwt = require('jsonwebtoken');
const API_KEY = "a1a0cfbb-0882-4dd5-99f0-a7c2018a371b"; // This would be "361c3d59-a001-470b-a35d-6d8eac8baffa"
const SECRET = "2ad52fa80ba2acf76b50d39222f83ac387a1af239cfac0e329ce83560c2c3a6e";  // The secret associated with the API key above

const options = { 
 expiresIn: '120m', // Or longer for a more static API token
 algorithm: 'HS256' 
};
const payload = {
 apikey: API_KEY,
 permissions: [`allow_join`], // Or other permissions if needed for room creation
 version: 2,
// roles: ['crawler'] // 'crawler' is specifically for server-to-server API access
};

const token = jwt.sign(payload, SECRET, options);
console.log(token); // This output is the JWT you need for authToken