import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DailyFortuneProps {
  onDetailedClick?: () => void;
}

const DailyFortune = ({ onDetailedClick }: DailyFortuneProps) => {
  const { t, i18n } = useTranslation();
  const today = new Date();
  const locale = i18n.language === 'en' ? 'en-US' : 'tr-TR';
  const dayName = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = today.toLocaleDateString(locale, { day: 'numeric', month: 'long' });

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="px-4 mb-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-shimmer/15 via-accent/8 to-secondary/15 p-4 sm:p-5 border border-gold/30 backdrop-blur-xl" style={{ background: 'rgba(255, 255, 255, 0.03)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-shimmer/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-3.5 h-3.5 text-gold-shimmer" />
                <span className="text-xs text-gold-shimmer">{dayName}, {date}</span>
              </div>
              
              <h2 className="text-lg sm:text-xl font-serif text-foreground mb-1.5 sm:mb-2">
                {t('dailyFortune.title')}
              </h2>
              
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                {t('dailyFortune.description')}
              </p>

              {/* Energy meter - Animasyonlu ve glow efektli */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">{t('dailyFortune.energy')}</span>
                <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ 
                      delay: 0.6, 
                      duration: 1.5,
                      ease: [0.43, 0.13, 0.23, 0.96] // Smooth easing
                    }}
                    className="h-full bg-gradient-to-r from-gold-shimmer via-gold-glow to-gold-shimmer rounded-full relative"
                    style={{
                      boxShadow: '0 0 10px hsl(45 80% 55% / 0.6)',
                    }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: 'linear',
                      }}
                    />
                  </motion.div>
                </div>
                <span className="text-xs font-semibold text-gold-shimmer">85%</span>
              </div>

              {/* Lucky elements - Mobil için daha küçük */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['🎨 Mor', '🔢 7, 21, 33', '🌙 Akşam'].map((item, i) => (
                  <span key={i} className="px-2 py-1 rounded-full bg-muted/50 text-[10px] text-foreground/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Button 
              variant="mystical" 
              size="lg" 
              className="w-full active:scale-[0.98] touch-manipulation relative"
              onClick={onDetailedClick}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span>{t('dailyFortune.detailedAnalysis')}</span>
                  <span className="text-xs opacity-80">(1 {t('plans.tokens')})</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DailyFortune;
