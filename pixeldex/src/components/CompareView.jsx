import React from 'react'

export default function CompareView({
  selected = [],
  onClear,
  onCopy,
  onExport,
}) {
  const empty = !selected || selected.length === 0

  return (
    <aside className="compare">
      <div className="compare__title">Comparison</div>

      {empty ? (
        <div className="text-muted">No genres selected. Click "Compare" on cards.</div>
      ) : (
        <div className="compare__list">
          {selected.map((g) => (
            <div key={g.id} className="compare__item">
              <div className="compare__left">
                <div className="emoji small">{g.emoji}</div>
                <div>
                  <div className="compare__name">{g.name}</div>
                  <div className="compare__subs">{(g.subgenres ?? []).join(", ")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="compare__actions">
        <button 
          className="btn btn--primary" 
          onClick={() => { 
            if (onCopy) onCopy(); 
            else if (navigator.clipboard) {
              navigator.clipboard.writeText(selected.map(s => s.name).join(", "))
            } 
          }}
          disabled={empty}
          title={ empty ? "Select genres fisrt" : "Copy selected genre name"}
        >
          Copy Names
        </button>
        { onExport && (
          <button className="btn btn--primary" onClick={onExport} disabled={empty}>
            Export
          </button>
            
        )}
        <button className="btn btn--ghost" onClick={onClear} disabled={empty}>Clear</button>
      </div>
    </aside>
  )
}
