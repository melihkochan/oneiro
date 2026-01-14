import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsScreenProps {
  dreamText: string;
  analysisResult?: {
    interpretation: string;
    numbers: number[];
    joker?: number;
  } | null;
  onReset: () => void;
}

const ResultsScreen = ({ dreamText, analysisResult, onReset }: ResultsScreenProps) => {
  const { t } = useTranslation();
  
  // Use API results or generate fallback
  const luckyNumbers = analysisResult?.numbers || (() => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 90) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  })();
  
  const jokerNumber = analysisResult?.joker || Math.floor(Math.random() * 10) + 1;
  
  const interpretation = analysisResult?.interpretation || t('analysis.defaultInterpretation');

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-4">
          <Sparkles className="w-4 h-4 text-gold-shimmer" />
          <span className="text-sm text-gold-shimmer">{t('analysis.completed')}</span>
        </div>
        <h1 className="text-3xl font-serif text-gold-shimmer">
          Kozmik Tahmin Hazır
        </h1>
      </motion.div>

      {/* Dream Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-6 mystical-border"
      >
        <h2 className="text-lg font-serif text-foreground/90 mb-3">{t('analysis.dreamSummary')}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed italic">
          "{dreamText}"
        </p>
      </motion.div>

      {/* Interpretation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6 mb-8"
      >
        <h2 className="text-lg font-serif text-gold-shimmer mb-3">Mistik Yorum</h2>
        <p className="text-foreground/80 text-sm leading-relaxed">
          {interpretation}
        </p>
      </motion.div>

      {/* Lucky Numbers Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl font-serif text-foreground/90 mb-6">
          Şanslı Numaralarınız
        </h2>

        {/* Main Numbers */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {luckyNumbers.map((num, index) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                delay: 0.4 + index * 0.15,
                duration: 0.6,
                type: "spring",
              }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center border border-gold/30 shadow-lg"
            >
              <span className="text-xl font-bold text-gold-shimmer">
                {num.toString().padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Joker Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Joker</span>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-shimmer to-gold-glow flex items-center justify-center shadow-[0_0_30px_hsl(45_80%_55%/0.5)]">
            <span className="text-2xl font-bold text-primary-foreground">
              {jokerNumber.toString().padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Energy Level */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="glass-card rounded-2xl p-6 mb-8 text-center"
      >
        <h3 className="text-sm text-muted-foreground mb-3">Bugünkü Şans Enerjiniz</h3>
        <div className="flex items-center justify-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i < 4 
                  ? 'bg-gold-shimmer text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              ★
            </motion.div>
          ))}
        </div>
        <p className="text-gold-shimmer font-serif">Çok Yüksek</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="flex flex-col gap-3 mt-auto"
      >
        <Button variant="mystical" size="xl" className="w-full">
          <Share2 className="w-5 h-5" />
          {t('results.shareResults')}
        </Button>
        <Button variant="glass" size="lg" className="w-full" onClick={onReset}>
          <RefreshCw className="w-4 h-4" />
          {t('analysis.newAnalysis')}
        </Button>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;
