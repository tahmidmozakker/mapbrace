import { useState } from 'react';
import locations from './locations';

function AutoComplete({ placeholder, value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    if (val.length < 2) {
      setSuggestions([]);
      return;
    }
    const filtered = locations.filter(loc =>
      loc.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSelect = (loc) => {
    onChange(loc);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => handleSelect(s)}>
              📍 {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;