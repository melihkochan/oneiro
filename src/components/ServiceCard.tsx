import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LucideIcon, Sparkles, Lock } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  tokenCost: number;
  isPopular?: boolean;
  isLocked?: boolean;
  onClick: () => void;
  delay?: number;
}

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  gradient, 
  tokenCost, 
  isPopular, 
  isLocked,
  onClick,
  delay = 0 
}: ServiceCardProps) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative group cursor-pointer touch-manipulation ${isLocked ? 'opacity-60' : ''}`}
    >
      {/* Card - Mobil için touch-friendly */}
      <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 h-full transition-all duration-300 active:scale-[0.98] ${gradient}`}>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-gold-shimmer/20 border border-gold/30">
            <Sparkles className="w-3 h-3 text-gold-shimmer" />
            <span className="text-[10px] font-medium text-gold-shimmer">{t('services.popular')}</span>
          </div>
        )}

        {/* Locked badge */}
        {isLocked && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-muted/50">
            <Lock className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">{t('services.premium')}</span>
          </div>
        )}

        {/* Icon - Mobil için daha küçük */}
        <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
          {icon}
        </div>

        {/* Content - Mobil için optimize */}
        <h3 className="text-base sm:text-lg font-serif text-foreground mb-1.5 sm:mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-foreground/60 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Token cost */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/20">
            <span className="text-gold-shimmer text-sm">🪙</span>
            <span className="text-xs font-medium text-foreground/80">{t('plans.tokensCount', { count: tokenCost })}</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl group-hover:scale-150 transition-transform duration-700" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
