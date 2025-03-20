import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import QRCodeGenerator from "./QRCodeGenerator";

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [history, setHistory] = useState([]);

  const handleShorten = async () => {
    if (!longUrl) return;
    try {
      const response = await fetch("YOUR_BACKEND_API/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
      setHistory([{ longUrl, shortUrl: data.shortUrl }, ...history]);
      setLongUrl("");
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen w-screen flex flex-col items-center fixed top-1 left-0">
      {/* Navbar */}
      <nav className="w-full flex justify-between py-4 px-6 fixed top-0 left-0 bg-gray-900 shadow-md z-10">
        <h1 className="text-2xl font-bold">URL Shortener</h1>
        <div className="space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Home</a>
          <a href="#" className="text-gray-400 hover:text-white">QR Code Generator</a>
          <a href="#" className="text-gray-400 hover:text-white">Stats</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-24 w-full px-6 flex flex-col items-center">
        <h2 className="text-4xl font-bold">Best Free URL Shortener: Track & Optimize Links</h2>
        <p className="mt-2 text-gray-400">Shorten links for free and manage them with ease.</p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-lg mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter link here"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 p-3 border border-gray-600 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            onClick={handleShorten}
          >
            Shorten URL
          </button>
        </div>
        {shortUrl && (
          <div className="mt-4 p-3 border rounded-lg bg-gray-700 text-center flex justify-between items-center">
            <a href={shortUrl} className="text-blue-400 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button onClick={() => copyToClipboard(shortUrl)} className="text-gray-300 hover:text-white">
              <FaCopy />
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center bg-gray-800 mt-12 p-10 rounded-lg">
        <div className="md:w-1/2 text-left">
          <h3 className="text-3xl font-bold">A fast, easy, and free link shortener</h3>
          <p className="mt-4 text-gray-400">Use this free URL shortener to change long, ugly links into memorable and trackable short URLs.</p>
          <h4 className="mt-6 text-2xl font-semibold">Shorten links, then track them</h4>
          <p className="mt-2 text-gray-400">Free short links for any social media platform, website, SMS, email, ads, and more.</p>
        </div>
        <div className="md:w-1/2 flex flex-col items-center mt-6 md:mt-0">
          <p className="text-white font-semibold">Experience the <span className="font-bold">benefits of link management</span> for your business</p>
          <div className="mt-4 flex space-x-4">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">Try Now</button>
            <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition">Learn More</button>
          </div>
        </div>
      </div>

    </div>
  );
}
