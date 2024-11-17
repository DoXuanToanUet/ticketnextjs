// lib/generateTickets.js
import { faker } from '@faker-js/faker';

const generateRandomTicket = () => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    priority: faker.number.int({ min: 1, max: 5 }),
    progress: faker.number.int({ min: 0, max: 100 }),
    status: faker.helpers.arrayElement(["not started", "in progress", "completed", "on hold"]),
    category: faker.helpers.arrayElement(["Hardware Problem", "Software Problem", "Application Development", "Project"]),
  };
};

const generateTickets = (numTickets = 10) => {
  const tickets = [];
  for (let i = 0; i < numTickets; i++) {
    tickets.push(generateRandomTicket());
  }
  return tickets;
};

export default generateTickets;
