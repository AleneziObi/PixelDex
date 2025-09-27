import React from 'react'

export default function SearchBar({ value, onChange, filter, onFilterChange }) {
  return (
    <div className="flex gap-3 items-center">
      <input
        className="flex-1 p-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Search genres or examples..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <select
        value={filter}
        onChange={e => onFilterChange(e.target.value)}
        className="p-2 rounded-md border border-gray-200 bg-white"
      >
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
