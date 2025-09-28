import React from 'react'

export default function GenreCard({ genre, onSelect, onCompareToggle, comparing }) {
  const covers = Array.isArray(genre.covers) ? genre.covers.slice(0,3) : []

  return (
    <article className={`card ${comparing ? "card--selected" : ""}`}>

      <div className="card__head">
        <div className="emoji">{genre.emoji}</div>
        <div className="card__meta">
          <h3 className="card__title">{genre.name}</h3>
          <p className="card__desc">{genre.description}</p>
        </div>
      </div>

      <div className="covers">
        {covers.length > 0 ? (
          covers.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${genre.name} cover ${i + 1}`}
              className="cover"
              loading="lazy"
            />
          ))
        ) : (
          <div className="covers__empty">No covers yet</div>
        )}
      </div>
      
      <div className="card__footer">
        <div className="card__actions" style={{marginLeft: 'auto'}}>
          <button className="btn btn--primary" onClick={() => onSelect?.(genre)}>Open</button>
          <button className={`btn btn--ghost ${comparing ? "btn--accent" : ""}`} onClick={() => onCompareToggle(genre)}>
            {comparing ? "Remove" : "Compare"}
          </button>
        </div>
      </div>

    </article>
  )
}
