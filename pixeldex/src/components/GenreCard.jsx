import React from 'react'
import { motion } from 'framer-motion'

const cardVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.995 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } }
}

export default function GenreCard({ genre, onSelect, onCompareToggle, comparing }) {
  return (
    <motion.article
        className="bg-white rounded-x1 shadow p-4 flex flex-col gap-3"
        cariants={cardVariants}
        initial="hidden"
        animate="enter"
        whileHover={{ translateY: -6, boxShadow: '0 10px 25px rgba(15,23,42,0.12)', scale: 1.02 }}
        whileTap={{ scale: 0.995}}
        layout
        >
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
    </motion.article>
  )
}
