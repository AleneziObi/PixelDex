import React from 'react'

export default function GenreDetail({ genre, onClose, onAddCompare }) {
  if (!genre) return null;
  const data = Object.entries(genre.popularity).map(([k, v]) => v);
  const max = Math.max(...data, 1);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 80}`).join(" ");
  
  return (
     <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <div className="modal__title">{genre.emoji} {genre.name}</div>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="modal__body">
          <p className="modal__desc">{genre.description}</p>
          <div className="modal__examples"><strong>Examples:</strong> {genre.examples.join(", ")}</div>

          <div className="modal__chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="sparkline">
              <polyline fill="none" stroke="#b388ff" strokeWidth="2" points={points} />
            </svg>
          </div>
        </div>

        <div className="modal__actions">
          <button className="btn btn--primary" onClick={() => { onAddCompare(genre); onClose(); }}>Add to Compare</button>
          <button className="btn btn--ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

