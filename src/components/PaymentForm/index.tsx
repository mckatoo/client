import Button from 'components/Button'
import Heading from 'components/Heading'
import { useCart } from 'hooks/use-cart'
import { Session } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { createPaymentIntent } from 'utils/stripe/methods'

import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'

import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    async function setPaymentMode () {
      if (items.length) {
        const data = await createPaymentIntent({
          items,
          token: session.jwt
        })

        if (data.freeGames) {
          setFreeGames(true)
          console.log(data.freeGames)
          return
        }

        if (data.error) {
          setError(data.error)
          return
        }

        setClientSecret(data.client_secret)
        console.log({ clientSecret })
      }
    }
    setPaymentMode()
    /*
    bater na API /orders/create-payment-intent
    enviar os items do carrinho
    se  receber freeGames: true => setFreeGames(true)
    faço o fluxo de jogo gratuito
    se eu receber um erro então setError(erro)
    senão o paymentIntent foi válido
    setClientSecret
     */
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color='black' size='small' lineBottom>
          Payment
        </Heading>

        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px'
              }
            }
          }}
          onChange={handleChange}
        />

        {error && (
          <S.Error>
            <ErrorOutline size={20} />
            {error}
          </S.Error>
        )}
      </S.Body>
      <S.Footer>
        <Button as='a' fullWidth minimal>
          Continue shopping
        </Button>
        <Button
          fullWidth
          icon={<ShoppingCart />}
          disabled={disabled || !!error}
        >
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}
export default PaymentForm
