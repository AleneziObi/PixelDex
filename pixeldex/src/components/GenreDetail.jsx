import React from 'react'

export default function GenreDetail({ genre, onClose, onAddCompare }) {
  if (!genre) return null;

  // --- data prep
  const entries = Object.entries(genre.popularity); // e.g. [["1980s",15],...]
  const labels = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  // chart box (viewBox 0..100 x/y), with margins for axes & labels
  const vbW = 600, vbH = 300;
  const margin = { top: 16, right: 16, bottom: 40, left: 46 };
  const cw = vbW - margin.left - margin.right;
  const ch = vbH - margin.top - margin.bottom;
  const minY = 0;
  const maxY = Math.max(100, ...values); // clamp to 100 so axis is stable

  // helpers: value -> pixel, index -> pixel
  const x = (i) => (labels.length <= 1 ? 0 : (i / (labels.length - 1)) * cw);
  const y = (v) => ch - ((v - minY) / (maxY - minY)) * ch;

  // build polyline points
  const points = values
    .map((v, i) => `${margin.left + x(i)},${margin.top + y(v)}`)
    .join(" ");

  // y-axis ticks (0..100 steps of 20)
  const yTicks = [0, 20, 40, 60, 80, 100];
  
  return (
     <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <div className="modal__title">{genre.emoji} {genre.name}</div>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="modal__body">
          <p className="modal__desc">{genre.description}</p>
          <div className="modal__examples">
            <strong>Examples:</strong> {genre.examples.join(", ")}
          </div>

          {/* Chart */}
          <div className="modal__chart" role="img" aria-label="Popularity over decades">
            <svg viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="none" className="sparkline">
              {/* axes */}
              {/* Y axis line */}
              <line
                x1={margin.left}
                y1={margin.top}
                x2={margin.left}
                y2={margin.top + ch}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                shapeRendering="crispEdges"
              />
              {/* X axis line */}
              <line
                x1={margin.left}
                y1={margin.top + ch}
                x2={margin.left + cw}
                y2={margin.top + ch}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                shapeRendering="crispEdges"
              />

              {/* Y ticks & labels */}
              {yTicks.map((t) => {
                const ty = margin.top + y(t);
                return (
                  <g key={`yt-${t}`}>
                    {/* gridline */}
                    <line
                      x1={margin.left}
                      y1={ty}
                      x2={margin.left + cw}
                      y2={ty}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      shapeRendering="crispEdges"
                    />
                    {/* tick mark */}
                    <line
                      x1={margin.left - 6}
                      y1={ty}
                      x2={margin.left}
                      y2={ty}
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* label */}
                    <text
                      x={margin.left - 10}
                      y={ty + 4}
                      fontSize="12"
                      textAnchor="end"
                      fill="rgba(255,255,255,0.85)"
                    >
                      {t}
                    </text>
                  </g>
                );
              })}

              {/* X ticks & labels */}
              {labels.map((d, i) => {
                const tx = margin.left + x(i);
                const ty = margin.top + ch;
                return (
                  <g key={`xt-${d}`}>
                    {/* tick */}
                    <line
                      x1={tx}
                      y1={ty}
                      x2={tx}
                      y2={ty + 6}
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* label */}
                    <text
                      x={tx}
                      y={ty + 20}
                      fontSize="12"
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.85)"
                    >
                      {d}
                    </text>
                  </g>
                );
              })}

              {/* axis titles */}
              <text
                x={margin.left + cw / 2}
                y={vbH - 8}
                fontSize="13"
                textAnchor="middle"
                fill="rgba(255,255,255,0.95)"
              >
                Decade
              </text>
              <text
                x={4}
                y={margin.top + ch / 2}
                fontSize="13"
                textAnchor="middle"
                fill="rgba(255,255,255,0.95)"
                transform={`rotate(-90 14 ${margin.top + ch / 2})`}
              >
                Popularity
              </text>

              {/* line series */}
              <polyline
                fill="none"
                stroke="#b388ff"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                points={points}
              />
              {/* points */}
              {values.map((v, i) => (
                <circle
                  key={`pt-${i}`}
                  cx={margin.left + x(i)}
                  cy={margin.top + y(v)}
                  r="3"
                  fill="#b388ff"
                  stroke="rgba(0,0,0,0.5)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
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

