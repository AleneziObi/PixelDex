import React from 'react'

export default function GenreCard({ genre, onSelect, onCompareToggle, comparing }) {
  return (
    <article className={`card ${comparing ? "card--selected" : ""}`}>
      <div className="card__head">
        <div className="emoji">{genre.emoji}</div>
        <div className="card__meta">
          <h3 className="card__title">{genre.name}</h3>
          <p className="card__desc">{genre.description}</p>
        </div>
      </div>
      <div className="card__footer">
        <div className="examples">Examples: {genre.examples.join(", ")}</div>
        <div className="card__actions">
          <button className="btn btn--primary" onClick={() => onOpen(genre)}>Open</button>
          <button className={`btn btn--ghost ${comparing ? "btn--accent" : ""}`} onClick={() => onToggleCompare(genre)}>
            {comparing ? "Remove" : "Compare"}
          </button>
        </div>
      </div>
    </article>
  )
}
