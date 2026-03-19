import { AppDataSource } from "../core/database-config";
import { Permission } from "../entity/permission.entity";

AppDataSource.initialize()
    .then(async () => {
        // 1. Define the list of permissions for your admin panel
        const permissionsList = [
            'view_users',
            'edit_users',
            'view_roles',
            'edit_roles',
            'view_products',
            'edit_products',
            'view_orders',
            'edit_orders'
        ];

        // 2. Map the strings to Permission entities and save them
        // Using Promise.all with .save ensures they are all created
        await Promise.all(
            permissionsList.map(name => {
                return Permission.save({ name });
            })
        );

        console.log(`Successfully seeded ${permissionsList.length} permissions!`);
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error seeding permissions:", error);
        process.exit(1);
    });