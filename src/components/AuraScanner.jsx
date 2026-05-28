import React, { useState, useMemo } from 'react';
import { shopProducts } from '../data/catalog';

const auraGoals = [
  {
    id: 'wealth',
    label: 'Wealth & Career',
    color: 'from-[#2a9d8f] via-[#0f766e] to-[#f2b84b]',
    glowColor: 'rgba(42, 157, 143, 0.4)',
    scoreCalc: (dir) => (['N', 'NE', 'E'].includes(dir) ? 92 : 55),
    analysis: 'Your career quadrant is influenced heavily by the flow of elemental water. Activating the North or Northeast with high-vibration crystals will clear bottlenecks and attract new financial opportunities.',
    suggestedTags: ['Abundance', 'Wealth Luck', 'Clear Quartz'],
  },
  {
    id: 'health',
    label: 'Health & Sleep',
    color: 'from-[#9b6a3b] via-[#d85d3f] to-[#7c6a9c]',
    glowColor: 'rgba(216, 93, 63, 0.4)',
    scoreCalc: (dir) => (['SW', 'S', 'W'].includes(dir) ? 95 : 60),
    analysis: 'Physical and emotional regeneration depends heavily on the grounding Southwest earth quadrant. A stable, heavy energy source here ensures deep sleep, low stress, and robust vitality.',
    suggestedTags: ['Calm', 'Crown Chakra', 'Peaceful'],
  },
  {
    id: 'love',
    label: 'Love & Family',
    color: 'from-[#d85d3f] via-[#f2b84b] to-[#7c6a9c]',
    glowColor: 'rgba(242, 184, 75, 0.4)',
    scoreCalc: (dir) => (['SW', 'E', 'NW'].includes(dir) ? 88 : 65),
    analysis: 'Harmony within relationships is governed by the soft wind and earth currents in the Southwest and Northwest zones. Placing loving and protective stones here invites warmth and clear communications.',
    suggestedTags: ['Love', 'Bedroom', 'Family'],
  },
  {
    id: 'focus',
    label: 'Focus & Meditation',
    color: 'from-[#0f766e] via-[#7c6a9c] to-[#274c77]',
    glowColor: 'rgba(124, 106, 156, 0.4)',
    scoreCalc: (dir) => (['NE', 'N', 'W'].includes(dir) ? 96 : 70),
    analysis: 'Your mental clarity and spiritual intuition are rooted in the pure, quiet channels of the Northeast. Clearing heavy items and positioning focusing stones here activates the higher mind and supports deep learning.',
    suggestedTags: ['Mala', 'Third Eye', 'Focus'],
  },
];

const directions = [
  { id: 'N', label: 'North' },
  { id: 'NE', label: 'Northeast' },
  { id: 'E', label: 'East' },
  { id: 'SE', label: 'Southeast' },
  { id: 'S', label: 'South' },
  { id: 'SW', label: 'Southwest' },
  { id: 'W', label: 'West' },
  { id: 'NW', label: 'Northwest' },
];

const AuraScanner = () => {
  const [selectedDir, setSelectedDir] = useState('N');
  const [selectedGoal, setSelectedGoal] = useState('wealth');
  const [isScanning, setIsScanning] = useState(false);

  const activeGoal = useMemo(() => {
    return auraGoals.find((g) => g.id === selectedGoal);
  }, [selectedGoal]);

  const score = useMemo(() => {
    return activeGoal.scoreCalc(selectedDir);
  }, [selectedDir, activeGoal]);

  // Find products that match tags
  const matchedProducts = useMemo(() => {
    return shopProducts.filter((product) =>
      product.tags.some((tag) => activeGoal.suggestedTags.includes(tag))
    ).slice(0, 2);
  }, [activeGoal]);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  return (
    <section className="py-20 bg-[#111715] text-[#fffaf2] relative overflow-hidden border-t border-[#f2b84b]/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#0f766e]/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="section-shell px-4">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#f2b84b] text-xs font-extrabold uppercase tracking-[0.2em] block mb-3">
            State-Of-The-Art Energy Audit
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Interactive Aura & Vastu Diagnostic Portal
          </h2>
          <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">
            Align your home's physical entrance alignment with your sub-conscious desires. Shift options in real-time to preview your energetic score.
          </p>
        </div>

        {/* Portal Core Layout */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          
          {/* Controls & Metrics Panel */}
          <div className="space-y-8 bg-white/5 border border-white/10 p-6 md:p-8 rounded-[16px] backdrop-blur-md">
            {/* Step 1: Direction */}
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#f2b84b] mb-4">
                1. Select Main Entrance Direction
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {directions.map((dir) => (
                  <button
                    key={dir.id}
                    onClick={() => {
                      setSelectedDir(dir.id);
                      triggerScan();
                    }}
                    className={`py-2 px-1 text-xs font-extrabold rounded-[8px] border transition-all ${
                      selectedDir === dir.id
                        ? 'bg-[#f2b84b] text-[#111715] border-[#f2b84b]'
                        : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className="hidden sm:inline">{dir.id} ({dir.label})</span>
                    <span className="sm:hidden">{dir.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Goal */}
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#f2b84b] mb-4">
                2. Choose Personal Energy Goal
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {auraGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => {
                      setSelectedGoal(goal.id);
                      triggerScan();
                    }}
                    className={`py-3 px-2 text-xs font-extrabold rounded-[8px] border transition-all text-center leading-tight ${
                      selectedGoal === goal.id
                        ? 'bg-white text-[#111715] border-white'
                        : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Diagnostic Metrics */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-white/70">Vastu Compatibility Score</span>
                <span className="text-3xl font-black font-display text-white">
                  {isScanning ? '--' : `${score}%`}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 bg-gradient-to-r ${activeGoal.color}`}
                  style={{ width: isScanning ? '10%' : `${score}%` }}
                ></div>
              </div>

              {/* Dynamic Analysis Message */}
              <p className="text-xs md:text-sm text-white/70 leading-relaxed pt-2">
                {isScanning ? 'Recalculating directional frequencies...' : activeGoal.analysis}
              </p>
            </div>
          </div>

          {/* Interactive Aura Orb & Products Recommendation */}
          <div className="flex flex-col items-center justify-center space-y-8">
            
            {/* Pulsing Aura Orb */}
            <div className="relative h-64 w-64 md:h-80 md:w-80 flex items-center justify-center">
              {/* Glowing Aura Ring Background */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-tr ${
                  activeGoal.color
                } opacity-50 blur-[60px] animate-pulse transition-all duration-700`}
                style={{
                  boxShadow: `0 0 100px 20px ${activeGoal.glowColor}`,
                }}
              ></div>

              {/* Outer Cosmic Ring */}
              <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none">
                <div className="absolute top-0 left-1/2 h-2.5 w-2.5 bg-[#f2b84b] rounded-full -translate-x-1/2"></div>
              </div>

              {/* Inner Glowing Core */}
              <div
                className={`h-48 w-48 md:h-56 md:w-56 rounded-full bg-gradient-to-br ${
                  activeGoal.color
                } shadow-[inset_0_4px_30px_rgba(255,255,255,0.2)] border border-white/30 flex flex-col items-center justify-center text-center transition-all duration-700 ${
                  isScanning ? 'scale-90 rotate-90 opacity-60' : 'scale-100'
                }`}
              >
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#111715] bg-white/90 px-2 py-0.5 rounded-full mb-1">
                  Active Aura
                </span>
                <span className="text-xl md:text-2xl font-black text-[#111715] leading-tight font-display px-4">
                  {isScanning ? 'Scanning...' : activeGoal.label}
                </span>
              </div>
            </div>

            {/* Smart Crystals Recommendations */}
            <div className="w-full space-y-3">
              <h4 className="text-xs font-extrabold text-[#f2b84b] uppercase tracking-wider text-center">
                Remedial Crystals For Your Diagnostic
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {matchedProducts.map((prod) => (
                  <div
                    key={prod.name}
                    className="bg-white/5 border border-white/10 rounded-[12px] p-3 flex items-center gap-3"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-12 w-12 rounded-[6px] object-cover bg-white/10"
                    />
                    <div className="min-w-0 flex-grow">
                      <h5 className="text-xs font-bold truncate text-white">{prod.name}</h5>
                      <span className="text-[10px] text-[#f2b84b] font-black">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AuraScanner;
