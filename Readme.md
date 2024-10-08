# Restaurant Backend API

This project is a backend API for a restaurant application built using Node.js, Express.js, and MongoDB. The API supports various endpoints to manage products, menus, carts, and orders. It includes comprehensive logging, error handling, and API documentation with Swagger.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Environment Variables](#environment-variables)
-   [Logging](#logging)
-   [Error Handling](#error-handling)
-   [WebSockets](#websockets)
-   [Swagger Documentation](#swagger-documentation)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Safi198/Restaurant-backend.git
    cd restaurant-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following variables:

    ```dotenv
    PORT=3000
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=my_secret_key
    NODE_ENV=development
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

## Usage

Once the server is running, you can access the API at `http://localhost:3000`.

## API Endpoints

-   **Get All Products**

    -   **URL**: `/api/products`
    -   **Method**: `GET`
    -   **Response**:
        ```json
        [
            {
                "_id": "product_id",
                "name": "Product Name",
                "description": "Product Description",
                "category": "Product Category",
                "price": 100,
                "image": "image_url",
                "rating": 0,
                "numReviews": 0
            }
        ]
        ```

-   **Get Product by ID**

    -   **URL**: `/api/products/:id`
    -   **Method**: `GET`
    -   **Response**:
        ```json
        {
            "_id": "product_id",
            "name": "Product Name",
            "description": "Product Description",
            "category": "Product Category",
            "price": 100,
            "image": "image_url",
            "rating": 0,
            "numReviews": 0
        }
        ```

-   **Create New Product**

    -   **URL**: `/api/products`
    -   **Method**: `POST`
    -   **Body**:
        ```json
        {
            "name": "Product Name",
            "description": "Product Description",
            "category": "Product Category",
            "price": 100,
            "image": "image_url"
        }
        ```
    -   **Response**:
        ```json
        {
            "_id": "new_product_id",
            "name": "Product Name",
            "description": "Product Description",
            "category": "Product Category",
            "price": 100,
            "image": "image_url",
            "rating": 0,
            "numReviews": 0
        }
        ```

-   **Register User**

    -   **URL**: `/api/auth/register`
    -   **Method**: `POST`
    -   **Body**:
        ```json
        {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "password123"
        }
        ```
    -   **Response**:
        ```json
        {
            "_id": "user_id",
            "name": "John Doe",
            "email": "john@example.com",
            "isAdmin": false,
            "token": "jwt_token"
        }
        ```

-   **Login User**
    -   **URL**: `/api/auth/login`
    -   **Method**: `POST`
    -   **Body**:
        ```json
        {
            "email": "john@example.com",
            "password": "password123"
        }
        ```
    -   **Response**:
        ```json
        {
            "_id": "user_id",
            "name": "John Doe",
            "email": "john@example.com",
            "isAdmin": false,
            "token": "jwt_token"
        }
        ```

## Environment Variables

-   `PORT`: The port on which the server runs.
-   `MONGO_URI`: MongoDB connection string.
-   `JWT_SECRET`: Secret key for JWT authentication.
-   `NODE_ENV`: Node environment (development or production).

## Logging

Winston and Morgan are used for logging requests and errors.

-   Combined logs: `logs/combined.log`
-   Error logs: `logs/error.log`

## Error Handling

A global error handler is implemented to catch and respond to errors consistently.

## WebSockets

WebSocket support is provided for real-time notifications. The WebSocket server is set up in `sockets/notificationSocket.js`.

## Swagger Documentation

API documentation is available at `/api-docs`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
