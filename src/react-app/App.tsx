// src/App.tsx

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import "./App.css";
import { fetchName, fetchGreeting } from "./services/api";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("unknown");
  const [greeting, setGreeting] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleFetchName = async () => {
    try {
      const data = await fetchName();
      setName(data.name);
    } catch (error) {
      console.error("Failed to fetch name:", error);
      setName("error");
    }
  };

  const handleFetchGreeting = async () => {
    if (!inputValue) return;
    try {
      const data = await fetchGreeting(inputValue);
      setGreeting(data.message);
    } catch (error) {
      console.error("Failed to fetch greeting:", error);
      setGreeting("Failed to get greeting");
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://hono.dev/" target="_blank">
          <img src={honoLogo} className="logo cloudflare" alt="Hono logo" />
        </a>
        <a href="https://workers.cloudflare.com/" target="_blank">
          <img
            src={cloudflareLogo}
            className="logo cloudflare"
            alt="Cloudflare logo"
          />
        </a>
      </div>
      <h1>Vite + React + Hono + Cloudflare</h1>
      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
          aria-label="increment"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <button onClick={handleFetchName} aria-label="get name">
          Name from API is: {name}
        </button>
        <p>
          Edit <code>worker/index.ts</code> to change the name
        </p>
      </div>
      <div className="card">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a name"
        />
        <button onClick={handleFetchGreeting} aria-label="get greeting">
          Get Greeting
        </button>
        {greeting && <p>{greeting}</p>}
      </div>
      <p className="read-the-docs">Click on the logos to learn more</p>
    </>
  );
}

export default App;
