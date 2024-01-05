import React, { useState } from 'react';
import "../css/Search.css"


const Search = () => {
  const [search,setSearch]=useState("");
  const [searchResult,setSearchResult]=useState([]);
  return (
    <div className='search1'>
        <input type="text" placeholder='Enter user' id="ip"></input>
        <div className="results">
            RESULTS
        </div>
    </div>
  )
}

export default Search