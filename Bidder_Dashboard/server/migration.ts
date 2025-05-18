import { runMigrations } from "./database";

// Run migrations when the script is executed
(async () => {
  try {
    console.log("Starting database migrations...");
    await runMigrations();
    console.log("✅ Migrations completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
})();