import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Sparkles, Calendar, Star, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from './Header';

interface DailyAnalysisScreenProps {
  onBack: () => void;
}

const DailyAnalysisScreen = ({ onBack }: DailyAnalysisScreenProps) => {
  const { t, i18n } = useTranslation();
  const today = new Date();
  const locale = i18n.language === 'en' ? 'en-US' : 'tr-TR';
  const dayName = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = today.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

  // Örnek detaylı analiz verisi (şimdilik mock, sonra AI ile gelecek)
  const analysis = {
    overallEnergy: 85,
    luckyColor: 'Mor',
    luckyNumbers: [7, 21, 33],
    luckyTime: 'Akşam',
    zodiac: 'Yay',
    element: 'Ateş',
    detailedReading: i18n.language === 'tr' 
      ? `Bugün kozmik enerjileriniz oldukça güçlü. Yıldızlar sizin için özel bir konfigürasyon oluşturuyor. Numerolojik hesaplamalara göre, bugün 7, 21 ve 33 sayıları sizin için özel bir anlam taşıyor. Bu sayılar, bolluk, bereket ve yeni başlangıçların işaretçisi.

Mor renk, bugün sizin için enerji boyutunda çok önemli. Bu renk, sezgisel güçlerinizi ve ruhsal bağlantılarınızı güçlendirecek. Özellikle akşam saatlerinde bu enerji daha da yoğunlaşacak.

Yıldız haritanız bugün özellikle yaratıcılık ve iletişim alanlarında size destek sağlıyor. Önemli kararlar almak için ideal bir gün. Ancak aceleci davranmaktan kaçının, kozmik enerjiler size sabırlı olmanızı söylüyor.`
      : `Your cosmic energies are quite strong today. The stars are creating a special configuration for you. According to numerological calculations, the numbers 7, 21, and 33 carry special meaning for you today. These numbers are indicators of abundance, prosperity, and new beginnings.

The color purple is very important for you today in terms of energy. This color will strengthen your intuitive powers and spiritual connections. This energy will intensify especially in the evening hours.

Your star chart is particularly supporting you today in areas of creativity and communication. An ideal day for making important decisions. However, avoid being hasty, the cosmic energies are telling you to be patient.`,
    recommendations: i18n.language === 'tr'
      ? [
          'Önemli görüşmelerinizi akşam saatlerine planlayın',
          'Mor renkli aksesuarlar kullanarak enerjinizi güçlendirin',
          'Yaratıcı projelerinize bugün odaklanın',
          'Sabırlı olun, aceleci kararlar vermeyin'
        ]
      : [
          'Schedule your important meetings for the evening hours',
          'Strengthen your energy by using purple accessories',
          'Focus on your creative projects today',
          'Be patient, do not make hasty decisions'
        ]
  };

  return (
    <div className="min-h-screen relative z-10 pb-24 safe-area-inset">
      <Header />
      <div className="pt-16 sm:pt-20 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
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

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-shimmer" />
              <span className="text-xs sm:text-sm text-gold-shimmer">{dayName}, {date}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-gold-shimmer mb-2">
              {t('dailyFortune.title')}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-shimmer/10 border border-gold/30">
              <Sparkles className="w-3 h-3 text-gold-shimmer" />
              <span className="text-xs text-gold-shimmer font-medium">1 {t('plans.tokens')}</span>
            </div>
          </motion.div>

          {/* Energy Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm sm:text-base text-muted-foreground">{t('dailyFortune.energy')}</span>
              <span className="text-lg sm:text-xl font-bold text-gold-shimmer">{analysis.overallEnergy}%</span>
            </div>
            <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analysis.overallEnergy}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-gold-shimmer via-gold-glow to-gold-shimmer rounded-full"
                style={{
                  boxShadow: '0 0 10px hsl(45 80% 55% / 0.6)',
                }}
              />
            </div>
          </motion.div>

          {/* Lucky Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6"
          >
            <div className="glass-card rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl mb-2">🎨</div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{i18n.language === 'tr' ? 'Renk' : 'Color'}</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{analysis.luckyColor}</p>
            </div>
            <div className="glass-card rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl mb-2">🔢</div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{i18n.language === 'tr' ? 'Sayılar' : 'Numbers'}</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{analysis.luckyNumbers.join(', ')}</p>
            </div>
            <div className="glass-card rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl mb-2">🌙</div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{i18n.language === 'tr' ? 'Zaman' : 'Time'}</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{analysis.luckyTime}</p>
            </div>
          </motion.div>

          {/* Detailed Reading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-gold-shimmer" />
              <h2 className="text-lg sm:text-xl font-serif text-foreground">
                {i18n.language === 'tr' ? 'Detaylı Kozmik Yorum' : 'Detailed Cosmic Reading'}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {analysis.detailedReading}
            </p>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold-shimmer" />
              <h2 className="text-lg sm:text-xl font-serif text-foreground">
                {i18n.language === 'tr' ? 'Öneriler' : 'Recommendations'}
              </h2>
            </div>
            <ul className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-shimmer/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-gold-shimmer">{index + 1}</span>
                  </div>
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed flex-1">{rec}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="mystical"
              size="lg"
              className="w-full"
              onClick={onBack}
            >
              {t('common.back')}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DailyAnalysisScreen;
