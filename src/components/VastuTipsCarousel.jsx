import React, { useEffect, useRef, useState } from 'react';

const tips = [
  {
    id: 1,
    title: 'Entrance Direction',
    area: 'Entry',
    description: 'Favor north, east, or northeast entrances, and keep the threshold bright, open, and uncluttered.',
    symbol: 'N',
  },
  {
    id: 2,
    title: 'Kitchen Placement',
    area: 'Fire',
    description: 'The southeast zone supports cooking, warmth, and daily vitality. Avoid placing water features close to the stove.',
    symbol: 'SE',
  },
  {
    id: 3,
    title: 'Bedroom Harmony',
    area: 'Rest',
    description: 'A southwest master bedroom can strengthen grounding, privacy, and long-term relationship stability.',
    symbol: 'SW',
  },
  {
    id: 4,
    title: 'Study Room Focus',
    area: 'Work',
    description: 'East and north-facing study zones support alertness, learning, and focused decision-making.',
    symbol: 'E',
  },
  {
    id: 5,
    title: 'Meditation Space',
    area: 'Calm',
    description: 'Use the northeast for prayer, meditation, or reflection. Keep it quiet, light, and visually minimal.',
    symbol: 'NE',
  },
];

const VastuTipsCarousel = ({ compact = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return undefined;
    timeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % tips.length);
    }, 5200);
    return () => window.clearTimeout(timeoutRef.current);
  }, [currentIndex, isPlaying]);

  const goToTip = (index) => {
    window.clearTimeout(timeoutRef.current);
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const currentTip = tips[currentIndex];

  return (
    <section className={compact ? 'py-8' : 'py-20'}>
      <div className="section-shell">
        {!compact && (
          <div className="mb-10 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="eyebrow">Vastu essentials</p>
              <h2 className="mt-3 font-display text-5xl font-bold leading-none">
                Five principles, designed like a decision deck.
              </h2>
            </div>
            <p className="max-w-2xl leading-8 text-[#68736d] md:justify-self-end">
              A professional Vastu plan starts with clear priorities. These core rules help you quickly understand which
              areas of a home deserve the most attention.
            </p>
          </div>
        )}

        <div className="grid overflow-hidden rounded-[8px] border border-[#111715]/10 bg-[#fffaf2] shadow-[0_24px_70px_rgba(17,23,21,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="ink-panel p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow text-[#f2b84b]">Tip selector</p>
              <button
                onClick={() => setIsPlaying((value) => !value)}
                className="rounded-[8px] border border-white/20 bg-white/10 px-4 py-2 text-sm font-extrabold text-white"
                aria-label={isPlaying ? 'Pause tips carousel' : 'Play tips carousel'}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
            <div className="mt-6 grid gap-3">
              {tips.map((tip, index) => (
                <button
                  key={tip.id}
                  onClick={() => goToTip(index)}
                  className={`grid grid-cols-[54px_1fr] items-center gap-4 rounded-[8px] border p-3 text-left transition ${
                    currentIndex === index
                      ? 'border-[#f2b84b] bg-[#f2b84b] text-[#111715]'
                      : 'border-white/10 bg-white/10 text-white hover:border-white/30 hover:bg-white/20'
                  }`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#111715] font-display text-xl font-bold text-[#fffaf2]">
                    {tip.symbol}
                  </span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.16em] opacity-70">{tip.area}</span>
                    <span className="mt-1 block font-display text-2xl font-bold leading-none">{tip.title}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <article className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-full w-2 bg-[#d85d3f]" />
            <div className="absolute bottom-0 right-8 hidden font-display text-[13rem] font-extrabold leading-none text-[#111715]/5 lg:block">
              {currentTip.symbol}
            </div>
            <div className="relative">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#d85d3f]">
                Tip {currentIndex + 1} of {tips.length}
              </p>
              <h3 className="mt-4 max-w-2xl font-display text-5xl font-bold leading-none sm:text-6xl">
                {currentTip.title}
              </h3>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#68736d]">{currentTip.description}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {tips.map((tip, index) => (
                  <button
                    key={tip.id}
                    onClick={() => goToTip(index)}
                    className={`h-3 rounded-full transition-all ${
                      currentIndex === index ? 'w-12 bg-[#0f766e]' : 'w-3 bg-[#111715]/20 hover:bg-[#0f766e]/50'
                    }`}
                    aria-label={`Go to ${tip.title}`}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default VastuTipsCarousel;
