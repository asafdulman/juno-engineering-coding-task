////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

const DAYS_COUNT = 14

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    const orders = ids.map(async id => {
        const order = await fetchOrderById(id)
        return order
    })
    return Promise.all(orders)
};

const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    const orders = await fetchAllOrders()
    orders.map(order => {
        const { userId } = order
        ordersByUsers[userId] = ordersByUsers[userId] ?? [];
        ordersByUsers[userId].push(order);
        return ordersByUsers;
    }, ordersByUsers)
    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    const orders = await fetchAllOrders()
    const twoWeeksTimestamp = DAYS_COUNT * 24 * 60 * 60 * 1000
    const currentDate = Date.now()
    const lastTwoWeeksOrders = orders.filter(order => {
        const timeDifference = currentDate - order.timestamp
        return timeDifference < twoWeeksTimestamp
    })
    return lastTwoWeeksOrders
};

export const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    const orders = await getLast2WeeksOrders()
    orders.map(order => {
        let orderDate = new Date(order.timestamp)
        orderDate = formatDate(orderDate)
        ordersByDate[orderDate] = ordersByDate[orderDate] ?? [];
        ordersByDate[orderDate].push(order);
        return ordersByDate;
    }, ordersByDate)
    return ordersByDate;
};

export const formatDate = (date) => {
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    const year = date.getFullYear()
    const formatedDate = `${day}/${month}/${year}`
    return formatedDate
}

fetchAllOrders()
    .then((data) => console.log('fetchAllOrders:', data))
    .catch((error) => console.log(error));

bucketOrdersByUsers()
    .then((data) => console.log('bucketOrdersByUsers:', data))
    .catch((error) => console.log(error));

getLast2WeeksOrders()
    .then((data) => console.log('getLast2WeeksOrders:', data))
    .catch((error) => console.log(error));

bucketOrdersByDate()
    .then((data) => console.log('bucketOrdersByDate:', data))
    .catch((error) => console.log(error));