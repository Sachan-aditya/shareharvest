# ShareHarvest

ShareHarvest is a community-driven platform designed to connect people for sharing surplus food, resources, or harvest from gardens and farms. Our mission is to reduce waste, foster sustainable living, and build stronger communities through collaborative resource sharing.  
![ShareHarvest Screenshot](https://github.com/Sachan-aditya/SHAREHARVEST/blob/master/Screenshot%202025-04-27%20140647.png)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
ShareHarvest enables users to list, discover, and exchange surplus resources like homegrown vegetables, canned goods, or unused pantry items. Whether you're a gardener with extra tomatoes or someone looking to share a meal, ShareHarvest makes it easy to connect with your community. The platform uses modern web technologies, including a React frontend, Spring Boot backend, and MySQL database, ensuring a seamless experience across devices.

## Features
- **Resource Listing**: Post surplus items with descriptions, photos, and pickup details.
- **Community Search**: Find available resources in your local area using geolocation or manual search.
- **User Profiles**: Build trust with verified profiles, sharing history, and community ratings.
- **Messaging System**: Communicate directly with other users to coordinate exchanges securely.
- **Sustainability Tracker**: Monitor your impact, including metrics like reduced waste or carbon footprint savings.
- **Mobile-Friendly Design**: Access ShareHarvest on any device with a responsive interface.

## Installation
To run ShareHarvest locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sachan-aditya/SHAREHARVEST.git
   cd SHAREHARVEST
   ```

2. **Set Up the Backend (Spring Boot)**:
   - Ensure you have [Java 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) and [MySQL](https://www.mysql.com/) installed.
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create a MySQL database:
     ```sql
     CREATE DATABASE shareharvest;
     ```
   - Configure `src/main/resources/application.properties`:
     ```
     spring.datasource.url=jdbc:mysql://localhost:3306/shareharvest?useSSL=false&serverTimezone=UTC
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     spring.jpa.hibernate.ddl-auto=update
     server.port=8083
     ```
   - Start the backend:
     ```bash
     ./mvnw spring-boot:run
     ```

3. **Set Up the Frontend (React)**:
   - Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed.
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend/frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the frontend directory:
     ```
     VITE_API_URL=http://localhost:8083
     API_KEY=your_api_key_here
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```
   - Open `http://localhost:5173` in your browser.

4. **Optional: Run with Docker**:
   - Ensure [Docker](https://www.docker.com/) is installed.
   - Use the provided `docker-compose.yml` to start both services:
     ```bash
     docker-compose up --build
     ```
   - Access the app at `http://localhost:5173` and backend at `http://localhost:8083`.

## Usage
1. **Sign Up**: Create an account using your email or social media login to start sharing or browsing resources.
2. **List an Item**: Navigate to the "Share" section, add details about your surplus item (e.g., type, quantity, condition), and upload a photo.
3. **Browse Resources**: Use the search bar or map view to find items available in your area.
4. **Connect**: Send a message to the lister to arrange pickup or delivery details.
5. **Track Impact**: Visit your profile to view your sharing history and sustainability metrics, such as pounds of food saved from waste.

For a live demo, visit [ShareHarvest Demo](https://shareharvest-frontend.vercel.app).

## Contributing
We welcome contributions from the community! To contribute:

1. **Fork the Repository**: Click the "Fork" button on the [ShareHarvest GitHub page](https://github.com/Sachan-aditya/SHAREHARVEST).
2. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Changes**: Implement your feature, bug fix, or documentation improvement.
4. **Commit Changes**:
   ```bash
   git commit -m "Add your feature description"
   ```
5. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**: Submit your changes for review via GitHub.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For inquiries, reach out via [GitHub Issues](https://github.com/Sachan-aditya/SHAREHARVEST/issues) or email at [your-email@example.com](mailto:your-email@example.com).

Join us in building a more sustainable future with ShareHarvest!
