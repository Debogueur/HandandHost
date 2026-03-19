import { AppDataSource } from "../core/database-config";
import { Category } from "../entity/category.entity";

AppDataSource.initialize()
    .then(async () => {
        // 1. Create Main Parent Categories
        const electronics = await Category.save({
            name: 'Electronics',
            description: 'Gadgets and devices'
        });

        const fashion = await Category.save({
            name: 'Fashion',
            description: 'Clothing and accessories'
        });

        // 2. Create Sub-Categories (Children of Electronics)
        const phones = await Category.save({
            name: 'Smartphones',
            description: 'Mobile devices',
            parent: electronics // Link to parent
        });

        const laptops = await Category.save({
            name: 'Laptops',
            description: 'Computers and notebooks',
            parent: electronics
        });

        // 3. Create Sub-Categories (Children of Fashion)
        await Category.save({
            name: 'Men Wear',
            description: 'Mens clothing',
            parent: fashion
        });

        await Category.save({
            name: 'Women Wear',
            description: 'Womens clothing',
            parent: fashion
        });

        // 4. Create Deep Nesting (Child of Smartphones)
        await Category.save({
            name: 'iPhone',
            description: 'Apple specific devices',
            parent: phones
        });

        console.log("Categories seeded successfully with hierarchy!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error seeding categories:", error);
        process.exit(1);
    });