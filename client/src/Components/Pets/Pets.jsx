import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import mycats from "../../mock/cats.json";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Pets.css";

export default function Pets() {
  const [cats, setCats] = useState([]);
  const [filters, setFilters] = useState({ favorite: "any", gender: "any" });
  const [displayedCats, setDisplayedCats] = useState([]);
  console.log(filters);
  const fetchCats = async () => {
    const response = await axios.get("http://localhost:4000/cats");
    setCats(response.data);
    setDisplayedCats(response.data);
  };
  console.log(mycats,"cats");

  useEffect(() => {
    setCats(mycats);
    setDisplayedCats(mycats);
    // fetchCats();
  }, []);

  useEffect(() => {
    let filteredCats = [...cats];
    if (filters.gender !== "any") {
      filteredCats = filteredCats.filter(
        (cat) => cat.gender === filters.gender
      );
    }
    if (filters.favorite !== "any") {
      filteredCats = filteredCats.filter(
        cat =>
          cat.favoured === (filters.favorite === "favoured" ? true : false)
      );
    }
    setDisplayedCats(filteredCats);
  }, [filters]);

  return (
    <div className="container">
      <div className="app-container">
        <Filter filters={filters} setFilters={setFilters} />
        <Cards cats={displayedCats} setCats={setCats} />
      </div>
    </div>
  );
}
