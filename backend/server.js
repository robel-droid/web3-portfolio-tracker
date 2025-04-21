import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = "https://api.etherscan.io/api";

const isValidEthereumAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

const weiToEth = (weiString) => {
  try {
    const wei = BigInt(weiString);
    const ether = wei / BigInt(10 ** 18); // Whole ETH part
    const remainder = wei % BigInt(10 ** 18); // Remainder in Wei

    // Format remainder to have leading zeros and desired precision (e.g., 6 decimals)
    const decimals = 6;
    const formattedRemainder = remainder
      .toString()
      .padStart(18, "0")
      .substring(0, decimals);

    return `${ether}.${formattedRemainder}`;
  } catch (error) {
    console.error("Error converting Wei to ETH:", error);
    return "Error"; // Or handle appropriately
  }
};

// --- Middleware ---
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // Although not strictly needed for this GET, good practice

// --- API Endpoint ---
app.get("/api/balance/:address", async (req, res) => {
  const { address } = req.params;

  // --- Security: Input Validation ---
  if (!isValidEthereumAddress(address)) {
    console.warn(`Invalid address format received: ${address}`);
    return res
      .status(400)
      .json({ message: "Invalid Ethereum address format." });
  }

  // --- Security: Check for API Key ---
  if (!ETHERSCAN_API_KEY) {
    console.error("Etherscan API key is not configured.");
    return res
      .status(500)
      .json({ message: "Server configuration error: Missing API key." });
  }

  console.log(`Fetching balance for address: ${address}`);

  try {
    const params = {
      module: "account",
      action: "balance",
      address: address,
      tag: "latest",
      apikey: ETHERSCAN_API_KEY,
    };

    const response = await axios.get(ETHERSCAN_API_URL, { params });

    // --- Handle Etherscan API Response ---
    if (response.data.status === "1") {
      // Success
      const balanceWei = response.data.result;
      const balanceEth = weiToEth(balanceWei);

      console.log(
        `Successfully fetched balance: ${balanceEth} ETH for ${address}`
      );
      res.json({
        address: address,
        balanceWei: balanceWei,
        balanceEth: balanceEth,
      });
    } else {
      // Etherscan API returned an error
      console.error(
        `Etherscan API error for ${address}:`,
        response.data.message,
        response.data.result
      );
      res.status(500).json({
        message:
          response.data.message || "Error fetching balance from Etherscan.",
        details: response.data.result,
      });
    }
  } catch (error) {
    // --- Handle Network/Request Errors ---
    console.error(`Error calling Etherscan API for ${address}:`, error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
    }
    res.status(500).json({
      message:
        "Failed to fetch balance due to internal server or network error.",
    });
  }
});

// --- Basic Root Route ---
app.get("/", (req, res) => {
  res.send("Web3 Portfolio Tracker Backend is running!");
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  if (!ETHERSCAN_API_KEY || ETHERSCAN_API_KEY === "YOUR_ETHERSCAN_API_KEY") {
    console.warn(
      "Warning: ETHERSCAN_API_KEY is not set or is using the default placeholder. Please set it in the .env file."
    );
  }
});
