import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { config } from "dotenv";
import postgres  from 'postgres';
config({ path: ".env.local" });

const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient);

const main = async () => {
	try {
		await migrate(db, { migrationsFolder: "drizzle" });

		console.log("Migration completed");
    process.exit();
	} catch (error) {
		console.error("Error during migration:", error);

		process.exit(1);
	}
};

main();