export async function requestAPIKey() {
  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      clientId: 'c6f316d0-3a76-4096-b5c6-cc7e4527263f',
      clientSecret: 'a446324d-feff-43ff-81f2-b0b86e40f846'
    })
  }

  return await fetch('https://api.pluggy.ai/auth', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err))
}

export async function requestConnectToken({ apiKey }) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': `${apiKey}`
    }
  }

  fetch('https://api.pluggy.ai/connect_token', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err))

  /* 
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'X-API-KEY': `${apiKey}`},
        body: JSON.stringify({options: {webhookUrl: 'http://{IP}:8080/webhook', clientUserId: `${userId}`}})
      };
      
      fetch('https://api.pluggy.ai/connect_token', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); */
}
