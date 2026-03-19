import { AppDataSource } from "../core/database-config";
import { Product } from "../entity/product.entity";
import { Category } from "../entity/category.entity"; // Import Category
import { faker } from '@faker-js/faker';

AppDataSource.initialize()
    .then(async connection => {
        // 1. Get all available categories
        const categories = await Category.find();

        if (categories.length === 0) {
            console.error("No categories found! Please run the category seeder first.");
            process.exit(1);
        }

        for (let i = 0; i < 30; i++) {
            // 2. Pick a random category from the list
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];

            await Product.save({
                title: faker.commerce.productName(), // Use commerce for better titles
                description: faker.lorem.words(20),
                image: faker.image.abstract(200, 200, true),
                price: parseFloat(faker.commerce.price(10, 1000)), // Better price generation
                category: randomCategory // TypeORM handles the categoryId automatically
            });
        }

        console.log("30 Products seeded successfully with categories!");
        process.exit(0);
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });