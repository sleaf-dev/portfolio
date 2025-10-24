import axios from 'axios';

const API_KEY = process.env.CRYPTOCLOUD_API_KEY || '';
const SHOP_ID = process.env.CRYPTOCLOUD_SHOP_ID || '';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { locale, amount, order_id, currency } = body;

  const headers = {
    Authorization: `Token ${API_KEY}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios
      .post(
        `https://api.cryptocloud.plus/v2/invoice/create?locale=${locale}`,
        {
          amount: amount,
          shop_id: SHOP_ID,
          order_id: order_id,
          currency: currency,
        },
        { headers }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return { success: true, payment_url: response.data.result.link };
  } catch (error) {
    return { success: false, payment_url: '', error: error };
  }
});
