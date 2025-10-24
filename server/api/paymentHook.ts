export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body.status === 'paid' ? `Платеж ${body.order_id} успешно оплачен!` : `Платеж ${body.order_id} имеет статус ${body.status}`);
  return { success: true };
});
