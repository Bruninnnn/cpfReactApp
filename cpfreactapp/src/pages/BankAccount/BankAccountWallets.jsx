import React, { useCallback, useContext, useState } from 'react'

import { CardAddBankWallet } from '../../components/Card/CardAddBankWallet'
import { CardBankWallet } from '../../components/Card/CardBankWallet'
import { FaTrashAlt } from 'react-icons/fa'

import {
  requestAPIKey,
  requestAccountConnect,
  requestAccountTransaction,
  requestConnectToken,
  requestConnectTokenToId,
  requestItemDelete
} from '../../api/pluggy/pluggyController'

import { PluggyConnect } from 'react-pluggy-connect'
import { SiNubank } from 'react-icons/si'
import { format } from 'date-fns'
import { Bounce, toast } from 'react-toastify'
import { Context } from '../../Context'
import { IP } from '../../env'

export const BankAccountWallets = () => {
  const { userContext } = useContext(Context)
  const [openWidget, setOpenWidget] = useState(false)
  const [openUpdateWidget, setOpenUpdateWidget] = useState(false)
  const [connectToken, setConnectToken] = useState()

  const [itemId, setItemId] = useState('')
  const [accountId, setAccountId] = useState('')
  const [apiKey, setApiKey] = useState('')

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

  async function handleConnectPluggy() {
    const responseApiKey = await requestAPIKey()
    setApiKey(responseApiKey.apiKey)
    const connectToken = await requestConnectToken({
      apiKey: responseApiKey.apiKey
    })

    if (connectToken?.accessToken) {
      await setConnectToken(connectToken?.accessToken)
      setOpenWidget(true)
    } else {
      setOpenWidget(false)
    }
  }

  const onSuccessDefaultConnect = async (itemData) => {
    const itemId = itemData.item.id;
    const newBankData = {
      itemId: itemId,
      bankName: itemData.item.connector.name,
      bankImageUrl: itemData.item.connector.imageUrl,
      bankPrimaryColor: '#' + itemData.item.connector.primaryColor,
      bankCreatedDate: format(new Date(itemData.item.connector.createdAt), 'dd/MM/yyyy'),
      bankUpdatedDate: format(new Date(itemData.item.connector.updatedAt), 'dd/MM/yyyy'),
    };

    setBankData(newBankData);
    setItemId(itemId);

    console.log(newBankData, 'BANKDATA');
    const data = await requestAccountConnect({ itemId, apiKey });
    console.log(data, 'ACCOUNT DATA');

    const accountId = data.results.map((result) => result.id);
    const idString = accountId.join(',');
    setAccountId(idString);

    const balanceCreditCard = data.results.map((result) => result.balance);
    const availableCreditLimit = data.results.map((result) => result.creditData.availableCreditLimit);

    const newAccountData = {
      accountId: idString,
      balanceCreditCard: parseFloat(balanceCreditCard),
      availableCreditLimit: parseFloat(availableCreditLimit)
    };
    setAccountData(newAccountData);

    const combinedData = {
      ...newBankData,
      balance: newAccountData.balanceCreditCard,
      limit: newAccountData.availableCreditLimit,
      user: userContext?.id
    };

    console.log('Dados Combinados:' + combinedData);

    try {
      const userId = userContext?.id

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(combinedData)
      };

      const response = await fetch(`http://${IP}:8080/bank-account/create?userId=${userId}`, options); // Atualize com o URL correto da sua API
      const result = await response.json();
      console.log('Resposta do servidor:', result);
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
    }

    try {
      const dataTrans = await requestAccountTransaction({
        accountId: idString,
        apiKey
      })
      console.log(dataTrans, 'TRANSACTIONS')
    } catch (error) {
      console.error('Erro ao obter transações:', error)
    }
  }

  const onSuccessUpdateItem = async (itemData) => { }

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
        await setConnectToken(connectToken?.accessToken)
        setOpenUpdateWidget(true)
      } else {
        setOpenUpdateWidget(false)
      }
    } catch (error) {
      console.error(
        'Erro ao obter token de conexão e configurar widget:',
        error
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
      throw error
    }
  }

  const banks = [
    {
      itemId: bankData.itemId,
      bankName: bankData.bankName,
      bankIcon: bankData.bankImageUrl,
      bankColor: bankData.bankPrimaryColor,
      propCreatedDate: bankData.bankCreatedDate,
      propUpdatedDate: bankData.bankUpdatedDate,
      propCreditCard: accountData.balanceCreditCard,
      propLimitCreditCard: accountData.availableCreditLimit,
      propDeleteConnection: handleDeleteConnection,
      propUpdateConnection: handleOpenWidget
    }
  ]


  return (
    <div className="mx-4 flex h-full w-full sm:mt-8 sm:flex-col">
      <div className="grid w-full grid-cols-4 grid-rows-4 gap-8 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
        <CardAddBankWallet handleOnClick={handleConnectPluggy} />
        {banks
          .filter((bank) => bank.itemId)
          .map((bank, index) => (
            <CardBankWallet
              key={bank.itemId}
              bankName={bank.bankName}
              bankIcon={bank.bankIcon}
              bankColor={bank.bankColor}
              propCreatedDate={bank.propCreatedDate}
              propUpdatedDate={bank.propUpdatedDate}
              propCreditCard={bank.propCreditCard}
              propLimitCreditCard={bank.propLimitCreditCard}
              propDeleteConnection={bank.propDeleteConnection}
              propUpdateConnection={bank.propUpdateConnection}
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
