import { css } from '../lib/dom.js'
import { Div } from '../component/elements.jsx'
import { Input, Form } from '../component/form.jsx'
import { useState } from 'preact/hooks'

css(`
  .cinetpay-card {
    position:absolute;
    top: 20%;
    left: 30%;
    right:30%;
    z-index:5;
    border-radius: 0.6rem;
    transfrom:translate(-50%,-50%);
    width:800px;
    height: 400px;
    background: black;
  }

  .cinetpay-card h1 {
    font-size: 2rem;
    text-align:center;
    border:2px solid lime;
    padding: 0.2rem;
    margin-top: 10px;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
  }

  .cinetpay-card h1>span {
    font-size: 2rem;
    color: lime;
  }
`)

export const CinetPayCard = () => {
  const [errors, setErrors] = useState({})

  const sendPay = async (e) => {
    e.preventDefault()
    const apikey = '3014947585e503392557925.50663082'
    const cpm_site_id = '477360'
    const cpm_trans_id = Math.floor(Math.random() * 10000000 + 10000)
    const cpm_payment_config = 'SINGLE'
    const cpm_page_action = 'PAYMENT'
    const cpm_version = 'V1'

    let data = {
      ...Object.fromEntries(new FormData(e.target)),
      apikey,
      cpm_site_id,
      cpm_trans_id,
      cpm_payment_config,
      cpm_page_action,
    }

    const resp = await (
      await fetch('https://api.cinetpay.com/v1/?method=getSignatureByPost ', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: data,
      })
    ).json()
    console.log('resp', resp)
  }

  return (
    <Div class="cinetpay-card">
      <h1>
        <span>CinetPay</span> Payment
      </h1>
      <Form submit="process to payment" class="cinetpay-orm" onSubmit={sendPay}>
        <Input
          inputType="input"
          type="number"
          name="cpm_amount"
          comment="Amount"
          class="input-settings"
          divStyle={{ width: '45%' }}
          value="5"
          errors={errors}
          updateErrors={setErrors}
        />
        <Input
          inputType="input"
          type="text"
          name="cpm_currency"
          comment="Currency"
          class="input-settings"
          divStyle={{ width: '45%' }}
          value="XOF"
          errors={errors}
          updateErrors={setErrors}
        />
        <Input
          inputType="input"
          type="text"
          name="cpm_designation"
          comment="Designation"
          class="input-settings"
          divStyle={{ width: '45%' }}
          value=""
          errors={errors}
          updateErrors={setErrors}
        />
      </Form>
    </Div>
  )
}
