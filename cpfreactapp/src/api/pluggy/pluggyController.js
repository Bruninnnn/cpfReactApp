// Conexão

import { PluggyConnect } from "react-pluggy-connect"

export async function requestAPIKey() {
  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      clientId: '8f63b6d2-7f03-4384-b27c-d8f52d1509c6',
      clientSecret: '6f1cf3ff-7079-4f49-a2d2-0a3f4ab228d5'
    })
  }

  try {
    const response = await fetch('https://api.pluggy.ai/auth', options)
    return response.json()
  } catch (err) {
    console.error(err)
  }
}

export async function requestConnectToken({ apiKey }) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': `${apiKey}`
    },
  }

  try {
    const response = await fetch('https://api.pluggy.ai/connect_token', options)
    return response.json()
  } catch (err) {
    console.error(err)
  }
}

export async function requestConnectTokenToId({ apiKey, itemId, clientUserId = 'user@example.com' }) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': `${apiKey}`
    },
    body: JSON.stringify({
      itemId,
      options: {
        clientUserId
      }
    })
  }

  try {
    const response = await fetch('https://api.pluggy.ai/connect_token', options)
    return response.json()
  } catch (err) {
    console.error(err)
  }
}

//Contas

export async function requestAccountConnect({ itemId, apiKey }) { // Faz a requisição da conta bancária pegando o a apikey gerada + o itemid gerado
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${apiKey}`
    }
  };

  try {
    const response = await fetch(`https://api.pluggy.ai/accounts?itemId=${itemId}`, options)
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export async function requestItemDelete({ itemId, apiKey }) { // Faz a requisição da conta bancária pegando o a apikey gerada + o itemid gerado
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${apiKey}`
    }
  };

  try {
    const response = await fetch(`https://api.pluggy.ai/items/127b644c-35fd-49f6-b6be-334b802aacbd`, options)
    const deletedItemId = await response.json()
    return deletedItemId
  } catch (err) {
    console.error(err)
  }
}

// Transações

export async function requestAccountTransaction({ accountId, apiKey }) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${apiKey}`
    }
  };

  try {
    const response = await fetch(`https://api.pluggy.ai/transactions?accountId=${accountId}`, options)
    const transactions = await response.json()
    console.log(transactions)
    return transactions
  } catch (err) {
    console.error(err)
  }
}
