import React from 'react'

export default function GenreCard({ genre, onSelect, onCompareToggle, comparing }) {
  return (
    <article className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{genre.emoji}</div>
        <div>
          <h3 className="text-lg font-semibold">{genre.name}</h3>
          <p className="text-sm text-gray-600">{genre.description}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-between mt-auto">
        <div className="text-sm text-gray-700">Examples: {genre.examples.join(', ')}</div>
        <div className="flex gap-2">
          <button onClick={() => onSelect(genre)} className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm">Open</button>
          <button onClick={() => onCompareToggle(genre)} className={`px-3 py-1 rounded-md text-sm border ${comparing ? 'bg-gray-200' : 'bg-white'}`}>
            {comparing ? 'Remove' : 'Compare'}
          </button>
        </div>
      </div>
    </article>
  )
}
