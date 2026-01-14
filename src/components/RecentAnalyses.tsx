import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, ChevronRight, Moon, Coffee, Hash, Sparkles } from 'lucide-react';

const RecentAnalyses = () => {
  const { t } = useTranslation();
  
  const analyses = [
    {
      id: 1,
      type: t('services.dream.title'),
      icon: Moon,
      preview: t('analyses.dreamPreview'),
      time: t('time.hoursAgo', { count: 2 }),
      numbers: [7, 14, 28],
      gradient: 'from-blue-500/20 to-purple-500/20',
    },
    {
      id: 2,
      type: t('services.coffee.title'),
      icon: Coffee,
      preview: t('analyses.coffeePreview'),
      time: t('time.daysAgo', { count: 1 }),
      numbers: [3, 18, 45],
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
      id: 3,
      type: t('services.numerology.title'),
      icon: Hash,
      preview: t('analyses.numerologyPreview'),
      time: t('time.daysAgo', { count: 3 }),
      numbers: [8, 17, 26],
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
  ];
  
  return (
    <section className="px-3 sm:px-4 mb-8 sm:mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <h2 className="text-base sm:text-xl font-serif text-foreground">{t('history.recentAnalyses')}</h2>
          </div>
          <button className="text-xs sm:text-sm text-gold-shimmer hover:underline">
            {t('common.next')}
          </button>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {analyses.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:border-gold/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 sm:gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${analysis.gradient} flex items-center justify-center shrink-0`}>
                  <analysis.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                    <span className="text-xs sm:text-sm font-medium text-foreground truncate">{analysis.type}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground flex-shrink-0">• {analysis.time}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{analysis.preview}</p>
                </div>

                {/* Lucky numbers */}
                <div className="hidden sm:flex items-center gap-1">
                  {analysis.numbers.map((num, i) => (
                    <span key={i} className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground/80">
                      {num}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-gold-shimmer group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state placeholder */}
        {analyses.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('history.noAnalyses')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentAnalyses;
