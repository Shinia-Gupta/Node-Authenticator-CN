# Node Authenticator

## Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Live Project](#live-project)

## Introduction

Node Authenticator is a web application that provides user authentication functionality through multiple methods, including registration/login via the site, GitHub, and Google. It also supports features like changing passwords for signed-in users and resetting passwords for users who have forgotten their passwords.

## Features

- **Registration and Login:**
  - Users can register and log in using their credentials on the site.
  - They can also use their GitHub or Google accounts for authentication.

- **Change Password:**
  - Signed-in users can change their passwords securely through the application.

- **Forgot Password:**
  - Users who have forgotten their passwords can reset them.
  - Password reset is facilitated through a one-time password (OTP) sent to the user's email.

## Technologies Used

- **Node.js:** Backend server environment.
- **Express.js:** Web application framework for Node.js.
- **Passport.js:** Authentication middleware for Node.js.
- **MongoDB:** NoSQL database for storing user information.
- **Nodemailer:** Module for sending emails for password reset.
- **GitHub OAuth:** Authentication via GitHub.
- **Google OAuth:** Authentication via Google.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Shinia-Gupta/node-authenticator-cn.git
    ```

2. Install dependencies:

    ```bash
    cd node-authenticator
    npm install
    ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the required environment variables, such as `DB_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`.

4. Run the application:

    ```bash
    npm start
    ```

## Usage

1. Navigate to the application in your web browser.
2. Register or log in using the provided options (site, GitHub, Google).
3. Upon successful login, users can change their passwords or reset them if forgotten.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Live Project
[Live](https://node-authenticator-cn.onrender.com)
