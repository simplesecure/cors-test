import React from 'react';
import logo from './logo.svg';
import './App.css';
const request = require('request-promise');

const config = {
  username: `user_${Date.now()}`,
  devId: "imanewdeveloper", 
  apiKey: "-LmCb96-TquOlN37LpM0", 
  email: "fakeemailfordays@fake.email.fake.com", 
  password: "supersecurepassword", 
  development: true, 
  api: "https://api.simpleid.xyz"
}

async function testIt() {
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
  const dataString = JSON.stringify({
    username: config.username,
    email: config.email,
    password: config.password,
    development: config.development,
    devId: config.devId
  });

  headers['Authorization'] = config.apiKey;

  //This is a simple call to replicate blockstack's make keychain function
  const options = { url: config.api, method: 'POST', headers: headers, body: dataString };
  return request(options)
  .then(async (body) => {
    // POST succeeded...
    return {
      success: true,
      message: "successfully created keychain",
      body: body
    }
  })
  .catch(error => {
    // POST failed...
    console.log('ERROR: ', error)
    return {
      success: false,
      message: "failed to create keychain",
      body: error
    }
  });
}

function App() {
  return (
    <div className="App">
      <button onClick={testIt}>Do it</button>
    </div>
  );
}

export default App;
