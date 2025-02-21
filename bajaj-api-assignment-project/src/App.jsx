import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [filterOptions, setFilterOptions] = useState(['numbers', 'alphabets', 'highest_alphabet']);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      JSON.parse(jsonData);
      const res = await axios.post('https://bajaj-assignment-4gp5.onrender.com/bfhl', JSON.parse(jsonData));
      setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "API Error");
      } else if (error.request) {
        setErrorMessage("Network Error. Could not reach the server.");
      } else {
        setErrorMessage("Invalid JSON or other error: " + error.message);
      }
    }
  };

  const handleFilterChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedFilters(selected);
  };

  const displayFilteredResults = () => {
    if (!response) return null;

    return selectedFilters.map(filter => (
      <div key={filter}>
        {filter}: {Array.isArray(response[filter]) ? response[filter].join(',') : response[filter]}
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Your API</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={jsonData} onChange={(e) => setJsonData(e.target.value)} placeholder="Paste JSON data here"></textarea><br />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {response && (
        <div className="response-container"> {/* Added a class here */}
          <h2>Response:</h2>
          <select multiple value={selectedFilters} onChange={handleFilterChange}>
            {filterOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="filtered-results"> {/* Added a class here */}
            {displayFilteredResults()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
