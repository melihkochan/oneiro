import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative pt-16 sm:pt-20 pb-6 sm:pb-8 px-3 sm:px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Minimal badge - mobil için kompakt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-muted/30 border border-border/50 mb-4 sm:mb-6"
        >
          <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground/70 tracking-wider uppercase">
            {t('home.hero.badge')}
          </span>
        </motion.div>

        {/* Main heading - mobil için daha küçük */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-serif mb-3 sm:mb-4 font-light tracking-tight"
        >
          <span className="text-foreground">{t('home.hero.title')}</span>
        </motion.h1>

        {/* Subtitle - mobil için daha kısa */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs sm:text-sm text-muted-foreground/80 max-w-sm mx-auto mb-4 sm:mb-6 font-light leading-relaxed px-2"
        >
          {t('home.hero.subtitle')}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
