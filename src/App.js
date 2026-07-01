import { useState } from 'react';
import routes from './routes';
import './App.css';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
  const normalize = (str) => str.toLowerCase().trim();
  const fromNorm = normalize(from);
  const toNorm = normalize(to);

  const match = routes.find(r => {
    const fromMatch = normalize(r.from).includes(fromNorm) || fromNorm.includes(normalize(r.from));
    const toMatch = normalize(r.to).includes(toNorm) || toNorm.includes(normalize(r.to));
    return fromMatch && toMatch;
  });

  if (match) {
    setResult(match);
    setNotFound(false);
  } else {
    setResult(null);
    setNotFound(true);
  }
};

  const totalCost = result ? result.legs.reduce((sum, l) => sum + l.cost, 0) : 0;
  const totalTime = result ? result.legs.reduce((sum, l) => sum + l.duration, 0) : 0;

  return (
    <div className="App">
      <h1>MapBrace</h1>
      <p>Find your way across Dhaka</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="From (e.g. Mirpur 10)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To (e.g. Dhanmondi 27)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button onClick={handleSearch}>Find Route</button>
      </div>

      {notFound && (
        <p style={{ color: 'red' }}>No route found. Try: Mirpur 10 → Dhanmondi 27</p>
      )}

      {result && (
        <div className="result">
          <h2>Your Journey</h2>
          <p>Total Time: {totalTime} mins | Total Cost: ৳{totalCost}</p>
          {result.legs.map((leg, i) => (
            <div key={i} className="leg">
              <h3>Step {i + 1} — {leg.mode}</h3>
              <p>{leg.from} → {leg.to}</p>
              <p>⏱ {leg.duration} mins | ৳ {leg.cost}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;