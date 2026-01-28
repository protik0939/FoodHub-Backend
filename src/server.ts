import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to DB successfully!");
    app.listen(port, () => {
      console.log(`Server running on: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("An Error Occured: ", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
