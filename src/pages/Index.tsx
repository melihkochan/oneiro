import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import CosmicBackground from '@/components/CosmicBackground';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DailyFortune from '@/components/DailyFortune';
import ServiceCard from '@/components/ServiceCard';
import BottomNav from '@/components/BottomNav';
import AnalysisScreen from '@/components/AnalysisScreen';
import ResultsScreen from '@/components/ResultsScreen';
import ServiceInput from '@/components/ServiceInput';
import HistoryScreen from '@/components/HistoryScreen';
import ProfileScreen from '@/components/ProfileScreen';
import DailyAnalysisScreen from '@/components/DailyAnalysisScreen';

type AppState = 'home' | 'service' | 'analyzing' | 'results' | 'history' | 'profile' | 'dreams' | 'dailyAnalysis';

const getServices = (t: any) => [
  {
    id: 'dream',
    title: t('services.dream.title'),
    description: t('services.dream.description'),
    icon: '🌙',
    gradient: 'bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-violet-700/40 border border-indigo-500/20',
    tokenCost: 1,
    isPopular: true,
  },
  {
    id: 'numerology',
    title: t('services.numerology.title'),
    description: t('services.numerology.description'),
    icon: '🔢',
    gradient: 'bg-gradient-to-br from-emerald-600/40 via-teal-600/30 to-cyan-700/40 border border-emerald-500/20',
    tokenCost: 1,
  },
  {
    id: 'coffee',
    title: t('services.coffee.title'),
    description: t('services.coffee.description'),
    icon: '☕',
    gradient: 'bg-gradient-to-br from-amber-600/40 via-orange-600/30 to-yellow-700/40 border border-amber-500/20',
    tokenCost: 2,
  },
  {
    id: 'tarot',
    title: t('services.tarot.title'),
    description: t('services.tarot.description'),
    icon: '🃏',
    gradient: 'bg-gradient-to-br from-rose-600/40 via-pink-600/30 to-fuchsia-700/40 border border-rose-500/20',
    tokenCost: 2,
  },
  {
    id: 'lottery',
    title: t('services.lottery.title'),
    description: t('services.lottery.description'),
    icon: '🎰',
    gradient: 'bg-gradient-to-br from-gold-shimmer/40 via-yellow-600/30 to-amber-700/40 border border-gold/30',
    tokenCost: 1,
    isPopular: true,
  },
  {
    id: 'compatibility',
    title: t('services.compatibility.title'),
    description: t('services.compatibility.description'),
    icon: '💫',
    gradient: 'bg-gradient-to-br from-pink-600/40 via-rose-600/30 to-red-700/40 border border-pink-500/20',
    tokenCost: 3,
    isLocked: true,
  },
];

const Index = () => {
  const { t } = useTranslation();
  const services = getServices(t);
  const [appState, setAppState] = useState<AppState>('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userTokens, setUserTokens] = useState(150); // Kullanıcı jeton sayısı

  // BottomNav tab değişikliği
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'analyze') {
      setAppState('home');
      setSelectedService(null);
    } else if (tab === 'home') {
      setAppState('home');
      setSelectedService(null);
    } else if (tab === 'history') {
      setAppState('history');
    } else if (tab === 'dreams') {
      setAppState('dreams');
    } else if (tab === 'profile') {
      setAppState('profile');
    }
  };

  // Günlük analiz detayları için - 1 jeton maliyeti
  const handleDailyAnalysisClick = () => {
    // TODO: Jeton kontrolü eklenecek (şimdilik direkt açılıyor)
    // if (userTokens >= 1) {
    //   deductTokens(1);
    setAppState('dailyAnalysis');
    // } else {
    //   toast({ title: 'Yetersiz Jeton', description: 'Detaylı analiz için 1 jeton gerekiyor.' });
    // }
  };

  const handleServiceClick = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service && !service.isLocked) {
      setSelectedService(service);
      setAppState('service');
    }
  };

  const handleServiceSubmit = async (data: any) => {
    setAnalysisData(data);
    setIsProcessing(true);
    
    // Her servis için özel analiz mantığı
    try {
      const { 
        analyzeDream, 
        analyzeNumerology, 
        analyzeCoffee, 
        analyzeTarot, 
        analyzeLottery 
      } = await import('@/services/analysis');
      
      let result: any;
      
      switch (selectedService?.id) {
        case 'dream':
          if (data.transcript) {
            result = analyzeDream(data.transcript);
          }
          break;
        case 'numerology':
          if (data.name && data.birthDate) {
            result = analyzeNumerology(data.name, data.birthDate);
          }
          break;
        case 'coffee':
          result = analyzeCoffee(data.symbols || []);
          break;
        case 'tarot':
          result = analyzeTarot();
          break;
        case 'lottery':
          result = analyzeLottery(data.gameType || 'sayisal', data.birthDate);
          break;
        default:
          result = {
            interpretation: "Analiz tamamlandı. Kozmik enerjiler sizin lehinize çalışıyor.",
            numbers: [3, 12, 28, 45, 51, 67],
            joker: 7,
          };
      }
      
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback
      setAnalysisResult({
        interpretation: "Analiz tamamlandı. Kozmik enerjiler sizin lehinize çalışıyor.",
        numbers: [3, 12, 28, 45, 51, 67],
        joker: 7,
      });
    }
    
    setIsProcessing(false);
    setAppState('analyzing');
  };

  const handleAnalysisComplete = () => {
    setAppState('results');
  };

  const handleReset = () => {
    setAppState('home');
    setSelectedService(null);
    setAnalysisData(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen relative">

      <AnimatePresence mode="wait">
        {appState === 'analyzing' ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnalysisScreen onComplete={handleAnalysisComplete} />
          </motion.div>
        ) : appState === 'results' ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultsScreen 
              dreamText={analysisData?.transcript || 'Analiz tamamlandı'} 
              analysisResult={analysisResult}
              onReset={handleReset} 
            />
          </motion.div>
        ) : appState === 'service' && selectedService ? (
          <motion.div
            key="service"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header />
            <ServiceInput
              serviceId={selectedService.id}
              serviceTitle={selectedService.title}
              serviceIcon={selectedService.icon}
              onBack={handleReset}
              onSubmit={handleServiceSubmit}
              isProcessing={isProcessing}
            />
          </motion.div>
        ) : appState === 'history' ? (
          <motion.div
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HistoryScreen onBack={() => { setAppState('home'); setActiveTab('home'); }} />
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.div>
        ) : appState === 'dreams' ? (
          <motion.div
            key="dreams"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative z-10 pb-24 safe-area-inset"
          >
            <Header />
            <div className="pt-20 px-4">
              <div className="max-w-4xl mx-auto text-center py-12">
                <p className="text-muted-foreground">Rüyalarım özelliği yakında eklenecek</p>
              </div>
            </div>
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.div>
        ) : appState === 'profile' ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfileScreen onBack={() => { setAppState('home'); setActiveTab('home'); }} />
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.div>
        ) : appState === 'dailyAnalysis' ? (
          <motion.div
            key="dailyAnalysis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DailyAnalysisScreen onBack={() => { setAppState('home'); setActiveTab('home'); }} />
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative z-10 pb-24 safe-area-inset"
          >
            <Header />
            <HeroSection />
            <DailyFortune onDetailedClick={handleDailyAnalysisClick} />

            {/* Services Grid - Mobil için optimize */}
            <section className="px-3 sm:px-4 mb-6 sm:mb-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4 sm:mb-5">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-shimmer" />
                  <h2 className="text-base sm:text-lg font-serif text-foreground">{t('home.services')}</h2>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {services.map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      gradient={service.gradient}
                      tokenCost={service.tokenCost}
                      isPopular={service.isPopular}
                      isLocked={service.isLocked}
                      onClick={() => handleServiceClick(service.id)}
                      delay={0.3 + index * 0.1}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="px-4 pb-8 text-center">
              <p className="text-xs text-muted-foreground">
                {t('footer.text')}
              </p>
            </footer>

            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
