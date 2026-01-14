import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, Moon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (birthDate: string) => void;
  onSkip: () => void;
}

const OnboardingModal = ({ isOpen, onComplete, onSkip }: OnboardingModalProps) => {
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = () => {
    if (birthDate) {
      onComplete(birthDate);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-md glass-card rounded-3xl p-8 mystical-border relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

          {/* Skip button */}
          <button
            onClick={onSkip}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-shimmer to-accent flex items-center justify-center shadow-[0_0_40px_hsl(45_80%_55%/0.3)]">
                <Moon className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-serif text-center text-gold-shimmer mb-2">
              Kişisel Yıldız Haritanız
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-8">
              Doğum tarihiniz, rüya sembollerini kişisel enerjinizle harmanlamamızı sağlar
            </p>

            {/* Date Input */}
            <div className="relative mb-8">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-shimmer" />
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                placeholder="Doğum Tarihiniz"
              />
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {[
                'Kişiselleştirilmiş numeroloji analizi',
                'Doğum haritanıza göre şanslı numaralar',
                'Günlük enerji tahminleri',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                  <Sparkles className="w-4 h-4 text-gold-shimmer flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <Button
              variant="mystical"
              size="xl"
              className="w-full"
              onClick={handleSubmit}
              disabled={!birthDate}
            >
              Yolculuğa Başla
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Bilgileriniz tamamen gizli tutulur
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingModal;
