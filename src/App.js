import { useState, useEffect } from 'react';
import routes from './routes';
import MapView from './MapView';
import AutoComplete from './AutoComplete';
import './App.css';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [options, setOptions] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [filter, setFilter] = useState('fastest');
  const [selectedOption, setSelectedOption] = useState(null);
  const [locating, setLocating] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('mapbrace-history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveHistory = (from, to) => {
    const entry = { from, to };
    const updated = [entry, ...history.filter(h => h.from !== from || h.to !== to)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('mapbrace-history', JSON.stringify(updated));
  };

  const handleSearch = (customFrom, customTo) => {
    const f = customFrom || from;
    const t = customTo || to;
    const normalize = (str) => str.toLowerCase().trim();
    const exactMatch = routes.find(r => {
      const fromMatch = normalize(r.from).includes(normalize(f)) || normalize(f).includes(normalize(r.from));
      const toMatch = normalize(r.to).includes(normalize(t)) || normalize(t).includes(normalize(r.to));
      return fromMatch && toMatch;
    });

    if (exactMatch) {
      setOptions(exactMatch.options);
      setSelectedOption(exactMatch.options[0]);
      setNotFound(false);
      saveHistory(f, t);
    } else {
      setOptions([]);
      setSelectedOption(null);
      setNotFound(true);
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setOptions([]);
    setSelectedOption(null);
    setNotFound(false);
  };

  const handleLocate = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFrom(`My Location (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
        setLocating(false);
      },
      () => {
        alert('Could not get location. Please allow location access.');
        setLocating(false);
      }
    );
  };

  const handleHistoryClick = (entry) => {
    setFrom(entry.from);
    setTo(entry.to);
    handleSearch(entry.from, entry.to);
  };

  const getSortedOptions = () => {
    if (!options.length) return [];
    return [...options].sort((a, b) => {
      const totalA = a.legs.reduce((s, l) => s + (filter === 'fastest' ? l.duration : l.cost), 0);
      const totalB = b.legs.reduce((s, l) => s + (filter === 'fastest' ? l.duration : l.cost), 0);
      return totalA - totalB;
    });
  };

  const totalCost = selectedOption ? selectedOption.legs.reduce((s, l) => s + l.cost, 0) : 0;
  const totalTime = selectedOption ? selectedOption.legs.reduce((s, l) => s + l.duration, 0) : 0;

  return (
    <div className="App">
      <div className="header">
        <div className="logo">🗺️</div>
        <h1>MapBrace</h1>
        <p>Navigate Dhaka's transport like a local</p>
      </div>

      <div className="search-box">
        <div className="location-row">
          <AutoComplete
            placeholder="From (e.g. Mirpur 10)"
            value={from}
            onChange={setFrom}
          />
          <button className="gps-btn" onClick={handleLocate} disabled={locating}>
            {locating ? '...' : '📍'}
          </button>
        </div>

        <div className="swap-row">
          <div className="swap-line" />
          <button className="swap-btn" onClick={handleSwap}>⇅ Swap</button>
          <div className="swap-line" />
        </div>

        <AutoComplete
          placeholder="To (e.g. Dhanmondi 27)"
          value={to}
          onChange={setTo}
        />
        <button onClick={() => handleSearch()}>Find Route</button>
      </div>

      {history.length > 0 && options.length === 0 && !notFound && (
        <div className="history">
          <p className="history-title">Recent Searches</p>
          {history.map((entry, i) => (
            <div key={i} className="history-item" onClick={() => handleHistoryClick(entry)}>
              <span>📍 {entry.from}</span>
              <span className="arrow">→</span>
              <span>📍 {entry.to}</span>
            </div>
          ))}
        </div>
      )}

      {notFound && (
        <p className="not-found">
          No route found. Try: Mirpur 10 → Dhanmondi 27
        </p>
      )}

      {options.length > 0 && (
        <div className="result">
          <div className="filter-row">
            <span>Sort by:</span>
            <button
              className={filter === 'fastest' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('fastest')}
            >
              ⚡ Fastest
            </button>
            <button
              className={filter === 'cheapest' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('cheapest')}
            >
              💰 Cheapest
            </button>
          </div>

          <div className="options-list">
            {getSortedOptions().map((opt, i) => {
              const cost = opt.legs.reduce((s, l) => s + l.cost, 0);
              const time = opt.legs.reduce((s, l) => s + l.duration, 0);
              return (
                <div
                  key={i}
                  className={`option-card ${selectedOption === opt ? 'selected' : ''}`}
                  onClick={() => setSelectedOption(opt)}
                >
                  <strong>{opt.label}</strong>
                  <span>⏱ {time} mins &nbsp;|&nbsp; ৳{cost}</span>
                </div>
              );
            })}
          </div>

          {selectedOption && (
            <>
              <MapView legs={selectedOption.legs} />
              <h2>Journey Details</h2>
              <p>Total Time: {totalTime} mins | Total Cost: ৳{totalCost}</p>
              {selectedOption.legs.map((leg, i) => (
                <div key={i} className="leg">
                  <h3>Step {i + 1} — {leg.mode}</h3>
                  <p>{leg.from} → {leg.to}</p>
                  <p>⏱ {leg.duration} mins | ৳ {leg.cost}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;