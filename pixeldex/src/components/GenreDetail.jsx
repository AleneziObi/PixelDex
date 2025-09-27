import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
}

const panel = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, y: 8, scale: 0.995, transition: { duration: 0.18 } }
}

export default function GenreDetail({ genre, onClose, onAddCompare }) {
  return (
    <AnimatePresence>
      {genre && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* semi-opaque backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* modal panel */}
          <motion.div
            className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 mx-4"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
          >
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
                <LineChart data={Object.entries(genre.popularity).map(([decade, val]) => ({ decade, val }))} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="decade" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="val" stroke="#6366F1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

