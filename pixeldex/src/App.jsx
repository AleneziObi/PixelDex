import React, { useState, useMemo, useRef } from "react";
import SearchBar from "./components/SearchBar";
import GenreCard from "./components/GenreCard";
import GenreDetail from "./components/GenreDetail";
import CompareView from "./components/CompareView";
import genres from "./data/genres.json";

export default function App() {
  const [query, setQuery] = useState("");
  const [decade, setDecade] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [compare, setCompare] = useState([]);
  const exportRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return genres.filter((g) => {
      const matchesQ =
        q === "" ||
        g.name.toLowerCase().includes(q) ||
        g.examples.join(" ").toLowerCase().includes(q) ||
        (g.subgenres || []).join(" ").toLowerCase().includes(q);
      const matchesDecade = decade === "all" || Object.keys(g.popularity).includes(decade);
      return matchesQ && matchesDecade;
    });
  }, [query, decade]);

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

  console.log('genres length =', Array.isArray(genres) ? genres.length : genres);

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
            <SearchBar value={query} onChange={setQuery} decade={decade} onDecadeChange={setDecade} />
          </div>

          <div className="grid">
            {filtered.map((g) => (
              <GenreCard
                key={g.id}
                genre={g}
                onOpen={(genre) => setSelectedGenre(genre)}
                onToggleCompare={toggleCompare}
                comparing={!!compare.find((c) => c.id === g.id)}
              />
            ))}
          </div>
        </div>

        <div className="main-right">
          <div className="sticky" ref={exportRef}>
            <CompareView selected={compare} onClear={clearCompare} onCopy={() => { navigator.clipboard && navigator.clipboard.writeText(compare.map(s => s.name).join(", ")); }} />
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

