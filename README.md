# Project Olympus - Fintech Backend System Implementation

### ⚠️ **Important: Please Read Introduction Before Proceeding To Setup**

**Skipping directly to the setup section without a comprehensive understanding of the preceding content may lead to
misunderstandings about the functionalities and design principles**

## Introduction

This project implements a backend system for a fintech application designed to facilitate financial transactions between
users.

It is built using Node.js and TypeScript, employing a hybrid of **Hexagonal Architecture Pattern** and a **Domain-Driven
Design Principle**.
The system features

- user registration and authentication,
- automatic wallet creation,
- transaction processing with idempotency, and
- transaction history.

For **real-time notifications**, it utilizes an **Event-Driven Architecture** with Kafka, and data persistence is
managed through a relational database with Prisma. Email functionalities are tested using Mailhog.

### Hexagonal Architecture

Hexagonal Architecture, also known as **Ports and Adapters Architecture**, allows for the decoupling of application
logic from external services like Kafka for messaging, Mailhog for email testing, Prisma as an ORM, and the specific
choice of NestJS as the framework.

This decoupling ensures that if we should decide to replace *NestJs* with vanilla *ExpressJs*, the core application
remains unaffected. Or, should the need arise to switch from *Kafka* to an internal *EventBus* or *RabbitMQ*, or from
*Prisma* to *TypeORM*, these changes can be made with minimal impact on the business logic.

It divides the application into inside and outside parts. The inside part comprises the application's core logic (
domain), while the outside part contains all the ways the outside world communicates with the application (ports and
adapters/infrastructure).

![Hexagonal Architecture](docs/assets/hexagonal.jpg?raw=true)

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js (preferably the latest LTS version)

### Getting Ready For Tests

1. Clone the Repository
   ```bash
   git clone https://github.com/Sarps/olympus
   cd olympus
   ```

2. Create a `.env` file at the root of the project directory using a provided sample:
    ```bash
   cp .env.example .env
    ```

3. Use Docker Compose to start the services defined in your `docker-compose.yml` file:
   ```bash
   docker-compose up -d
   ```
   This command starts all required services, including a Postgres database, a Kafka instance, and a Mailhog server.

   
4. Install dependencies and run migrations:
   ```bash
   npm install
   npx prisma migrate dev
   ```

5. Run the automated tests to ensure everything is set up correctly:
   ```bash
   npm run test
   ```

### Testing The Flows

- Starting the application with
   ```bash
   npm run start
   ```
   A Swagger UI available at http://localhost:3000/swagger.html.



#### Flow 1 (User Registering and Login)

- Make API call to create user

```http request
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@email.com",
  "password": "ZL4IW90N7Wsn3IC!",
  "passwordConfirmation": "ZL4IW90N7Wsn3IC!"
}
```

- Verify user is created by logging in (Copy the access token from the login for the verification step)

```http request
GET http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "ZL4IW90N7Wsn3IC!",
}
```

Note: At this point, user is able to fetch profile but is unable to check balance or make transactions until verified

#### Flow 2 (User Verification)

- Access the Mailhog web interface at `http://localhost:8025` to confirm that the verification email was received.

- Using the OTP in the mail, make an API call to verify user (*replace <otp> with the actual in the email and <access_token> with the token from login above*)

```http request
POST http://localhost:3000/users/verify
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "pin": "<otp>"
}
```

- Conversely, click on the link from the email to simply verify

Note: At this point, a wallet will be created for the use in with currency defaulted to "USD" with an intial balance of 1000 for test purposes

#### Flow 3 (Wallet Balance)

- Make an API call to get user balance (*replace <access_token> with the token from login*)

```http request
GET http://localhost:3000/users/balance
Content-Type: application/json
Authorization: Bearer <access_token>
```

#### Flow 4 (Initiate Transaction)

- For transaction posting, 2 users are required. Hence we'll create another user for the purpose of the test

#### Flow 5 (Transaction History)

- Make an API call to get user transaction history (*replace <access_token> with the token from login*)

```http request
GET http://localhost:3000/transactions
Content-Type: application/json
Authorization: Bearer <access_token>
```

## Potential Improvements

1. **Token Hashing / Encryption**: For added security, the OTP should be hashed before persisting into database just as was done for the password and verification done on the hash (This was skipped this in the interest of time)
2. **Transaction Signing / Certification**: Implement digital signing of transactions to ensure data integrity and validity. Each transaction could be signed using the private key of the sender, and the signature can be verified using the public key.
3. **Service Health Metrics / Monitoring**: For observability and high availability's, a metrics endpoint must be exposed to monitor service health and all dependent infrastructure stack
4. **Logging and Audit Trails**: Because this service handles financial transactions, it is important that there is a comprehensive audit trail for all user actions
4. **API Gateway & Load Balancer Integration**: Use an API Gateway to manage and secure access to the backend service. This can provide benefits like rate limiting, API version management and CORS handling in a centralized manner and make it easier to scale and maintain the system

