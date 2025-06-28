# Kaliapp

Kaliapp is a simple NextJS application made during my first month at [Kaliop](https://www.kaliop.com/fr/) to learn the framework and its features. It's a quiz app where users can answer questions, see their scores and create their own quizzes.

> [!WARNING]
> This application doesn't have any backend or database, so all data is stored in memory. If you refresh the page, all data will be lost.

## Hosting

The application is hosted on my own kubernetes cluster with the following url: [https://kaliapp.baptistebronsin.be](https://kaliapp.baptistebronsin.be).

## Usage

To run the application, you need to have Node.js and npm installed on your machine. Then, follow these steps:
1. Clone the repository:
    ```bash
    git clone https://github.com/baptistebronsin/kaliapp.git
    cd kaliapp
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Open your browser and go to `http://localhost:3000`.

## Features

There are 11 quizzes available in the application. You can access them from the "Trouver un quiz" section. Each quiz has the same id structure: `QUIZ0<number>` like `QUIZ001`, `QUIZ002`, etc. You can also create your own quizzes by going to the "Créer un quiz" section. 