import { AppDataSource } from "../core/database-config";
import { Home } from "../entity/home.entity";

AppDataSource.initialize()
    .then(async () => {
        // 1. Create Main Parent Categories
        const electronics = await Home.save({
            V_DigitalFile: 'electronics.jpg',
            V_ImageAlt: 'Electronics'
        });

        const fashion = await Home.save({
            V_DigitalFile: 'fashion.jpg',
            V_ImageAlt: 'Fashion'
        });

       

        console.log("Categories seeded successfully with hierarchy!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error seeding categories:", error);
        process.exit(1);
    });