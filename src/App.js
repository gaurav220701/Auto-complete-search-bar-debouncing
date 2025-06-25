import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [inputData, setInputData] = useState();
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  setTimeout(() => {});
  const fetchData = async () => {
    const data = await fetch(
      "https://dummyjson.com/recipes/search?q=" + inputData
    );
    const dataJson = await data.json();
    setData(dataJson.recipes);
  };
  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [inputData]);
  return (
    <div className="App">
      <h1>AutoComplete Search Bar</h1>
      <div>
        <input
          type="text"
          value={inputData}
          placeholder="Search here"
          onChange={(e) => setInputData((prev) => e.target.value)}
          onFocus={() => setShowData(true)}
          onBlur={() => setShowData(false)}
        />
      </div>
      {showData && inputData && (
        <div className="search-list">
          {inputData &&
            data.map((d) => {
              return (
                <div className="each-items" key={d.id}>
                  <div className="items">{d.name}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
