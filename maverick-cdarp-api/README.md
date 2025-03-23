# Website Accessibility API

This the Maverick Crowdsourced Digital Accessibility Reporting Platform (CDARP) project - a website accessibility rating application.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js:** (Version 14 or higher recommended) - [https://nodejs.org/](https://nodejs.org/)
* **npm:** (Installed with Node.js)
* **MongoDB:** (Community Server) - [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
* **Git:** (Optional, for cloning the repository) - [https://git-scm.com/downloads](https://git-scm.com/downloads)

## Installation and Setup

### 1. Clone the Repository (Optional)

If you are using Git, clone the repository to your local machine:

```bash
git clone <repository_url>
cd website-accessibility-api
```

### 2. Install Dependencies

Navigate to the project directory in your terminal and install the required npm packages:

```bash
npm install express mongoose dotenv body-parser bcryptjs jsonwebtoken express-validator winston swagger-ui-express yamljs
```

### 3. Set up MongoDB

Linux (Ubuntu/Debian):

```bash
sudo apt-get update
sudo apt-get install mongodb
sudo systemctl start mongod
```

Linux (Fedora/CentOS):

```bash
sudo yum install mongodb
sudo systemctl start mongod
```

macOS (Homebrew):

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Windows:

1.  Download and install MongoDB Community Server from the official website.
2.  Add the MongoDB bin directory to your system's PATH environment variable.
3.  Create a data directory (e.g., C:\data\db).
4.  Open a command prompt as administrator and run:

```bash
mongod --dbpath "C:\data\db"
(Replace "C:\data\db" with your actual data directory path.)
```

### Start the Server

Run the following command to start the Node.js server:

```bash
npm start
```

The server will start running on the specified port (default: 3000).

## Usage

Once the server is running, you can access the API endpoints using a tool like Postman, curl, or any other HTTP client.

* **Example:** `http://localhost:3000/api/reports` (to be replaced with actual endpoints)
* **Example:** `http://localhost:3000/auth/register` (for user registration)
* **Example:** `http://localhost:3000/auth/login` (for user login)

## Important Notes

* Ensure MongoDB is running before starting the Node.js server.
* If you encounter any issues, check the console for error messages.
* This README provides basic setup instructions. For detailed information about the API endpoints, request bodies, response formats, and authentication requirements, please refer to the API documentation available at `http://localhost:3000/api-docs`.
* The database information is stored in the /data/db folder.
* Do not store the database in the project directory when pushing to version control.