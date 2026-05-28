import React from 'react';
import VastuTipsCarousel from '../components/VastuTipsCarousel';

const deepDives = [
  ['Entrance', 'Use a clean threshold, quality lighting, and a door that opens fully without obstruction.'],
  ['Kitchen', 'Separate fire and water points visually and functionally wherever the plan allows.'],
  ['Bedroom', 'Use grounding furniture placement, calm colors, and symmetry around the bed.'],
  ['Workspace', 'Face east or north when possible and keep the visual field organized.'],
];

const TipsPage = () => {
  return (
    <>
      <section className="lapis-panel py-16">
        <div className="section-shell">
          <p className="eyebrow text-[#f2b84b]">Vastu tips</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-bold leading-none sm:text-7xl">
            Practical rules for homes that need to feel better quickly.
          </h1>
        </div>
      </section>
      <VastuTipsCarousel compact />
      <section className="section-shell pb-20 pt-8">
        <div className="grid gap-4 md:grid-cols-2">
          {deepDives.map(([title, body], index) => (
            <article
              key={title}
              className={`rounded-[8px] border p-6 ${
                index === 0 ? 'border-[#111715] bg-[#111715] text-[#fffaf2]' : 'border-[#111715]/10 bg-white/75'
              }`}
            >
              <h2 className="font-display text-3xl font-bold">{title}</h2>
              <p className={`mt-3 leading-7 ${index === 0 ? 'text-white/70' : 'text-[#68736d]'}`}>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default TipsPage;
