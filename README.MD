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

1.  **Clone:** `git clone <your-repo-url>`
2.  **Backend:**
    - `cd backend`
    - `npm install`
    - Create `.env` file (see `.env.example` if provided, or docs) and add `ETHERSCAN_API_KEY=YOUR_KEY`.
    - `npm run dev` (starts on port 5001 by default)
3.  **Frontend:**
    - `cd ../frontend`
    - `npm install`
    - `npm run dev` (starts on port 5173 by default)
4.  **Access:** Open `http://localhost:5173` (or the port shown) in your browser.

## Next Steps

- Support multiple addresses.
- Fetch ERC-20 token balances.
