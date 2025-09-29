import React, { useState, useMemo, useRef } from "react";
import SearchBar from "./components/SearchBar";
import GenreCard from "./components/GenreCard";
import GenreDetail from "./components/GenreDetail";
import CompareView from "./components/CompareView";
import genres from "./data/genres.json";

export default function App() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("az"); // az | za | popAsc | popDesc
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [compare, setCompare] = useState([]);
  const exportRef = useRef(null);

  const popularityScore = (g) => {
    Object.values(g.popularity || {}).reduce((sum, v) => sum + Number(v ||0), 0);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let arr = genres.filter((g) => {
      const inName = g.name.toLowerCase().includes(q);
      const inExamples = (g.examples || []).join(" ").toLowerCase().includes(q);
      const inSubs = (g.subgenres || []).join(" ").toLowerCase().includes(q);
      return q === "" || inName || inExamples || inSubs;
    });

    switch (sort) {
      case "az":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "popAsc":
        arr.sort((a, b) => (popularityScore(a) || 0) - (popularityScore(b) || 0));
        break;
      case "popDesc":
        arr.sort((a, b) => (popularityScore(b) || 0) - (popularityScore(a) || 0));
        break;
      default:
        break;
    }

    return arr;
  }, [query, sort]);

  function toggleCompare(g) {
    setCompare((prev) => {
      if (prev.find((p) => p.id === g.id)) return prev.filter((p) => p.id !== g.id);
      if (prev.length >= 2) return [prev[1], g];
      return [...prev, g];
    });
  }

  function clearCompare() {
    setCompare([]);
  }

  return (
    <div className="app-root">
      <header className="header">
        <div>
          <div className="logo">PixelDex</div>
          <div className="tag">Explore game genres • Frontend demo</div>
        </div>
        <div className="header-actions">
          <button className="btn btn--ghost">About</button>
          <button className="btn btn--ghost">GitHub</button>
        </div>
      </header>

      <main className="main">
        <div className="main-left">
          <div className="controls">
            <SearchBar 
              value={query}  
              onChange={setQuery} 
              sort={sort} 
              onSortChange={setSort} />
          </div>

          <div className="grid">
            {filtered.length === 0 ? (
              <div style={{ opacity: .08, padding:'24px', border:'1px dashed rgba(255,255,255,.15)', borderRadius:'12'}}>
                No matches. Try a different search or sort.
              </div>
            ) : (
              filtered.map((g) => (
                <GenreCard
                  key={g.id}
                  genre={g}
                  onSelect={(genre) => setSelectedGenre(genre)}
                  onCompareToggle={toggleCompare}
                  comparing={!!compare.find((c) => c.id === g.id)}
                />
              ))
            )}
          </div>
        </div>

        <div className="main-right">
          <div className="sticky" ref={exportRef}>
            <CompareView 
              selected={compare} 
              onClear={clearCompare} 
              onCopy={() => { 
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(compare.map((s) => s.name).join(", "));
                }
              }}
            />
          </div>
        </div>
      </main>

      <footer className="footer">Made by Alenezio — PixelDex</footer>

      <GenreDetail
        genre={selectedGenre}
        onClose={() => setSelectedGenre(null)}
        onAddCompare={(g) => toggleCompare(g)}
      />
    </div>
  );
}

