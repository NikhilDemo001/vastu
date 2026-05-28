import React, { useState } from 'react';

const directions = [
  {
    name: 'North',
    short: 'N',
    degree: 0,
    element: 'Water',
    tone: '#0f766e',
    benefits: 'Career momentum, opportunity flow, and financial clarity.',
    recommendations: ['Keep this zone open and bright', 'Use reflective or metal accents', 'Avoid heavy storage'],
  },
  {
    name: 'Northeast',
    short: 'NE',
    degree: 45,
    element: 'Water',
    tone: '#2a9d8f',
    benefits: 'Wisdom, prayer, meditation, and mental calm.',
    recommendations: ['Best for meditation or study', 'Keep the area light and quiet', 'Avoid toilets or bulky furniture'],
  },
  {
    name: 'East',
    short: 'E',
    degree: 90,
    element: 'Air',
    tone: '#6a994e',
    benefits: 'Health, family movement, beginnings, and morning energy.',
    recommendations: ['Use plants and fresh airflow', 'Good for entrances or living rooms', 'Let natural light lead here'],
  },
  {
    name: 'Southeast',
    short: 'SE',
    degree: 135,
    element: 'Fire',
    tone: '#f2b84b',
    benefits: 'Cooking, vitality, drive, and productive heat.',
    recommendations: ['Ideal for kitchen planning', 'Use warm lighting', 'Keep water features away from fire points'],
  },
  {
    name: 'South',
    short: 'S',
    degree: 180,
    element: 'Fire',
    tone: '#d85d3f',
    benefits: 'Visibility, confidence, leadership, and recognition.',
    recommendations: ['Use intentional lighting', 'Display awards or identity markers', 'Avoid water-heavy decor'],
  },
  {
    name: 'Southwest',
    short: 'SW',
    degree: 225,
    element: 'Earth',
    tone: '#9b6a3b',
    benefits: 'Stability, sleep, commitment, and grounded relationships.',
    recommendations: ['Best for master bedroom', 'Use heavier furniture here', 'Prefer earthy textures and symmetry'],
  },
  {
    name: 'West',
    short: 'W',
    degree: 270,
    element: 'Earth',
    tone: '#274c77',
    benefits: 'Creativity, completion, gains, and future planning.',
    recommendations: ['Good for dining or creative work', 'Keep storage organized', 'Use balanced, calm colors'],
  },
  {
    name: 'Northwest',
    short: 'NW',
    degree: 315,
    element: 'Air',
    tone: '#7c6a9c',
    benefits: 'Support, networking, movement, guests, and travel.',
    recommendations: ['Works well for guest rooms', 'Keep ventilation strong', 'Avoid overly fixed heavy layouts'],
  },
];

const CompassInteractive = ({ compact = false }) => {
  const [selectedDirection, setSelectedDirection] = useState(directions[0]);

  return (
    <section className={compact ? 'py-8' : 'py-20'}>
      <div className="section-shell">
        {!compact && (
          <div className="mb-10 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="eyebrow">Interactive compass</p>
              <h2 className="mt-3 font-display text-5xl font-bold leading-none">
                A directional instrument, not a diagram.
              </h2>
            </div>
            <p className="max-w-2xl leading-8 text-[#68736d] md:justify-self-end">
              Explore each Vastu zone with practical recommendations you can apply while planning or improving a room.
            </p>
          </div>
        )}

        <div className="grid overflow-hidden rounded-[8px] border border-[#111715]/10 bg-[#fffaf2] shadow-[0_24px_70px_rgba(17,23,21,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="lapis-panel relative grid min-h-[560px] place-items-center overflow-hidden p-5">
            <div className="absolute inset-0 opacity-20 rule-grid" />
            <div className="relative aspect-square w-full max-w-[520px]">
              <div
                className="absolute inset-0 rounded-full border border-white/20 shadow-[0_34px_90px_rgba(0,0,0,0.24)]"
                style={{
                  background:
                    'conic-gradient(from -22.5deg, rgba(15,118,110,0.9), rgba(42,157,143,0.9), rgba(106,153,78,0.9), rgba(242,184,75,0.92), rgba(216,93,63,0.9), rgba(155,106,59,0.9), rgba(39,76,119,0.9), rgba(124,106,156,0.9), rgba(15,118,110,0.9))',
                }}
              />
              <div className="absolute inset-[13%] rounded-full bg-[#111715]/80 backdrop-blur-sm" />
              <div className="absolute inset-[27%] rounded-full border border-white/20 bg-[#fffaf2] shadow-2xl" />
              <div
                className="absolute inset-[27%] rounded-full transition-transform duration-500"
                style={{ transform: `rotate(${selectedDirection.degree}deg)` }}
              >
                <div className="absolute left-1/2 top-6 h-[39%] w-1.5 -translate-x-1/2 rounded-full bg-[#d85d3f]" />
              </div>

              {directions.map((dir) => {
                const radius = 42;
                const angle = (dir.degree - 90) * (Math.PI / 180);
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                const isSelected = selectedDirection.name === dir.name;
                return (
                  <button
                    key={dir.name}
                    onClick={() => setSelectedDirection(dir)}
                    className={`absolute grid h-10 w-10 text-xs -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[8px] border font-extrabold transition sm:h-16 sm:w-16 sm:text-sm ${
                      isSelected
                        ? 'scale-110 border-[#f2b84b] bg-[#f2b84b] text-[#111715] shadow-xl'
                        : 'border-white/20 bg-white/20 text-white hover:scale-105 hover:bg-white/30'
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    aria-label={`Show ${dir.name} direction`}
                  >
                    {dir.short}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Selected zone</p>
                <h3 className="mt-3 font-display text-6xl font-bold leading-none">{selectedDirection.name}</h3>
              </div>
              <span
                className="grid h-16 w-16 place-items-center rounded-[8px] text-xl font-extrabold text-white shadow-lg"
                style={{ backgroundColor: selectedDirection.tone }}
              >
                {selectedDirection.short}
              </span>
            </div>
            <div className="mt-6 inline-flex rounded-[8px] bg-[#111715]/10 px-4 py-2 text-sm font-extrabold text-[#31403a]">
              Element: {selectedDirection.element}
            </div>
            <p className="mt-6 text-xl leading-9 text-[#68736d]">{selectedDirection.benefits}</p>
            <div className="mt-8 grid gap-3">
              {selectedDirection.recommendations.map((item, index) => (
                <div key={item} className="grid grid-cols-[42px_1fr] gap-3 rounded-[8px] border border-[#111715]/10 bg-white/70 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-[8px] text-sm font-extrabold text-white" style={{ backgroundColor: selectedDirection.tone }}>
                    {index + 1}
                  </span>
                  <span className="font-semibold leading-6 text-[#31403a]">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CompassInteractive;
