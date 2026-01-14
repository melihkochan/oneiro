import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, ArrowLeft } from 'lucide-react';
import Header from './Header';
import RecentAnalyses from './RecentAnalyses';

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen = ({ onBack }: HistoryScreenProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen relative z-10 pb-24 safe-area-inset">
      <Header />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-gold-shimmer" />
              <h1 className="text-2xl font-serif text-foreground">{t('history.title')}</h1>
            </div>
            <p className="text-sm text-muted-foreground">{t('history.description')}</p>
          </motion.div>

          {/* Recent Analyses */}
          <RecentAnalyses />
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
