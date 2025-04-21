# Simple Web3 ETH Balance Checker (React + Node.js + TS)

Fetches and displays the current ETH balance for a given public Ethereum address. Built with React (TypeScript) frontend and Node.js/Express (TypeScript) backend, utilizing the Etherscan API.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Axios
- **Backend:** Node.js, Express, TypeScript, Axios, dotenv
- **API:** Etherscan Public API

## Core Features

- Input an Ethereum address.
- Fetch the current ETH balance via the backend.
- Display the address and its ETH balance (converted from Wei).
- Basic loading and error handling.

## Setup & Run

1.  **Clone:** `git clone https://github.com/robel-droid/web3-portfolio-tracker.git`

    ```bash
    git clone https://github.com/robel-droid/web3-portfolio-tracker.git
    cd web3-portfolio-tracker
    ```

2.  **Backend Setup:**

    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - **Create Environment File:** Create a file named `.env` in the `backend` directory.
    - **Add API Key:** Inside the `.env` file, add your Etherscan API key. Get a free key from [https://etherscan.io/apis](https://etherscan.io/apis). The file content should look like this:
      ```.env
      # backend/.env
      ETHERSCAN_API_KEY=YOUR_ACTUAL_ETHERSCAN_API_KEY_HERE
      # PORT=5001 # Optional: Specify a port, defaults to 5001
      ```
      _(Replace `YOUR_ACTUAL_ETHERSCAN_API_KEY_HERE` with your real key. Ensure the `.env` file is listed in your root `.gitignore`)_
    - **Run Backend:** Start the development server:
      ```bash
      npm run dev
      ```
      _(Server runs on port 5001 by default)_

3.  **Frontend Setup:**

    - Navigate to the frontend directory (from the root):
      ```bash
      cd frontend # Or cd ../frontend if you are in backend/
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - **Run Frontend:** Start the development server:
      ```bash
      npm run dev
      ```
      _(Server runs on port 5173 by default)_

4.  **Access Application:** Open `http://localhost:5173` (or the frontend port shown) in your browser.

## Next Steps

- Support multiple addresses.
- Fetch ERC-20 token balances.
