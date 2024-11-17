// api/Tickets/fakeData.js
import { connectToMongoDB, getMongoClient } from "../../../../lib/mongo";  // Đảm bảo có kết nối MongoDB
import { faker } from "@faker-js/faker";

const generateFakeTickets = (numTickets = 20) => {
  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Development",
    "Project",
  ];

  const tickets = [];
  for (let i = 0; i < numTickets; i++) {
    tickets.push({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      priority: faker.number.int({ min: 1, max: 5 }),
      progress: faker.number.int({ min: 0, max: 100 }),
      status: faker.helpers.arrayElement(["not started", "in progress", "completed", "on hold"]),
      category: faker.helpers.arrayElement(categories),
    });
  }

  return tickets;
};

// Chèn fake dữ liệu vào MongoDB
export async function POST(request) {
  try {
    await connectToMongoDB();

    const client = getMongoClient();
    const db = client.db("TicketDB"); // Tên database
    const collection = db.collection("tickets"); // Tên collection

    // Sinh dữ liệu giả
    const fakeTickets = generateFakeTickets(20);

    // Chèn dữ liệu vào MongoDB
    const result = await collection.insertMany(fakeTickets);

    return new Response(
      JSON.stringify({ message: `Inserted ${result.insertedCount} tickets into the database.` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting fake tickets:", error);
    return new Response("Error inserting fake tickets", { status: 500 });
  }
}
