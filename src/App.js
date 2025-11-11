import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("https://localhost:5000/api/text/improve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    setResult(await res.text());
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1>AI Text Polisher 🧠</h1>
      <textarea value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Improve</button>
      <pre>{result}</pre>
    </div>
  );
}