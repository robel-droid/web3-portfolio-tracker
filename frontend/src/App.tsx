import { useState, ChangeEvent, KeyboardEvent } from "react";
import axios, { AxiosError } from "axios";
import "./App.css";

interface BalanceData {
  address: string;
  balanceWei: string;
  balanceEth: string;
}

interface ApiErrorResponse {
  message: string;
  details?: any;
}

function App() {
  const [address, setAddress] = useState<string>("");
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    setBalanceData(null);
    setError(null);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleFetchBalance();
    }
  };

  const handleFetchBalance = async () => {
    if (!address.trim()) {
      setError("Please enter an Ethereum address.");
      return;
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(address.trim())) {
      setError("Invalid Ethereum address format.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setBalanceData(null);

    try {
      const response = await axios.get<BalanceData>(
        `/api/balance/${address.trim()}`
      );
      setBalanceData(response.data);
    } catch (err) {
      console.error("Error fetching balance:", err);
      let errorMessage = "Failed to fetch balance.";

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.message
        ) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.message) {
          errorMessage = axiosError.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setBalanceData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Simple Web3 Portfolio Tracker (TS)</h1>
      <p>Enter an Ethereum address to check its ETH balance.</p>

      <div className="input-container">
        <input
          type="text"
          value={address}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter Ethereum Address (e.g., 0x...)"
          disabled={isLoading}
          aria-label="Ethereum Address Input"
        />
        <button
          onClick={handleFetchBalance}
          disabled={isLoading || !address.trim()}
          aria-live="polite"
        >
          {isLoading ? "Checking..." : "Check Balance"}
        </button>
      </div>

      <div className="results-container">
        {isLoading && (
          <p className="loading-message" role="status">
            Loading balance...
          </p>
        )}
        {error && (
          <p className="error-message" role="alert">
            Error: {error}
          </p>
        )}
        {balanceData && !isLoading && !error && (
          <div className="balance-info">
            <p>
              <strong>Address:</strong> {balanceData.address}
            </p>
            <p>
              <strong>Balance:</strong>{" "}
              <strong>{balanceData.balanceEth} ETH</strong>
            </p>
            <p>
              <small>(Wei: {balanceData.balanceWei})</small>
            </p>
          </div>
        )}
        {!isLoading && !error && !balanceData && (
          <p className="loading-message">
            Enter an address and click "Check Balance".
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
