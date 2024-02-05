# Project Olympus - Fintech Backend System Implementation

### ⚠️ **Important: Please Read Introduction Before Proceeding To Setup**
**Skipping directly to the setup section without a comprehensive understanding of the preceding content may lead to misunderstandings about the functionalities and design principles**

## Introduction

This project implements a backend system for a fintech application designed to facilitate financial transactions between users.

It is built using Node.js and TypeScript, employing a hybrid of **Hexagonal Architecture Pattern** and a **Domain-Driven Design Principle**. 
The system features 
- user registration and authentication, 
- automatic wallet creation,
- transaction processing with idempotency, and
- transaction history.

For **real-time notifications**, it utilizes an **Event-Driven Architecture** with Kafka, and data persistence is managed through a relational database with Prisma. Email functionalities are tested using Mailhog.

### Hexagonal Architecture

Hexagonal Architecture, also known as **Ports and Adapters Architecture**, allows for the decoupling of application logic from external services like Kafka for messaging, Mailhog for email testing, Prisma as an ORM, and the specific choice of NestJS as the framework.

This decoupling ensures that we could decide to replace *NestJs* with vanilla *ExpressJs*, the core application remains unaffected. Or, should the need arise to switch from *Kafka* to an internal *EventBus* or *RabbitMQ*, or from *Prisma* to *TypeORM*, these changes can be made with minimal impact on the business logic.

It divides the application into inside and outside parts. The inside part comprises the application's core logic (domain), while the outside part contains all the ways the outside world communicates with the application (ports and adapters/infrastructure).

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js (preferably the latest LTS version)

### Starting the Application

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sarps/olympus
   cd olympus
   ```

2. **Environment Configuration**

   Create a `.env` file at the root of the project directory using a provided sample:
    
    ```bash
   cp .env.example .env
    ```

3. **Docker Compose**

   Use Docker Compose to start the services defined in your `docker-compose.yml` file:

   ```bash
   docker-compose up -d
   ```

   This command starts all required services, including a Postgres database, a Kafka instance, and a Mailhog server.

4. **Application Setup**

   Install dependencies and run migrations:

   ```bash
   npm install
   npx prisma migrate dev
   ```

## Testing Instructions

### Automated Tests

Run automated tests to ensure everything is set up correctly:

```bash
npm run test
```

### Manual Testing

1. **Mailhog**

   Access the Mailhog web interface at `http://localhost:8025` to verify that emails (e.g., verification emails) are being sent successfully.

2. **Starting the Application**

   Run the application using:

   ```bash
   npm run start
   ```
3. **Swagger UI**

    Explore the API and perform manual testing through the Swagger UI available at http://localhost:3000/swagger.html. This interface provides a comprehensive and interactive documentation of all the endpoints, allowing you to execute requests directly from your browser without the need for additional tools like Postman or cURL.

4. **Kafka Consumer**

   To test real-time notifications, use a Kafka consumer tool to listen to the topic your application publishes notifications on.

