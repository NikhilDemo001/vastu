import React from 'react';
import ConsultationForm from '../components/ConsultationForm';

const ConsultPage = () => {
  return (
    <>
      <section className="solar-panel py-16 text-center">
        <div className="section-shell">
          <p className="eyebrow text-[#111715]">Consultation</p>
          <h1 className="mx-auto mt-3 max-w-4xl font-display text-5xl font-bold leading-none sm:text-7xl text-black">
            Start with your real floor plan, priorities, and timeline.
          </h1>
        </div>
      </section>
      <ConsultationForm compact />
    </>
  );
};

export default ConsultPage;
