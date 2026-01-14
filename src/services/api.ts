/**
 * API Servisleri
 * OpenAI Whisper (STT) ve GPT-4 (Analiz) entegrasyonları
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const API_BASE_URL = 'https://api.openai.com/v1';

interface WhisperResponse {
  text: string;
}

interface GPTResponse {
  interpretation: string;
  numbers: number[];
  joker?: number;
}

/**
 * Ses dosyasını metne çevir (OpenAI Whisper API)
 */
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  if (!OPENAI_API_KEY) {
    // Development: Mock response
    console.warn('OpenAI API key not found, using mock transcription');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Rüyamda eski evimizin bahçesindeydim, kocaman yeşil bir yılan gördüm, sonra babam bana 3 tane elma verdi.");
      }, 1000);
    });
  }

  try {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'tr');

    const response = await fetch(`${API_BASE_URL}/audio/transcriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Transcription failed');
    }

    const data: WhisperResponse = await response.json();
    return data.text;
  } catch (error) {
    console.error('Whisper API error:', error);
    throw error;
  }
}

/**
 * Rüya metnini analiz et ve şanslı numaralar üret (OpenAI GPT-4)
 */
export async function analyzeDream(
  dreamText: string,
  birthDate?: string,
  birthTime?: string
): Promise<GPTResponse> {
  if (!OPENAI_API_KEY) {
    // Development: Mock response
    console.warn('OpenAI API key not found, using mock analysis');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          interpretation: "Rüyanızdaki semboller güçlü kozmik enerjiler taşıyor. Yeşil yılan maddi bir gücü, elma ise bereketi temsil eder. Bugün şansınızın zirvesinde olduğunuzu unutmayın.",
          numbers: [3, 12, 28, 45, 51, 67],
          joker: 7,
        });
      }, 1500);
    });
  }

  try {
    const systemPrompt = `Sen profesyonel bir numeroloji ve rüya yorumu uzmanısın. Kullanıcının rüyasını analiz edip mistik bir dille yorumlayacak ve 1-90 arası 6 şanslı sayı üreteceksin. Sayılar numerolojik hesaplamalara göre seçilmeli. Yanıtını JSON formatında döndür:
{
  "interpretation": "Rüya yorumu (2-3 cümle, mistik ve profesyonel dille)",
  "numbers": [6 adet 1-90 arası benzersiz sayı, artan sırada],
  "joker": 1-10 arası bir sayı
}`;

    const userPrompt = `Rüya: "${dreamText}"
${birthDate ? `Doğum tarihi: ${birthDate}` : ''}
${birthTime ? `Doğum saati: ${birthTime}` : ''}

Bu rüyadaki sembolleri numerolojik karşılıklarına çevir ve şanslı numaraları hesapla.`;

    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Analysis failed');
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    
    return {
      interpretation: content.interpretation,
      numbers: content.numbers,
      joker: content.joker,
    };
  } catch (error) {
    console.error('GPT API error:', error);
    throw error;
  }
}
