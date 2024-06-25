import { requestAPIKey } from "./pluggyController";

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