import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, Moon, History, User, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useTranslation();
  
  const tabs = [
    { id: 'home', icon: Home, label: t('navigation.home') },
    { id: 'history', icon: History, label: t('navigation.history') },
    { id: 'analyze', icon: Sparkles, label: t('navigation.analyze'), isMain: true },
    { id: 'dreams', icon: Moon, label: t('navigation.dreams') },
    { id: 'profile', icon: User, label: t('navigation.profile') },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-2 sm:px-4 pb-safe-bottom pt-1.5 sm:pt-2">
      <div className="glass-card rounded-xl sm:rounded-2xl px-1 sm:px-2 py-1.5 sm:py-2 flex items-center justify-around">
        {tabs.map((tab) => (
          tab.isMain ? (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="w-12 h-12 sm:w-14 sm:h-14 -mt-6 sm:-mt-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-shimmer to-gold-glow flex items-center justify-center shadow-lg shadow-gold-shimmer/30 active:scale-95 transition-transform"
            >
              <tab.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </motion.button>
          ) : (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all active:scale-95 ${
                activeTab === tab.id 
                  ? 'text-gold-shimmer' 
                  : 'text-muted-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[9px] sm:text-[10px] leading-tight">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-0.5 sm:-bottom-1 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-gold-shimmer"
                />
              )}
            </button>
          )
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
