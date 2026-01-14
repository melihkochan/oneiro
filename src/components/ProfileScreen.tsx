import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Settings, Coins, Sparkles, Gift, Bell, Globe, Lock, LogOut, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import i18n from '@/i18n/config';

interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  const { t, i18n: i18nInstance } = useTranslation();
  const { toast } = useToast();
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // Mevcut dili al (localStorage'dan veya i18n'den)
  const getCurrentLanguage = () => {
    const stored = localStorage.getItem('i18nextLng');
    const i18nLang = i18n.language;
    // 'tr-TR' gibi formatları 'tr'ye çevir
    const lang = stored || i18nLang || 'tr';
    return lang.split('-')[0]; // 'tr-TR' -> 'tr'
  };
  
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const lang = getCurrentLanguage();
    return lang;
  });
  
  const userTokens = 150;
  const userName = "Misafir Kullanıcı"; // TODO: i18n
  const userPlan = t('plans.freePlan');
  const userTitle = t('profile.userTitle');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // i18n dil değişikliğini dinle ve başlangıç dilini ayarla
  useEffect(() => {
    const currentLang = getCurrentLanguage();
    setCurrentLanguage(currentLang);
    
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const creditPlans = [
    {
      id: 'basic',
      name: t('plans.basic'),
      tokens: 50,
      price: '₺29',
      popular: false,
      features: [
        t('plans.tokensCount', { count: 50 }),
        t('plans.basicFeatures'),
        t('plans.dailyLimitCount', { count: 5 })
      ],
    },
    {
      id: 'recommended',
      name: t('plans.middle'),
      tokens: 200,
      price: '₺89',
      popular: true,
      features: [
        t('plans.tokensCount', { count: 200 }),
        t('plans.allAnalyses'),
        t('plans.dailyLimitCount', { count: 20 }),
        t('plans.prioritySupport')
      ],
    },
    {
      id: 'premium',
      name: t('plans.premium'),
      tokens: 500,
      price: '₺199',
      popular: false,
      features: [
        t('plans.tokensCount', { count: 500 }),
        t('plans.unlimitedAnalyses'),
        t('plans.prioritySupport'),
        t('plans.specialReports')
      ],
    },
  ];

        // Önerilen paketi ortaya kaydır - Responsive
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // Mobil için 220px, desktop için 260px
        const cardWidth = window.innerWidth < 640 ? 220 : 260;
        const gap = window.innerWidth < 640 ? 10 : 12; // gap-2.5 vs gap-3
        const recommendedIndex = 1; // Orta paketi ortada (index 1)
        const scrollPosition = (cardWidth + gap) * recommendedIndex - (container.clientWidth / 2) + (cardWidth / 2);
        container.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const languages = [
    { code: 'tr', name: 'Türkçe', nameEn: 'Turkish', flag: '🇹🇷' },
    { code: 'en', name: 'English', nameEn: 'English', flag: '🇬🇧' },
  ];

  const handleLanguageChange = async (langCode: string) => {
    try {
      const normalizedLang = langCode.split('-')[0]; // 'en-US' -> 'en'
      
      console.log('Dil değiştiriliyor:', normalizedLang);
      
      // Önce localStorage'a kaydet
      localStorage.setItem('i18nextLng', normalizedLang);
      console.log('localStorage kaydedildi:', localStorage.getItem('i18nextLng'));
      
      // Sonra i18n'i güncelle
      await i18n.changeLanguage(normalizedLang);
      console.log('i18n dil değiştirildi:', i18n.language);
      
      // State'i güncelle
      setCurrentLanguage(normalizedLang);
      setLanguageDialogOpen(false);
      
      toast({
        title: 'Dil Değiştirildi',
        description: `Dil ${normalizedLang === 'tr' ? 'Türkçe' : 'İngilizce'} olarak değiştirildi. Sayfa yenileniyor...`,
      });
      
      // Sayfayı kesinlikle yenile - force reload
      setTimeout(() => {
        console.log('Sayfa yenileniyor...');
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Dil değiştirme hatası:', error);
      toast({
        title: 'Hata',
        description: 'Dil değiştirilemedi. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    }
  };

  const getLanguageDisplay = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    if (!lang) return '🇹🇷 Türkçe';
    // Mevcut dile göre isim göster
    const displayName = currentLanguage === 'en' ? lang.nameEn : lang.name;
    return `${lang.flag} ${displayName}`;
  };

  const settings = [
    { id: 'notifications', icon: Bell, label: t('profile.notifications'), value: t('profile.on'), action: () => {
      toast({
        title: t('profile.notifications'),
        description: t('common.loading'),
      });
    }},
    { id: 'language', icon: Globe, label: t('profile.language'), value: getLanguageDisplay(), action: () => setLanguageDialogOpen(true) },
    { id: 'privacy', icon: Lock, label: t('profile.privacy'), action: () => {
      toast({
        title: t('profile.privacy'),
        description: t('common.loading'),
      });
    }},
    { id: 'logout', icon: LogOut, label: t('profile.logout'), value: '', action: () => {
      toast({
        title: t('profile.logout'),
        description: t('common.loading'),
      });
    }, isDestructive: true },
  ];

  const handlePlanSelect = (planId: string) => {
    const plan = creditPlans.find(p => p.id === planId);
    if (plan) {
      // Eğer aynı pakete tekrar tıklanırsa seçimi kaldır
      if (selectedPlan === planId) {
        setSelectedPlan(null);
        toast({
          title: t('common.cancel'),
          description: t('profile.planDeselected', { name: plan.name }),
        });
      } else {
        setSelectedPlan(planId);
        toast({
          title: t('profile.selectedPlan'),
          description: t('plans.planSelected', { name: plan.name }),
        });
      }
      // TODO: Gerçek ödeme entegrasyonu eklenecek
    }
  };

  return (
    <div className="min-h-screen relative z-10 pb-24 safe-area-inset">
      <Header />
      <div className="pt-16 sm:pt-20 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          {/* User Profile Hero Section - Kompakt ve Modern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Sol Taraf - Avatar ve Kullanıcı Bilgileri */}
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                {/* Avatar - Küçük ve Kompakt */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-shimmer via-gold-glow to-gold-shimmer blur-md opacity-50" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gold-shimmer to-gold-glow flex items-center justify-center border-2 border-gold-shimmer/30" style={{
                    boxShadow: '0 0 15px hsl(45 80% 55% / 0.4)',
                  }}>
                    <User className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                  </div>
                </div>

                {/* Kullanıcı Bilgileri */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-serif text-foreground mb-0.5 truncate">{userName}</h2>
                  <p className="text-xs sm:text-sm text-gold-shimmer font-medium mb-1.5 truncate">{userTitle}</p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 border border-border/50">
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{userPlan} Plan</span>
                  </div>
                </div>
              </div>

              {/* Sağ Taraf - Jeton Bilgisi ve Buton */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-muted-foreground mb-0.5">{t('profile.currentTokens')}</p>
                  <div className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-gold-shimmer" />
                    <p className="text-base font-bold text-gold-shimmer">{userTokens}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 sm:flex-col sm:items-end">
                  {/* Mobil için sadece sayı göster */}
                  <div className="sm:hidden flex items-center gap-1">
                    <Coins className="w-4 h-4 text-gold-shimmer" />
                    <span className="text-sm font-bold text-gold-shimmer">{userTokens}</span>
                  </div>
                  <Button 
                    variant="mystical" 
                    size="sm" 
                    className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 h-auto whitespace-nowrap"
                  >
                    {t('profile.buyTokens')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Credit Plans - Horizontal Scroll (Carousel) - Mobil Optimize */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-gold-shimmer" />
              <h3 className="text-base sm:text-lg font-serif text-foreground">{t('profile.membershipPlans')}</h3>
            </div>

            {/* Horizontal Scroll Container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x snap-mandatory" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex gap-2.5 sm:gap-3 pb-4" style={{ width: 'max-content' }}>
                {creditPlans.map((plan, index) => {
                  const isSelected = selectedPlan === plan.id;
                  const isPopular = plan.popular && !isSelected; // Önerilen sadece seçili değilse göster
                  return (
                  <div
                    key={plan.id}
                    className={`relative glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 w-[220px] sm:w-[260px] flex-shrink-0 snap-center cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-gold-shimmer bg-gradient-to-br from-gold-shimmer/25 to-gold-glow/10 shadow-[0_0_30px_hsl(45_80%_55%/0.5)] scale-[1.02] sm:scale-[1.03] ring-2 ring-gold-shimmer/50 mt-4 sm:mt-5'
                        : plan.popular && !isSelected
                        ? 'border-gold/40 bg-gradient-to-br from-gold-shimmer/10 to-transparent shadow-[0_0_15px_hsl(45_80%_55%/0.2)]'
                        : 'border-border hover:border-gold/40 hover:bg-muted/20'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {isPopular && (
                      <div className="flex justify-center mb-2 sm:mb-2.5">
                        <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-gold-shimmer to-gold-glow text-[10px] sm:text-xs font-semibold text-primary-foreground shadow-lg relative z-10">
                          {t('profile.recommended')}
                        </div>
                      </div>
                    )}
                    {isSelected && (
                      <div className="flex justify-center mb-2 sm:mb-2.5">
                        <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-gold-shimmer to-gold-glow text-[10px] sm:text-xs font-semibold text-primary-foreground shadow-lg relative z-10">
                          {t('profile.selectedPlan')}
                        </div>
                      </div>
                    )}
                    <div className="mb-2 sm:mb-3">
                      <h4 className={`text-xl sm:text-2xl font-serif font-bold mb-1.5 sm:mb-2 ${
                        isSelected ? 'text-gold-shimmer' : 'text-foreground'
                      }`}>{plan.name}</h4>
                      <p className={`text-2xl sm:text-3xl font-bold mb-1.5 sm:mb-2 tracking-tight ${
                        isSelected ? 'text-gold-shimmer' : 'text-foreground'
                      }`}>{plan.price}</p>
                      <p className={`text-xs sm:text-sm font-semibold ${
                        isSelected ? 'text-gold-glow' : 'text-foreground/70'
                      }`}>{t('plans.tokensCount', { count: plan.tokens })}</p>
                    </div>

                    <ul className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-start gap-1.5 text-[10px] sm:text-xs ${
                          isSelected ? 'text-foreground/90' : 'text-foreground/80'
                        }`}>
                          <Sparkles className={`w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 mt-0.5 ${
                            isSelected ? 'text-gold-shimmer' : 'text-gold-shimmer/70'
                          }`} />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div 
                      className={`w-full text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-center font-medium transition-all ${
                        isSelected 
                          ? 'bg-gradient-to-r from-gold-shimmer to-gold-glow text-primary-foreground shadow-lg' 
                          : 'bg-muted/50 text-foreground border border-border hover:bg-muted'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanSelect(plan.id);
                      }}
                    >
                      {isSelected ? t('profile.selectedPlan') : t('profile.selectPlan')}
                    </div>
                  </div>
                );
                })}
              </div>
            </div>
          </motion.div>

          {/* Settings - Kompakt ve Modern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl sm:rounded-2xl overflow-hidden"
          >
            <div className="divide-y divide-border/50">
              {settings.map((setting, index) => (
                <button
                  key={setting.id}
                  onClick={setting.action}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 hover:bg-muted/30 transition-colors active:scale-[0.98] ${
                    setting.isDestructive ? 'text-red-400' : 'text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <setting.icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${setting.isDestructive ? 'text-red-400' : 'text-foreground/70'}`} />
                    <span className="font-medium text-sm sm:text-base">{setting.label}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {setting.value && (
                      <span className="text-xs sm:text-sm text-muted-foreground truncate max-w-[120px] sm:max-w-none">{setting.value}</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dil Seçimi Dialog */}
      <Dialog open={languageDialogOpen} onOpenChange={setLanguageDialogOpen}>
        <DialogContent className="sm:max-w-md" aria-describedby="language-dialog-description">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">{t('profile.language')}</DialogTitle>
          </DialogHeader>
          <p id="language-dialog-description" className="sr-only">
            Uygulama dilini seçin. Türkçe veya İngilizce seçenekleri mevcuttur.
          </p>
          <div className="space-y-2 py-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  currentLanguage === lang.code
                    ? 'border-gold-shimmer bg-gold-shimmer/10'
                    : 'border-border hover:border-gold/30 hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium text-foreground">
                    {lang.code === 'tr' ? 'Türkçe' : 'English'}
                  </span>
                </div>
                {currentLanguage === lang.code && (
                  <Check className="w-5 h-5 text-gold-shimmer" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileScreen;
