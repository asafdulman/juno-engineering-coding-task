import { bucketOrdersByDate, getLast2WeeksOrders, bucketOrdersByUsers, fetchAllOrders } from './ecommerce'

describe('Basic tests for fetching ecommerce orders from api', () => {
    it('should return all orders from api', async () => {
        const orders = await fetchAllOrders();
        expect(orders).toBeInstanceOf(Array);
        expect(orders).toHaveLength(100)
    });

    it('should return a map object that groups orders per user', async () => {
        const ordersByUsers = await bucketOrdersByUsers();
        expect(ordersByUsers).toBeInstanceOf(Object);
        const userOrdersKeys = Object.keys(ordersByUsers);
        for (const key of userOrdersKeys) {
            const orders = ordersByUsers[key];
            expect(orders.find(order => order.userId === key)).toBeTruthy();
        }
    });

    it('should return an array of orders from the last two weeks', async () => {
        let orders = await getLast2WeeksOrders();
        expect(orders).toBeInstanceOf(Array);
        const twoWeeksTimestamp = 14 * 24 * 60 * 60 * 1000
        const currentDate = Date.now()
        orders.forEach(order => {
            const timeDifference = currentDate - order.timestamp
            expect(timeDifference).toBeLessThanOrEqual(twoWeeksTimestamp)
        })
    });

    it('should return a map object that groups orders per date', async () => {
        const ordersByDate = await bucketOrdersByDate()
        expect(ordersByDate).toBeInstanceOf(Object);
    })
});