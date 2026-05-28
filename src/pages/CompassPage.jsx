import React from 'react';
import CompassInteractive from '../components/CompassInteractive';

const CompassPage = () => {
  return (
    <>
      <section className="ink-panel py-16 text-center">
        <div className="section-shell">
          <p className="eyebrow text-[#f2b84b]">Direction intelligence</p>
          <h1 className="mx-auto mt-3 max-w-4xl font-display text-5xl font-bold leading-none sm:text-7xl">
            Explore the eight Vastu directions without the confusion.
          </h1>
        </div>
      </section>
      <CompassInteractive compact />
    </>
  );
};

export default CompassPage;
