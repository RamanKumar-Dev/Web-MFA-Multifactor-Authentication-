🛡️ SecurePlay: MFA-Protected Tic-Tac-Toe

A modern web application demonstrating Two-Factor Authentication (2FA) using Email/Password and Mobile OTP simulation. The application unlocks a Tic-Tac-Toe game only after successful multi-stage verification.
🚀 Features

    Dual-Stage Authentication:

        Standard Email/Password login.

        6-digit Mobile OTP verification (Simulated via Server Terminal).

    Attractive UI: A responsive, dark-themed "Glassmorphism" interface built with CSS backdrop-filters.

    Session Security: User IDs are managed via localStorage to ensure persistence between auth stages.

    Interactive Dashboard: A fully functional Tic-Tac-Toe game unlocked post-verification.

    Secure Backend: Password hashing using bcryptjs and MongoDB integration.

🛠️ Tech Stack

    Frontend: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)

    Backend: Node.js, Express.js

    Database: MongoDB (via Mongoose)

    Security: Bcrypt.js (Hashing), Simulated SMS Logic

📂 Project Structure
Plaintext

mfa-tic-tac-toe/
├── config/             # Database & Environment configuration
├── models/             # Mongoose Schemas (User)
├── routes/             # API Endpoints (Auth, OTP)
├── public/             # Frontend Files
│   ├── index.html      # Unified Login/Register/OTP UI
│   ├── dashboard.html  # Tic-Tac-Toe Game
│   └── css/            # Stylesheets
├── server.js           # Entry point
└── .env                # Secret variables (MongoDB URI)

⚙️ Installation & Setup

    Clone the Repository
    Bash

    git clone https://github.com/yourusername/mfa-project.git
    cd mfa-project

    Install Dependencies
    Bash

    npm install

    Environment Setup
    Create a .env file in the root directory and add your MongoDB URI:
    Code snippet

    MONGO_URI=mongodb://localhost:27017/mfa_db
    PORT=3000

    Run the Application
    Bash

    node server.js

🎮 How to Use

    Create Account: Use the "Create One" link on the home page to register your email.

    Login: Enter your credentials.

    OTP Verification:

        After login, the UI will switch to the OTP screen.

        Check your VS Code/Terminal console. You will see a box containing your 6-digit code.

        Enter the code in the UI.

    Play: Enjoy the Tic-Tac-Toe game!

📝 Security Highlights

    OTP Expiry: Codes are valid for only 5 minutes.

    One-Time Use: OTPs are cleared from the database immediately after successful verification.

    Data Integrity: Passwords are never stored in plain text.
