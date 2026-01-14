import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob, transcript: string) => void;
  isProcessing: boolean;
}

const VoiceRecorder = ({ onRecordingComplete, isProcessing }: VoiceRecorderProps) => {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Audio analysis for visualization
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        
        // Mock transcript - kullanıcı gerçek rüyasını anlatacak
        // Bu örnek rüya metni, gerçek kullanımda kullanıcının ses kaydı olacak
        const mockTranscript = "Rüyamda eski evimizin bahçesindeydim, kocaman yeşil bir yılan gördüm, sonra babam bana 3 tane elma verdi.";
        onRecordingComplete(audioBlob, mockTranscript);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Audio level visualization
      const updateLevel = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average / 255);
        }
        animationRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setAudioLevel(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Recording Button with Rings */}
      <div className="relative">
        {/* Animated rings when recording */}
        {isRecording && (
          <>
            <div 
              className="absolute inset-0 rounded-full bg-red-500/20 animate-ping"
              style={{ 
                transform: `scale(${1 + audioLevel * 0.5})`,
                animationDuration: '1.5s'
              }}
            />
            <div 
              className="absolute -inset-4 rounded-full border-2 border-red-500/30"
              style={{ 
                transform: `scale(${1 + audioLevel * 0.3})`,
                transition: 'transform 0.1s ease-out'
              }}
            />
            <div 
              className="absolute -inset-8 rounded-full border border-red-500/20"
              style={{ 
                transform: `scale(${1 + audioLevel * 0.2})`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          </>
        )}

        {/* Main button */}
        <Button
          variant={isRecording ? "record" : "mystical"}
          size="icon-xl"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={cn(
            "relative z-10 transition-all duration-300",
            isRecording && "animate-pulse"
          )}
        >
          {isProcessing ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : isRecording ? (
            <Square className="w-8 h-8 fill-current" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </Button>
      </div>

      {/* Status Text */}
      <div className="text-center space-y-2">
        {isRecording ? (
          <>
            <p className="text-lg font-serif text-gold-shimmer animate-pulse">
              {t('voiceRecorder.listening')}
            </p>
            <p className="text-2xl font-mono text-foreground/80">
              {formatTime(recordingTime)}
            </p>
          </>
        ) : isProcessing ? (
          <p className="text-lg font-serif text-gold-shimmer">
            {t('voiceRecorder.starting')}
          </p>
        ) : (
          <p className="text-muted-foreground">
            {t('voiceRecorder.tapToRecord')}
          </p>
        )}
      </div>

      {/* Audio Visualizer Bars */}
      {isRecording && (
        <div className="flex items-end justify-center gap-1 h-16">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-gold-shimmer to-gold-glow rounded-full transition-all duration-75"
              style={{
                height: `${Math.max(8, Math.random() * audioLevel * 64 + 8)}px`,
                opacity: 0.5 + audioLevel * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
