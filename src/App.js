import { useState } from 'react';
import routes from './routes';
import MapView from './MapView';
import './App.css';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [options, setOptions] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [filter, setFilter] = useState('fastest');
  const [selectedOption, setSelectedOption] = useState(null);
  const [locating, setLocating] = useState(false);

  const handleSearch = () => {
    const normalize = (str) => str.toLowerCase().trim();
    const match = routes.find(r =>
      normalize(r.from).includes(normalize(from)) ||
      normalize(from).includes(normalize(r.from)) &&
      normalize(r.to).includes(normalize(to)) ||
      normalize(to).includes(normalize(r.to))
    );

    const exactMatch = routes.find(r => {
      const fromMatch = normalize(r.from).includes(normalize(from)) || normalize(from).includes(normalize(r.from));
      const toMatch = normalize(r.to).includes(normalize(to)) || normalize(to).includes(normalize(r.to));
      return fromMatch && toMatch;
    });

    if (exactMatch) {
      setOptions(exactMatch.options);
      setSelectedOption(exactMatch.options[0]);
      setNotFound(false);
    } else {
      setOptions([]);
      setSelectedOption(null);
      setNotFound(true);
    }
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
      <h1>MapBrace</h1>
      <p>Find your way across Dhaka</p>

      <div className="search-box">
        <div className="location-row">
          <input
            type="text"
            placeholder="From (e.g. Mirpur 10)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <button className="gps-btn" onClick={handleLocate} disabled={locating}>
            {locating ? '...' : '📍'}
          </button>
        </div>
        <input
          type="text"
          placeholder="To (e.g. Dhanmondi 27)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button onClick={handleSearch}>Find Route</button>
      </div>

      {notFound && (
        <p style={{ color: 'red', marginTop: '16px' }}>
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