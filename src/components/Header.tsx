import { motion } from 'framer-motion';
import { Coins, Bell } from 'lucide-react';

const Header = () => {
  const tokens = 150;
  const notifications = 3;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-2 sm:py-2.5 safe-top">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-2 sm:py-2.5 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-2.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img 
              src="/oneıro.jpg" 
              alt="Oneiro Logo" 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl object-cover border border-gold-shimmer/30"
            />
            <div>
              <h1 className="text-base sm:text-lg font-serif text-gold-shimmer leading-none">Oneiro</h1>
            </div>
          </motion.div>

          {/* Right Section - Mobil için kompakt */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Tokens - Mobil için sadece sayı göster */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-gold-shimmer/10 to-gold-glow/5 border border-gold/20 active:scale-95 transition-transform"
            >
              <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-shimmer" />
              <span className="text-xs sm:text-sm font-semibold text-gold-shimmer">{tokens}</span>
            </motion.button>

            {/* Notifications */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl active:bg-muted/50 active:scale-95 transition-transform"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/70" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-red-500 text-[9px] sm:text-[10px] text-white flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
