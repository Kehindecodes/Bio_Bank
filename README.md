# Bio bank

## Introduction

This project provides an administrative interface for managing tissue sample collections and associated samples. It enables efficient tracking and organisation of valuable biological data for research and clinical purposes.

**Key Features:**

- **Visualise Collections:** View a comprehensive list of existing sample collections.
- **Explore Samples:** Deep dive into the details of samples associated with each collection.
- **Expand Resources:** Add new samples to existing collections.
- **Catalog New Collections:** Organize your biological data by creating new collections with ease.

## Getting Started

### Prerequisites:

To run Bio Bank locally, ensure you have the following tools installed

- Node.js(v16+)
- NPM
- MySQL

### Installation:

1. clone repository:

```bash
git clone https://github.com/Kehindecodes/Bio_Bank
```

1. Navigate to project directory:

```bash
cd Bio_Bank
```

1. Install dependencies :

```bash
npm install
```

1. Install backend and frontend dependencies :

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
cd bio-bank
npm install
```

1. Configure Database:
- Edit `server/src/services/database.config.js` with your MySQL credentials.
1.  Run Application from root folder:

```bash
npm run dev
```

This command starts both the backend server and frontend client concurrently.

## Project Structure

The project is organized into server and client folders, each with its own set of files and directories

## Backend

### Technology Used :

- Node.js
- Express.js
- Sequelize(ORM for MySQL)

### Setup:

1. Navigate to server directly

```bash
cd server
```

1. Install Dependencies

```bash
npm install
```

1. Configure database in `server/src/services/database.config.js`
2. Run backend server

```bash
npm run dev
```

### **Environment Variables:**

- `DB_HOST`: Your MySQL server hostname or IP address.
- `DB_USER`: Your MySQL username.
- `DB_PASSWORD`: Your MySQL password.
- `DB_NAME`: Your MySQL database name.

### API Endpoints:

All API responses are delivered in JSON format, with clear error codes and messages for handling unsuccessful requests

- `GET /api/v1/collections` : Retrieve a list of collections
- `POST /api/v1/collections` : Create a new collection
- `GET /api/v1/collections/:id/samples` : Retrieve samples for a specific collection
- `POST /api/v1/collections/:id/samples` : Add a new sample to a specific collection

### Testing:

Run backend test using

```bash
npm test
```

### Database Schema:

The MySQL database includes tables for **`collections`** and **`samples`**. Refer to **`server/src/models`** for the Sequelize model definitions.

## Frontend

### Technology used:

- React.js
- TailwindCSS

### Setup:

1. Navigate to frontend directory

```bash
cd client
cd bio-bank
```

1. Install dependencies

```bash
npm install
```

1. Run frontend development  server

```bash
npm run dev
```

### Folder Structure:

The **`src`** folder contains the main React components, organized into directories such as **`components`**  and **`pages`**  and it also has an  **`api`  folder too.**

### **Component Details:**

- `CollectionTable`: Dynamically displays a list of collections with sorting functionalities.
- `Pagination`: Enables users to easily navigate through pages of data when collections are numerous.
- `FormModal`: A reusable modal window used for both creating new collections and adding new samples.
- `SampleTable`: Presents a table of samples associated with a specific collection

### **State Management:**

The state is managed using React's local component state and the **`useSWR`** library for data fetching.

### **Data Validation:**

Frontend forms utilize `react-hook-form`  library  for validation to ensure accurate data entry before submitting requests.

### **Styling:**

Tailwind CSS is used for styling, and the configuration can be found in **`tailwind.config.js`**.
