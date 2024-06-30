import React, { useCallback, useState } from 'react'

import { CardAddBankWallet } from '../../components/Card/CardAddBankWallet'
import { CardBankWallet } from '../../components/Card/CardBankWallet'
import { FaTrashAlt } from 'react-icons/fa'

import {
  requestAPIKey,
  requestAccountConnect,
  requestConnectToken
} from '../../api/pluggy/pluggyController'

import { PluggyConnect } from 'react-pluggy-connect'
import { SiNubank } from 'react-icons/si'
import { format } from 'date-fns'

export const BankAccountWallets = () => {
  const [openWidget, setOpenWidget] = useState(false)
  const [connectToken, setConnectToken] = useState()

  const [itemId, setItemId] = useState('');
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

  const onSuccess = async (itemData) => {
    console.log(itemData)

    const itemId = itemData.item.id
    setItemId(itemId);

    const data = await requestAccountConnect({ itemId, apiKey })
    console.log(data)

    const ids = data.results.map(result => result.id); // segue este formato devido a ser um array. id da conta bancária
    console.log(ids)

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
    console.log(ids);
    console.log(balanceCreditCard)
    console.log(availableCreditLimits)
  }

  return (
    <div className="flex sm:flex-col w-full h-full mx-4 sm:mt-8">
      <div className="grid w-full grid-cols-4 grid-rows-4 gap-8 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
        <div className="w-auto">
          <CardAddBankWallet handleOnClick={handleConnectPluggy} />
        </div>
        <div className="w-auto">
          <CardBankWallet
            bankName={bankName}
            bankIcon={bankImageUrl} //Criar a prop que usa o link compartilhado pelo widget
            bankColor={bankPrimaryColor}
            propCreatedDate={bankCreatedDate}
            propUpdatedDate={bankUpdatedDate}
            propCreditCard={creditCard}
            propLimitCreditCard={limitCreditCard}
          />
        </div>
        {openWidget && (
          <PluggyConnect
            connectToken={connectToken}
            theme="dark"
            onSuccess={onSuccess}
            includeSandbox={true}
            onClose={onClosePopup}
          />
        )}
      </div>
    </div>
  )
}
