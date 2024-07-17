import { format } from 'date-fns'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { PluggyConnect } from 'react-pluggy-connect'
import { Bounce, toast } from 'react-toastify'
import { CardAddBankWallet } from '../../components/Card/CardAddBankWallet'
import { CardBankWallet } from '../../components/Card/CardBankWallet'
import {
  requestAPIKey,
  requestAccountConnect,
  requestAccountTransaction,
  requestConnectToken,
  requestConnectTokenToId,
  requestItemDelete
} from '../../api/pluggy/pluggyController'
import { Context } from '../../Context'
import { IP } from '../../env'

export const BankAccountWallets = () => {
  const { userContext } = useContext(Context)
  const [openWidget, setOpenWidget] = useState(false)
  const [openUpdateWidget, setOpenUpdateWidget] = useState(false)
  const [connectToken, setConnectToken] = useState('')

  const [itemId, setItemId] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [banks, setBanks] = useState([])

  const [bankData, setBankData] = useState({
    itemId: '',
    bankName: '',
    bankImageUrl: '',
    bankImageColor: '',
    createdAt: '',
    updatedAt: '',
    balance: '', // valor da fatura
    limit: '' // limite disponível
  })

  const [accountData, setAccountData] = useState({
    accountId: '',
    balanceCreditCard: '', // valor da fatura
    availableCreditLimit: '' // limite disponível
  })

  const onClosePopup = useCallback(() => {
    setOpenWidget(false)
  }, [])

  const onCloseUpdateWidget = useCallback(() => {
    setOpenUpdateWidget(false)
  }, [])

  const fetchBankAccounts = async (userId) => {
    try {
      const response = await fetch(
        `http://${IP}:8080/bank-account/user/${userId}`
      )
      const data = await response.json()
      setBanks(data)
    } catch (error) {
      toast.error('Failed to fetch bank accounts', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        style: { background: '#131316' },
        transition: Bounce
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (userContext && userContext.userId) {
        await fetchBankAccounts(userContext.userId)
      }
    }

    fetchData()
  }, [userContext])

  async function handleConnectPluggy() {
    try {
      const responseApiKey = await requestAPIKey()
      setApiKey(responseApiKey.apiKey)

      const connectToken = await requestConnectToken({
        apiKey: responseApiKey.apiKey
      })

      if (connectToken?.accessToken) {
        setConnectToken(connectToken.accessToken)
        setOpenWidget(true)
      } else {
        setOpenWidget(false)
      }
    } catch (error) {
      toast.error('Erro ao conectar com Pluggy, tente novamente.', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        style: { background: '#131316' },
        transition: Bounce
      })
    }
  }

  const onSuccessDefaultConnect = async (itemData) => {
    const itemId = itemData.item.id
    const newBankData = {
      itemId: itemId,
      bankName: itemData.item.connector.name,
      bankImageUrl: itemData.item.connector.imageUrl,
      bankImageColor: '#' + itemData.item.connector.primaryColor,
      createdAt: format(
        new Date(itemData.item.connector.createdAt),
        'yyyy-MM-dd'
      ),
      updatedAt: format(
        new Date(itemData.item.connector.updatedAt),
        'yyyy-MM-dd'
      )
    }

    setBankData(newBankData)
    setItemId(itemId)

    let banksResponse = [] // Declaração movida para fora do bloco try...catch

    try {
      const data = await requestAccountConnect({ itemId, apiKey })

      const accountId = data.results.map((result) => result.id)
      const idString = accountId.join(',')

      const balanceCreditCard = data.results.map((result) => result.balance)
      const availableCreditLimit = data.results.map(
        (result) => result.creditData.availableCreditLimit
      )

      const newAccountData = {
        accountId: idString,
        balanceCreditCard: parseFloat(balanceCreditCard),
        availableCreditLimit: parseFloat(availableCreditLimit)
      }

      setAccountData(newAccountData)

      const combinedData = {
        ...newBankData,
        balance: newAccountData.balanceCreditCard,
        limit: newAccountData.availableCreditLimit,
        user: userContext
      }

      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(combinedData)
        }

        const response = await fetch(
          `http://${IP}:8080/bank-account/create`,
          options
        )
        banksResponse = await response.json() // Atualização da variável banksResponse
        setBanks(banksResponse)
        console.log(banks, 'BANKS')
      } catch (error) {
        console.error('Erro ao enviar dados para a API:', error)
      }

      try {
        const dataTrans = await requestAccountTransaction({
          accountId: idString,
          apiKey
        })

        /* const transactionData = dataTrans.results.map((transaction) => ({
          ...transaction,
          bank: banksResponse[0]
        }))
 */
        /*  const transactionOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(transactionData)
        }

        await fetch(
          `http://${IP}:8080/bank-account-register/create`,
          transactionOptions
        ) */
      } catch (error) {
        console.error('Erro ao obter transações:', error)
      }
    } catch (error) {
      console.error('Erro ao conectar conta:', error)
    }
  }

  const onSuccessUpdateItem = async (itemData) => {
    // Implementar a lógica para atualização do item, se necessário
  }

  async function handleOpenWidget() {
    try {
      const responseApiKey = await requestAPIKey()
      setApiKey(responseApiKey.apiKey)

      const connectToken = await requestConnectTokenToId({
        apiKey: responseApiKey.apiKey,
        itemId: itemId // Substituir pelo itemId daquele card em específico
      })

      setConnectToken(connectToken)

      if (connectToken?.accessToken) {
        setConnectToken(connectToken.accessToken)
        setOpenUpdateWidget(true)
      } else {
        setOpenUpdateWidget(false)
      }
    } catch (error) {
      toast.error(
        'Erro ao obter token de conexão e configurar widget, tente novamente.',
        {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          style: { background: '#131316' },
          transition: Bounce
        }
      )
    }
  }

  async function handleDeleteConnection() {
    try {
      const responseApiKey = await requestAPIKey()
      setApiKey(responseApiKey.apiKey)

      const deleteItemId = await requestItemDelete({ itemId, apiKey })

      if (deleteItemId === undefined) {
        toast.error('Não foi possível excluir esta conexão, tente novamente!', {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          style: { background: '#131316' },
          transition: Bounce
        })
      } else {
        toast.warn('Conta desvinculada com sucesso!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          style: { background: '#131316' },
          transition: Bounce
        })
      }
    } catch (error) {
      toast.error('Algo não correu como esperado, tente novamente!', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        style: { background: '#131316' },
        transition: Bounce
      })
    }
  }

  return (
    <div className="mx-4 flex h-full w-full sm:mt-8 sm:flex-col">
      <div className="grid w-full grid-cols-4 grid-rows-4 gap-8 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
        <CardAddBankWallet handleOnClick={handleConnectPluggy} />
        {banks.length > 0 &&
          banks.map((bank) => (
            <CardBankWallet
              key={bank.itemId}
              bankName={bank.bankName}
              bankIcon={bank.bankImageUrl}
              bankColor={bank.bankImageColor}
              propCreatedDate={bank.createdAt}
              propUpdatedDate={bank.updatedAt}
              propCreditCard={bank.balance}
              propLimitCreditCard={bank.limit}
              propDeleteConnection={handleDeleteConnection}
              propUpdateConnection={handleOpenWidget}
            />
          ))}
        {openWidget && (
          <PluggyConnect
            connectToken={connectToken}
            theme="dark"
            onSuccess={onSuccessDefaultConnect}
            onClose={onClosePopup}
            includeSandbox={true}
          />
        )}
        {openUpdateWidget && (
          <PluggyConnect
            connectToken={connectToken}
            theme="dark"
            onSuccess={onSuccessUpdateItem}
            onClose={onCloseUpdateWidget}
            updateItem={banks.itemId}
          />
        )}
      </div>
    </div>
  )
}
