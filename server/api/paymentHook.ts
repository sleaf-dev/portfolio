export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (body.status === 'paid') {
        console.log(`Платеж ${body.order_id} успешно оплачен!`);
    } else {
        console.log(`Платеж ${body.order_id} имеет статус ${body.status}`);
    }
    return { success: true };
});