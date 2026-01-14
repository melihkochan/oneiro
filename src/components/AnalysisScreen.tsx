import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface AnalysisScreenProps {
  onComplete: () => void;
}

const AnalysisScreen = ({ onComplete }: AnalysisScreenProps) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const analysisSteps = [
    { text: t('analysis.scanSymbols'), code: "SCAN_SYMBOLS" },
    { text: t('analysis.calcNumerology'), code: "CALC_NUMEROLOGY" },
    { text: t('analysis.checkAstro'), code: "CHECK_ASTRO" },
    { text: t('analysis.analyzeFreq'), code: "ANALYZE_FREQ" },
    { text: t('analysis.generateNumbers'), code: "GENERATE_NUMBERS" },
  ];

  useEffect(() => {
    const stepDuration = 1500;
    const totalDuration = stepDuration * analysisSteps.length;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / 50));
        return Math.min(newProgress, 100);
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval);
          clearInterval(progressInterval);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Minimal geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-px bg-gold-shimmer/30" />
        <div className="absolute top-1/4 left-1/4 w-px h-64 bg-gold-shimmer/30" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-px bg-gold-shimmer/30" />
        <div className="absolute bottom-1/4 right-1/4 w-px h-64 bg-gold-shimmer/30" />
      </div>

      {/* Central content - Co-Star style minimal */}
      <div className="relative z-10 flex flex-col items-center gap-12 max-w-md mx-auto">
        {/* Minimal progress indicator */}
        <div className="w-full">
          <div className="h-px bg-muted/30 mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-shimmer/60 to-gold-shimmer"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground/60 font-mono">
            <span>{currentStep + 1}/{analysisSteps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Current step - minimalist text */}
        <div className="h-32 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
                {analysisSteps[currentStep].code}
              </div>
              <p className="text-lg font-light text-foreground/90 leading-relaxed">
                {analysisSteps[currentStep].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal dot indicators */}
        <div className="flex gap-2">
          {analysisSteps.map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scale: i === currentStep ? 1.2 : 1,
                opacity: i <= currentStep ? 1 : 0.3,
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                i <= currentStep 
                  ? 'bg-gold-shimmer' 
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Subtle status text */}
        <div className="text-xs text-muted-foreground/40 font-light text-center">
          {t('analysis.processing')}
        </div>
      </div>
    </div>
  );
};

export default AnalysisScreen;
