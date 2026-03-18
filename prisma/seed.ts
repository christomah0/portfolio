import { auth } from "../lib/auth";

const DEFAULT_ADMIN = {
  email: "admin@portfolio.local",
  username: "admin",
  password: "Admin@1234",
  name: "Admin",
};

async function seed() {
  console.log("Seeding default admin user...");

  try {
    // Check if admin already exists
    const existingUser = await auth.api.signInUsername({
      body: {
        username: DEFAULT_ADMIN.username,
        password: DEFAULT_ADMIN.password,
      },
    });

    if (existingUser) {
      console.log("Admin user already exists, skipping.");
      return;
    }
  } catch {
    // User doesn't exist yet — proceed to create
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: DEFAULT_ADMIN.email,
        password: DEFAULT_ADMIN.password,
        name: DEFAULT_ADMIN.name,
        username: DEFAULT_ADMIN.username,
      },
    });
  } catch (err) {
    // If user already exists, this is fine
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("already") || message.includes("exist")) {
      console.log("Admin user already exists, skipping.");
    } else {
      console.error("Failed to create admin user:", message);
      process.exit(1);
    }
  }
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
