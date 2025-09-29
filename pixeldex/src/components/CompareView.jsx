import React from 'react'

const SUB_DESC = {
  "JRPG": "Turn-based/party-driven RPGs from Japan; emphasis on story & progression.",
  "WRPG": "Choice-driven RPGs with open builds and player agency.",
  "Tactical RPG": "Grid/turn tactics (e.g., Fire Emblem, XCOM-style).",
  "2D Platformer": "Side-scrolling jumps, precise movement & level challenges.",
  "3D Platformer": "Free-roaming jump puzzles and collectibles.",
  "Puzzle Platformer": "Platforming focused on logic mechanics (switches, physics).",
  "FPS": "First-person shooting; gunplay & reflexes.",
  "TPS": "Third-person shooting; camera behind the character.",
  "Hero Shooter": "Ability-based team shooter with defined roles.",
  "RTS": "Real-time strategy: build, expand, command in real time.",
  "TBS": "Turn-based strategy: plan moves in turns.",
  "4X": "eXplore, eXpand, eXploit, eXterminate—grand strategy scope.",
  "Traditional Roguelike": "Grid/turn dungeon crawls with permadeath, procedural runs.",
  "Roguelite": "Run-based progression with meta-upgrades; lighter permanence.",
  "Immersive Sim": "Systemic stealth/action; multiple solutions (gadgets, paths).",
  "Action Stealth": "Stealth core with more direct combat options.",
  "Tactical Stealth": "Planning-heavy stealth with strict detection rules.",
  "Exploration Platformer": "Large interconnected maps with ability gating.",
  "Soulslike-MV": "Metroidvania structure with soulslike combat/challenge.",
  "Theme Park": "MMO with guided progression and set activities.",
  "Sandbox MMO": "Player-driven economies, systems, and open goals.",
  "Action MMO": "Real-time combat focus in a persistent world.",
  "VR Rhythm": "Beat-matching in VR; body movement + timing.",
  "Action Rhythm": "Timing to music with enemies/obstacles.",
  "Music Puzzle": "Puzzles structured around musical patterns.",
  "Kinetic Novel": "Visual novel without choices; pure story experience.",
  "Otome": "Romance-focused VN, usually from a female POV.",
  "Branching Narrative": "Choices lead to multiple routes/endings.",
  "Character Action": "Combo-heavy, expressive combat (high skill ceiling).",
  "Hack & Slash": "Fast melee action vs groups; flashy moves.",
  "Action-Adventure": "Action plus exploration/puzzles & light RPG elements.",
  "Graphic Adventure": "Narrative scenes with choices & light puzzles.",
  "Point-and-Click": "Classic inventory puzzles and dialogue trees.",
  "Exploration Adventure": "Traversal & discovery over heavy combat.",
  "Survival Horror": "Scarce resources, tension, vulnerability.",
  "Psychological Horror": "Mind-bending themes; dread over jump scares.",
  "Action Horror": "Horror atmosphere with stronger combat tools.",
  "Arcade Racing": "Accessible handling, boost, pick-up-and-play.",
  "Sim Racing": "Realistic physics, tuning, licensed tracks.",
  "Kart Racing": "Weapons, power-ups, tight cornering.",
  "Minigame Collection": "Short competitive/co-op microgames.",
  "Co-op Chaos": "Coordinated tasks devolving into hilarious chaos.",
  "Trivia/Party": "Quiz/party prompts for groups.",
}

const explain = (name) => SUB_DESC[name] || "Common style within the genre; varies by game."

export default function CompareView({ selected = [], onClear, onCopy, onExport }) {
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

                  {/* Subgenre explanations */}
                  <ul className="sublist">
                    {(g.subgenres ?? []).map((s) => (
                      <li key={s} className="subitem">
                        <span className="subitem__name">{s}</span>
                        <span className="subitem__desc">{explain(s)}</span>
                      </li>
                    ))}
                  </ul>
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
              navigator.clipboard.writeText(selected.map((s) => s.name).join(", "));
            }
          }}
          disabled={empty}
          title={empty ? "Select genres first" : "Copy selected genre names"}
        >
          Copy Names
        </button>

        {onExport && (
          <button className="btn btn--primary" onClick={onExport} disabled={empty}>
            Export
          </button>
        )}

        <button className="btn btn--ghost" onClick={onClear} disabled={empty}>
          Clear
        </button>
      </div>
    </aside>
  )
}

