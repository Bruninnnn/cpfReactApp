import React, { useCallback, useState } from 'react'

import { CardAddBankWallet } from '../../components/Card/CardAddBankWallet'
import { CardBankWallet } from '../../components/Card/CardBankWallet'
import { FaTrashAlt } from 'react-icons/fa'

import {
  requestAPIKey,
  requestAccountConnect,
  requestAccountTransaction,
  requestConnectToken,
  requestConnectTokenToId,
  requestItemDelete,
} from '../../api/pluggy/pluggyController'

import { PluggyConnect } from 'react-pluggy-connect'
import { SiNubank } from 'react-icons/si'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

export const BankAccountWallets = () => {
  const [openWidget, setOpenWidget] = useState(false)
  const [openUpdateWidget, setOpenUpdateWidget] = useState(false)
  const [connectToken, setConnectToken] = useState()

  const [itemId, setItemId] = useState('');
  const [updatedItemID, setUpdatedItemID] = useState('');
  const [accountId, setAccountId] = useState('');
  const [apiKey, setApiKey] = useState('')

  const [bankName, setBankName] = useState('');
  const [bankImageUrl, setBankImageUrl] = useState('');
  const [bankPrimaryColor, setBankPrimaryColor] = useState('');
  const [bankCreatedDate, setBankCreatedDate] = useState('');
  const [bankUpdatedDate, setBankUpdatedDate] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [limitCreditCard, setLimitCreditCard] = useState('');

  const onClosePopup = useCallback(() => {
    setOpenWidget(false);
  }, []);

  const onCloseUpdateWidget = useCallback(() => {
    setOpenUpdateWidget(false);
  }, []);

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
    console.log(itemData)

    const itemId = itemData.item.id
    setItemId(itemId);

    const data = await requestAccountConnect({ itemId, apiKey })
    console.log(data)

    const ids = data.results.map(result => result.id); // segue este formato devido a ser um array. id da conta bancária
    const idsString = ids.join(',');
    setAccountId(idsString);

    try {
      const dataTrans = await requestAccountTransaction({ accountId: idsString, apiKey })
      console.log(dataTrans);
    } catch (error) {
      console.error("Erro ao obter transações:", error);
    }

    const balanceCreditCard = data.results.map(result => result.balance);
    const availableCreditLimits = data.results.map(result => result.creditData.availableCreditLimit);

    const formatCurrency = (value) => {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    };

    setBankName(itemData.item.connector.name);
    setBankImageUrl(itemData.item.connector.imageUrl);
    setBankPrimaryColor("#" + itemData.item.connector.primaryColor);
    const createdDate = new Date(itemData.item.connector.createdAt);
    const updatedDate = new Date(itemData.item.connector.updatedAt);

    setBankCreatedDate(format(createdDate, 'dd/MM/yyyy'));
    setBankUpdatedDate(format(updatedDate, 'dd/MM/yyyy'));
    setCreditCard(
      balanceCreditCard.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      }))
    setLimitCreditCard(
      availableCreditLimits.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })
    )
  }

  const onSuccessUpdateItem = async (itemData) => {

  }

  async function handleOpenWidget() {
    try {
      const responseApiKey = await requestAPIKey()
      setApiKey(responseApiKey.apiKey)
      const connectToken = await requestConnectTokenToId({
        apiKey: responseApiKey.apiKey,
        itemId: '83f22e82-1ce8-4a17-a8ce-8cebc577b796' // Substituir pelo itemId daquele card em específico
      });
      setConnectToken(connectToken);
      if (connectToken?.accessToken) {
        await setConnectToken(connectToken?.accessToken)
        setOpenUpdateWidget(true)
      } else {
        setOpenUpdateWidget(false)
      }
    } catch (error) {
      console.error('Erro ao obter token de conexão e configurar widget:', error);
    }
  }

  async function handleDeleteConnection() {
    try {
      const responseApiKey = await requestAPIKey()
      setApiKey(responseApiKey.apiKey)
      console.log(responseApiKey)

      const deleteItemId = await requestItemDelete({ itemId, apiKey })
      console.log('Resposta do servidor:', deleteItemId)
      toast.warn('Excluido a conta com sucesso!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error('Erro ao deletar o itemId:', error)
      throw error
    }
  }

  const banks = [
    { bankName: 'Banco Mockado', bankIcon: '', bankPrimaryColor: '#000000' }
  ]

  return (
    <div className="flex sm:flex-col w-full h-full mx-4 sm:mt-8">
      <div className="grid w-full grid-cols-4 grid-rows-4 gap-8 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
        <div className="w-auto">
          <CardAddBankWallet handleOnClick={handleConnectPluggy} />
        </div>
        <div className="w-auto">
          {banks.map((bank, index) => (
            <CardBankWallet
              key={bank.itemId}
              bankName={bank.bankName}
              bankIcon={bank.bankImageUrl}
              bankColor={bank.bankPrimaryColor}
              propCreatedDate={bank.bankCreatedDate}
              propUpdatedDate={bank.bankUpdatedDate}
              propCreditCard={bank.creditCard}
              propLimitCreditCard={bank.limitCreditCard}
              propDeleteConnection={handleDeleteConnection}
              propUpdateConnection={handleOpenWidget}
            />
          ))}
        </div>
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
            updateItem={'83f22e82-1ce8-4a17-a8ce-8cebc577b796'}
          />
        )}
      </div>
    </div>
  )
}
