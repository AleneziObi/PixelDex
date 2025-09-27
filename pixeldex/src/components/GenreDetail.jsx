import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function GenreDetail({ genre, onClose, onAddCompare }) {
  if (!genre) return null
  const data = Object.entries(genre.popularity).map(([decade, val]) => ({ decade, val }))
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold">{genre.emoji} {genre.name}</h2>
            <p className="text-gray-600 mt-1">{genre.description}</p>
            <div className="mt-3 text-sm">Examples: {genre.examples.join(', ')}</div>
            <div className="mt-3">
              <button onClick={() => onAddCompare(genre)} className="px-3 py-1 rounded bg-yellow-400">Add to compare</button>
            </div>
          </div>
          <div>
            <button onClick={onClose} className="text-sm text-gray-600">Close ✕</button>
          </div>
        </div>

        <div className="mt-6 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="decade" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="val" stroke="#6366F1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}
