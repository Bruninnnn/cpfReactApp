import React, { useState } from 'react'

import { CardAddBankWallet } from '../../components/Card/CardAddBankWallet'
import { CardBankWallet } from '../../components/Card/CardBankWallet'
import { FaTrashAlt } from 'react-icons/fa'

import {
  requestAPIKey,
  requestConnectToken
} from '../../api/pluggy/pluggyController'
import { PluggyConnect } from 'react-pluggy-connect'
import { SiNubank } from 'react-icons/si'
import { format } from 'date-fns'

export const BankAccountWallets = () => {
  const [openWidget, setOpenWidget] = useState(false)
  const [connectToken, setConnectToken] = useState()

  const [bankName, setBankName] = useState('');
  const [bankImageUrl, setBankImageUrl] = useState('');
  const [bankPrimaryColor, setBankPrimaryColor] = useState('');
  const [bankCreatedDate, setBankCreatedDate] = useState('');
  const [bankUpdatedDate, setBankUpdatedDate] = useState('');

  async function handleConnectPluggy() {
    const responseApiKey = await requestAPIKey()
    const connectToken = await requestConnectToken({
      apiKey: responseApiKey.apiKey
    })

    if (connectToken?.accessToken) {
      await setConnectToken(connectToken?.accessToken)
      setOpenWidget(true)
    }
  }

  const onSuccess = (itemData) => {
    console.log(itemData)

    setBankName(itemData.item.connector.name);
    setBankImageUrl(itemData.item.connector.imageUrl);
    setBankPrimaryColor("#" + itemData.item.connector.primaryColor);

    const createdDate = new Date(itemData.item.createdAt);
    const updatedDate = new Date(itemData.item.updatedAt);
    setBankCreatedDate(format(createdDate, 'dd/MM/yyyy'));
    setBankUpdatedDate(format(updatedDate, 'dd/MM/yyyy'));

    console.log("Nome do Banco: ", itemData.item.connector.name, "Link da imagem: ", itemData.item.connector.imageUrl,
      "Cor: ", itemData.item.connector.primaryColor, "Criado em: ", createdDate, "Atualizado em: ", updatedDate)
  }

  return (
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
          propCreditCard={'- R$ 900,00'}
          propLimitCreditCard={' R$ 100,00'}
        />
      </div>
      {openWidget && (
        <PluggyConnect
          connectToken={connectToken}
          theme="dark"
          onSuccess={onSuccess}
          includeSandbox={true}
        />
      )}
    </div>
  )
}
