import { useState, useEffect } from "react";

import Card from "./Card";

import { getCategories, list } from "./apiCore";

export default function Search() {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = () => {
    getCategories().then((categories) => {
      if (!!categories && categories.error) {
        console.log(categories.error);
      } else {
        setData({ ...data, categories: categories.data });
      }
    });
  };

  const searchData = () => {
    if (search) {
      debugger;
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (!!response && response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select name="btn mr-2" onChange={handleChange("category")}>
              <option value="All">Pick Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }

    if (searched && results.length === 0) {
      return `No products Found`;
    }
  };
  const searchedProducts = (results = []) => (
    <div>
      <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
      <div className="row">
        {results.map((product, index) => (
          <div key={index} className="col-4 mb-3">
            <Card product={product} showViewProductButton={true} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
}
