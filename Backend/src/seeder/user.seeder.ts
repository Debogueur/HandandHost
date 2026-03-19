import { AppDataSource } from "../core/database-config";
import { User } from "../entity/user.entity";
import { Role } from "../entity/role.entity";
import bcryptjs from "bcryptjs";

AppDataSource.initialize()
    .then(async () => {
        // 1. Get the roles we created in the previous seeder
        const adminRole = await Role.findOne({ where: { name: 'Admin' } });
        const editorRole = await Role.findOne({ where: { name: 'Editor' } });
        const viewerRole = await Role.findOne({ where: { name: 'Viewer' } });

        if (!adminRole || !editorRole || !viewerRole) {
            console.error("Roles not found! Please run the Role seeder first.");
            process.exit(1);
        }

        // 2. Hash a default password
        const password = await bcryptjs.hash("12341234", 10);

        // 3. Create Admin User
        await User.save({
            first_name: 'Admin',
            last_name: 'User',
            email: 'admin@test.com',
            password: password,
            role: adminRole
        });

        // 4. Create Editor User
        await User.save({
            first_name: 'Editor',
            last_name: 'User',
            email: 'editor@test.com',
            password: password,
            role: editorRole
        });

        // 5. Create Viewer User
        await User.save({
            first_name: 'Viewer',
            last_name: 'User',
            email: 'viewer@test.com',
            password: password,
            role: viewerRole
        });

        console.log("Users seeded successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.log("Error seeding users:", error);
        process.exit(1);
    });