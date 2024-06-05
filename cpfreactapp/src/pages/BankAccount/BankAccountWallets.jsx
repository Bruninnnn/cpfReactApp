import React, { useState } from 'react'

import { CardAddBankWallet } from '../../components/Card/CardAddBankWallet'
import { CardBankWallet } from '../../components/Card/CardBankWallet'
import { ModalPopUp } from '../../components/Modals/ModalPopUp'
import { FaTrashAlt } from 'react-icons/fa'

import {
  requestAPIKey,
  requestConnectToken
} from '../../api/pluggy/pluggyController'
import { PluggyConnect } from 'react-pluggy-connect'

export const BankAccountWallets = () => {
  const [openModalPopUp, setOpenModalPopUp] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })

  const handleButtonClick = (event) => {
    // Obtém a posição do botão clicado
    const buttonRect = event.target.getBoundingClientRect()
    setButtonPosition({ x: buttonRect.x, y: buttonRect.y + buttonRect.height })
    // Exibe o componente
    setOpenModalPopUp(true)
  }

  const [openWidget, setOpenWidget] = useState(false)
  const [connectToken, setConnectToken] = useState()

  const handleCloseModal = () => {
    setOpenModalPopUp(false)
  }

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
    // do something with the financial data
  };

  return (
    <div className="grid w-full grid-cols-4 grid-rows-4 gap-8 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
      <div className="w-auto">
        <CardAddBankWallet handleOnClick={handleConnectPluggy} />
      </div>
      <div className="w-auto">
        <CardBankWallet
          bankName={'Nubank'}
          id={1}
          propCreatedDate={'04/07/2023'}
          propUpdatedDate={'04/07/2024'}
          propCreditCard={'- R$ 900,00'}
          propLimitCreditCard={' R$ 100,00'}
          propOnClick={handleButtonClick}
        />
      </div>
      <div className="w-auto">
        <CardBankWallet
          bankName={'Itaú'}
          id={1}
          propCreatedDate={'04/07/2023'}
          propUpdatedDate={'04/07/2024'}
          propCreditCard={'- R$ 900,00'}
          propLimitCreditCard={' R$ 100,00'}
          propOnClick={handleButtonClick}
        />
      </div>
      <div className="w-auto">
        <CardBankWallet
          bankName={'Caixa'}
          id={1}
          propCreatedDate={'04/07/2023'}
          propUpdatedDate={'04/07/2024'}
          propCreditCard={'- R$ 900,00'}
          propLimitCreditCard={' R$ 100,00'}
          propOnClick={handleButtonClick}
        />
      </div>
      <div className="w-auto">
        <CardBankWallet
          bankName={'Santander'}
          id={1}
          propCreatedDate={'04/07/2023'}
          propUpdatedDate={'04/07/2024'}
          propCreditCard={'- R$ 900,00'}
          propLimitCreditCard={' R$ 100,00'}
          propOnClick={handleButtonClick}
        />
      </div>
      {openModalPopUp && (
        <div
          style={{
            position: 'absolute',
            top: buttonPosition.y,
            left: buttonPosition.x
          }}
        >
          <ModalPopUp onClose={handleCloseModal} />
        </div>
      )}
      {openWidget && <PluggyConnect connectToken={connectToken} theme='dark' onSuccess={onSuccess} />}
    </div>
  )
}
