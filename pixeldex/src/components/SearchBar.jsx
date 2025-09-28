import React from 'react'

export default function SearchBar({ value, onChange, decade, onDecadeChange }) {
  return (
    <div className="searchbar">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search genres, examples, or subgenres..."
        className="search-input"
      />
      <select value={decade} onChange={(e) => onDecadeChange(e.target.value)} className="search-select">
        <option value="all">All decades</option>
        <option value="1980s">1980s</option>
        <option value="1990s">1990s</option>
        <option value="2000s">2000s</option>
        <option value="2010s">2010s</option>
        <option value="2020s">2020s</option>
      </select>
    </div>
  )
}
