import { AppDataSource } from "../core/database-config";
import { Order } from "../entity/order.entity";
import { OrderItem } from "../entity/order-item.entity";
import { faker } from "@faker-js/faker";

AppDataSource.initialize()
    .then(async () => {
        // 1. Fetch existing orders to link items to
        const orders = await Order.find();

        if (orders.length === 0) {
            console.error("No orders found! Please run the Order seeder first.");
            process.exit(1);
        }

        const orderItems: OrderItem[] = [];

        // 2. Loop through orders and add 2-5 items to each
        for (const order of orders) {
            const itemCount = faker.datatype.number({ min: 2, max: 5 });

            for (let i = 0; i < itemCount; i++) {
                const item = new OrderItem();
                item.product_title = faker.commerce.productName();
                item.price = parseFloat(faker.commerce.price(10, 100)); // Random price between 10-100
                item.quantity = faker.datatype.number({ min: 1, max: 10 });
                item.order = order; // Link to the current order

                orderItems.push(item);
            }
        }

        // 3. Bulk save for better performance
        await OrderItem.save(orderItems);

        console.log(`Successfully seeded ${orderItems.length} order items across ${orders.length} orders!`);
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error seeding order items:", error);
        process.exit(1);
    });