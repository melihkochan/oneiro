import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mic, Camera, Calendar, Shuffle, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceRecorder from '@/components/VoiceRecorder';

interface ServiceInputProps {
  serviceId: string;
  serviceTitle: string;
  serviceIcon: string;
  onBack: () => void;
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const ServiceInput = ({ 
  serviceId, 
  serviceTitle, 
  serviceIcon, 
  onBack, 
  onSubmit,
  isProcessing 
}: ServiceInputProps) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerBirthDate, setPartnerBirthDate] = useState('');

  const { t } = useTranslation();
  
  const renderDreamInput = () => (
    <div className="text-center">
      <p className="text-muted-foreground mb-8">
        {t('serviceInput.dreamDescription')}
      </p>
      <VoiceRecorder
        onRecordingComplete={(blob, transcript) => onSubmit({ transcript })}
        isProcessing={isProcessing}
      />
    </div>
  );

  const renderNumerologyInput = () => (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground mb-6">
        Kişisel numeroloji haritanız için bilgilerinizi girin
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-foreground/70 mb-2">Adınız Soyadınız</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Örn: Ahmet Yılmaz"
            className="w-full h-14 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm text-foreground/70 mb-2">Doğum Tarihiniz</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-shimmer" />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
            />
          </div>
        </div>
      </div>

      <Button
        variant="mystical"
        size="xl"
        className="w-full mt-8"
        onClick={() => onSubmit({ name, birthDate })}
        disabled={!name || !birthDate || isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          'Numeroloji Haritamı Oluştur'
        )}
      </Button>
    </div>
  );

  const renderCoffeeInput = () => (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground mb-6">
        Kahve fincanınızın fotoğrafını yükleyin
      </p>
      
      <div 
        className="relative aspect-square max-w-xs mx-auto rounded-3xl border-2 border-dashed border-gold/30 bg-muted/20 flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 hover:bg-muted/30 transition-all group"
        onClick={() => document.getElementById('coffee-upload')?.click()}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Camera className="w-10 h-10 text-gold-shimmer" />
        </div>
        <p className="text-foreground/70 text-sm">Fotoğraf yüklemek için tıklayın</p>
        <p className="text-muted-foreground text-xs mt-1">veya sürükleyip bırakın</p>
        <input
          id="coffee-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onSubmit({ image: file });
          }}
        />
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>💡 İpucu: Fincanı iyi aydınlatılmış bir ortamda, </p>
        <p>üstten çekin ve telveler net görünsün</p>
      </div>
    </div>
  );

  const renderTarotInput = () => (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground mb-6">
        Sorunuzu düşünün ve kartları seçin
      </p>
      
      {/* Tarot cards */}
      <div className="flex justify-center gap-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, rotateY: 180 }}
            animate={{ opacity: 1, y: 0, rotateY: 180 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -10, rotateY: 170 }}
            className="w-24 h-36 sm:w-32 sm:h-48 rounded-xl bg-gradient-to-br from-rose-600/40 via-pink-600/30 to-fuchsia-700/40 border border-rose-500/30 flex items-center justify-center cursor-pointer shadow-lg"
          >
            <span className="text-3xl">🂠</span>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Geçmiş • Şimdi • Gelecek
      </p>

      <Button
        variant="mystical"
        size="xl"
        className="w-full mt-4"
        onClick={() => onSubmit({ spread: 'three-card' })}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          'Kartları Aç'
        )}
      </Button>
    </div>
  );

  const renderLotteryInput = () => (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground mb-6">
        Hangi oyun için şanslı numaralar istersiniz?
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'sayisal', name: 'Sayısal Loto', count: '6/49' },
          { id: 'super', name: 'Süper Loto', count: '6/54' },
          { id: 'onnumara', name: 'On Numara', count: '10/80' },
          { id: 'sans', name: 'Şans Topu', count: '5+1' },
        ].map((game) => (
          <motion.button
            key={game.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSubmit({ gameType: game.id })}
            disabled={isProcessing}
            className="p-4 rounded-2xl bg-gradient-to-br from-gold-shimmer/20 to-gold-glow/10 border border-gold/20 hover:border-gold/40 transition-all text-left"
          >
            <div className="text-2xl mb-2">🎰</div>
            <div className="font-medium text-foreground">{game.name}</div>
            <div className="text-xs text-muted-foreground">{game.count}</div>
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 pt-4">
        <Shuffle className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          Kişisel enerjinize göre hesaplanır
        </span>
      </div>
    </div>
  );

  const renderCompatibilityInput = () => (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground mb-6">
        {t('serviceInput.compatibilityDescription')}
      </p>
      
      {/* Person 1 */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-gold-shimmer mb-2">
          <span>👤</span>
          <span className="text-sm font-medium">1. Kişi</span>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="İsim"
          className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-all"
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-gold/50 transition-all"
        />
      </div>

      {/* Heart icon */}
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/30 to-rose-500/30 flex items-center justify-center">
          <span className="text-2xl">💕</span>
        </div>
      </div>

      {/* Person 2 */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-gold-shimmer mb-2">
          <span>👤</span>
          <span className="text-sm font-medium">2. Kişi</span>
        </div>
        <input
          type="text"
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
          placeholder="İsim"
          className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-all"
        />
        <input
          type="date"
          value={partnerBirthDate}
          onChange={(e) => setPartnerBirthDate(e.target.value)}
          className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-gold/50 transition-all"
        />
      </div>

      <Button
        variant="mystical"
        size="xl"
        className="w-full"
        onClick={() => onSubmit({ name, birthDate, partnerName, partnerBirthDate })}
        disabled={!name || !birthDate || !partnerName || !partnerBirthDate || isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          t('serviceInput.compatibilityButton')
        )}
      </Button>
    </div>
  );

  const renderInput = () => {
    switch (serviceId) {
      case 'dream':
        return renderDreamInput();
      case 'numerology':
        return renderNumerologyInput();
      case 'coffee':
        return renderCoffeeInput();
      case 'tarot':
        return renderTarotInput();
      case 'lottery':
        return renderLotteryInput();
      case 'compatibility':
        return renderCompatibilityInput();
      default:
        return renderDreamInput();
    }
  };

  return (
    <div className="min-h-screen relative z-10 pb-24">
      <div className="pt-24 px-4">
        <div className="max-w-lg mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </motion.button>

          {/* Service header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="text-6xl mb-4 block">{serviceIcon}</span>
            <h1 className="text-3xl font-serif text-gold-shimmer">
              {serviceTitle}
            </h1>
          </motion.div>

          {/* Service-specific input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {renderInput()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInput;
