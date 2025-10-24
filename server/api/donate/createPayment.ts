import axios from 'axios';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { locale, amount, order_id, currency } = body;

  const API_KEY = process.env.CRYPTOCLOUD_API_KEY || '';
  const SHOP_ID = process.env.CRYPTOCLOUD_SHOP_ID || '';

  const url = 'https://api.cryptocloud.plus/v2/invoice/create?locale=' + locale;

  const headers = {
    Authorization: `Token ${API_KEY}`,
    'Content-Type': 'application/json',
  };
  const data = {
    amount: amount,
    shop_id: SHOP_ID,
    order_id: order_id,
    currency: currency,
  };

  try {
    const response = await axios
      .post(url, data, { headers })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const response_url: string = response.data.result.link;
    return { success: true, payment_url: response_url };
  } catch (error) {
    return { success: false, payment_url: '', error: error };
  }
});
