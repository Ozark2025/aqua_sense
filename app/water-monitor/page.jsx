import HeaderWaterflow from '@/components/HeaderWaterflow';
import LiveMetrics from '@/components/LiveMetrics';
import PipelineFlow from '@/components/PipelineFlow';
import LegendPanel from '@/components/LegendPanel';
import FooterWave from '@/components/FooterWave';
import Header from '@/components/Header';
export default function WaterMonitor() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-shakespeare-50 via-shakespeare-100 to-shakespeare-200 relative overflow-hidden">
      {/* Animated water background overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-30 animate-water-flow bg-gradient-to-br from-shakespeare-300/20 via-aqua-teal/20 to-shakespeare-400/20"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-shakespeare-400/30 rounded-full animate-float-3d blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="fixed top-0 left-0 w-full z-50"><Header/></div>
      <div className="relative z-10 pt-[90px]">
        
        <HeaderWaterflow />
        
        <div className="container mx-auto px-4 py-8 space-y-12">
          <LiveMetrics />
          <LegendPanel />
          <PipelineFlow />
        </div>

        <FooterWave />
      </div>
    </main>
  );
}
