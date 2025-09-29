import React from 'react'

export default function SearchBar({ value, onChange, sort, onSortChange }) {
  return (
    <div className="searchbar" style={{ gap: 10}}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search genres, examples, or subgenres..."
        className="search-input"
      />

      <select 
        value={sort} 
        onChange={(e) => onSortChange(e.target.value)}
        className="search-select"
        aria-label="Sort genres"
        title="Sort genres"
      >
        <option value="az">Sort: A-Z</option>
        <option value="za">Sort: Z-A</option>
        <option value="popAsc">Popularity: High to Low</option>
        <option value="popDesc">Popularity: Low to High</option>
      </select>
    </div>
  )
}
