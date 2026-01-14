/**
 * Analiz Servisleri
 * Her servis için özel analiz mantığı (mock data ama gerçekçi)
 */

interface DreamAnalysis {
  interpretation: string;
  numbers: number[];
  joker?: number;
  symbols?: string[];
  energyLevel?: number;
}

interface NumerologyAnalysis {
  lifePath: number;
  expression: number;
  personality: number;
  luckyNumbers: number[];
  interpretation: string;
}

interface CoffeeAnalysis {
  symbols: string[];
  interpretation: string;
  luckyNumbers: number[];
  timeFrame: string;
}

interface TarotAnalysis {
  cards: Array<{ name: string; meaning: string; position: string }>;
  interpretation: string;
  guidance: string;
}

interface LotteryAnalysis {
  numbers: number[];
  joker?: number;
  interpretation: string;
  gameType: string;
}

/**
 * Rüya metninden semboller çıkar ve gerçekçi sayılar üret
 */
function extractDreamSymbols(text: string): string[] {
  const symbols: string[] = [];
  const textLower = text.toLowerCase();
  
  // Yaygın rüya sembolleri
  const symbolMap: Record<string, string[]> = {
    'yılan': ['yılan', 'snake'],
    'su': ['su', 'deniz', 'nehir', 'göl'],
    'elma': ['elma', 'apple'],
    'para': ['para', 'altın', 'banknot'],
    'ev': ['ev', 'evim', 'evimiz', 'house'],
    'araba': ['araba', 'araç', 'car'],
    'köpek': ['köpek', 'dog'],
    'kedi': ['kedi', 'cat'],
    'kuş': ['kuş', 'bird'],
    'ağaç': ['ağaç', 'tree'],
    'çiçek': ['çiçek', 'flower'],
    'bebek': ['bebek', 'baby'],
    'ölüm': ['ölüm', 'ölü', 'death'],
    'uçmak': ['uçmak', 'uçtu', 'fly'],
    'düşmek': ['düşmek', 'düştü', 'fall'],
  };
  
  Object.entries(symbolMap).forEach(([symbol, keywords]) => {
    if (keywords.some(keyword => textLower.includes(keyword))) {
      symbols.push(symbol);
    }
  });
  
  return symbols.slice(0, 5); // Maksimum 5 sembol
}

/**
 * Sembollere göre numerolojik sayı üret (gerçekçi)
 */
function symbolsToNumbers(symbols: string[]): number[] {
  const numbers = new Set<number>();
  
  // Her sembol için sayısal değer
  const symbolValues: Record<string, number[]> = {
    'yılan': [7, 14, 21],
    'su': [3, 12, 30],
    'elma': [5, 15, 25],
    'para': [8, 18, 28],
    'ev': [4, 13, 22],
    'araba': [6, 16, 26],
    'köpek': [2, 11, 20],
    'kedi': [9, 19, 29],
    'kuş': [1, 10, 31],
    'ağaç': [7, 17, 27],
    'çiçek': [5, 15, 35],
    'bebek': [3, 13, 23],
    'ölüm': [13, 31],
    'uçmak': [11, 22, 33],
    'düşmek': [9, 18, 27],
  };
  
  symbols.forEach(symbol => {
    const values = symbolValues[symbol] || [Math.floor(Math.random() * 45) + 1];
    values.forEach(val => {
      if (val <= 90) numbers.add(val);
    });
  });
  
  // Eksik sayıları doldur
  while (numbers.size < 6) {
    const num = Math.floor(Math.random() * 90) + 1;
    if (!numbers.has(num)) numbers.add(num);
  }
  
  return Array.from(numbers).slice(0, 6).sort((a, b) => a - b);
}

/**
 * Rüya analizi yap
 */
export function analyzeDream(dreamText: string): DreamAnalysis {
  const symbols = extractDreamSymbols(dreamText);
  const numbers = symbolsToNumbers(symbols);
  const joker = Math.floor(Math.random() * 10) + 1;
  
  // Rüya içeriğine göre yorum
  let interpretation = '';
  if (symbols.length > 0) {
    interpretation = `Rüyanızdaki ${symbols.join(', ')} sembolleri güçlü kozmik mesajlar taşıyor. `;
  }
  
  if (dreamText.toLowerCase().includes('su') || dreamText.toLowerCase().includes('deniz')) {
    interpretation += 'Su, duygusal temizliği ve yenilenmeyi işaret eder. Enerji seviyeniz yüksek, önemli kararlar almak için uygun bir dönemdesiniz.';
  } else if (dreamText.toLowerCase().includes('para') || dreamText.toLowerCase().includes('altın')) {
    interpretation += 'Maddi güç sembolleri, bolluk ve bereketi işaret ediyor. Finansal konularda şansınız yüksek.';
  } else if (dreamText.toLowerCase().includes('yılan')) {
    interpretation += 'Yılan sembolü, dönüşüm ve yenilenmeyi temsil eder. Hayatınızda önemli değişiklikler kapıda.';
  } else {
    interpretation += 'Rüyanızdaki semboller, kozmik enerjilerle uyum içinde olduğunuzu gösteriyor. Şansınızın zirvesinde olduğunuzu unutmayın.';
  }
  
  return {
    interpretation,
    numbers,
    joker,
    symbols,
    energyLevel: 75 + Math.floor(Math.random() * 20),
  };
}

/**
 * Numeroloji analizi
 */
export function analyzeNumerology(name: string, birthDate: string): NumerologyAnalysis {
  // İsimden sayısal değer
  const nameValue = name.toLowerCase().split('').reduce((acc, char) => {
    const code = char.charCodeAt(0) - 96;
    return acc + (code > 0 && code < 27 ? ((code - 1) % 9) + 1 : 0);
  }, 0);
  
  // Doğum tarihinden sayısal değer
  const dateNumbers = birthDate.replace(/-/g, '').split('').map(Number).reduce((a, b) => a + b, 0);
  const lifePath = (dateNumbers % 9) || 9;
  const expression = (nameValue % 9) || 9;
  const personality = (lifePath + expression) % 9 || 9;
  
  // Şanslı numaralar
  const luckyNumbers: number[] = [];
  while (luckyNumbers.length < 6) {
    const num = (lifePath * (luckyNumbers.length + 1) + Math.floor(Math.random() * 10)) % 90 + 1;
    if (!luckyNumbers.includes(num)) luckyNumbers.push(num);
  }
  
  return {
    lifePath,
    expression,
    personality,
    luckyNumbers: luckyNumbers.sort((a, b) => a - b),
    interpretation: `Doğum tarihinize göre yaşam yolunuz ${lifePath}, ifade sayınız ${expression}. Bu sayılar, kişiliğinizin derin katmanlarını yansıtıyor ve kozmik enerjinizle uyum içinde.`,
  };
}

/**
 * Kahve falı analizi
 */
export function analyzeCoffee(symbols: string[]): CoffeeAnalysis {
  const interpretation = symbols.length > 0
    ? `Fincanınızda ${symbols.slice(0, 3).join(', ')} sembolleri görünüyor. Bu semboller, yakın geleceğinizde önemli gelişmelerin habercisi.`
    : 'Fincanınızda güçlü enerji desenleri görünüyor. Önümüzdeki haftalarda şansınız yüksek olacak.';
  
  const luckyNumbers: number[] = [];
  while (luckyNumbers.length < 6) {
    const num = Math.floor(Math.random() * 90) + 1;
    if (!luckyNumbers.includes(num)) luckyNumbers.push(num);
  }
  
  return {
    symbols: symbols.slice(0, 5),
    interpretation,
    luckyNumbers: luckyNumbers.sort((a, b) => a - b),
    timeFrame: 'Önümüzdeki 2-3 hafta',
  };
}

/**
 * Tarot analizi
 */
export function analyzeTarot(): TarotAnalysis {
  const cards = [
    { name: 'The Fool', meaning: 'Yeni başlangıçlar', position: 'Geçmiş' },
    { name: 'The Magician', meaning: 'Eylem ve irade', position: 'Şimdi' },
    { name: 'The Star', meaning: 'Umut ve rehberlik', position: 'Gelecek' },
  ];
  
  return {
    cards,
    interpretation: 'Kartlarınız, hayatınızda önemli bir dönüşüm noktasında olduğunuzu gösteriyor. Geçmişten aldığınız dersler, şimdiki eylemlerinizle birleşerek parlak bir gelecek yaratıyor.',
    guidance: 'İç sesinize güvenin ve cesaretle ilerleyin. Evren sizinle.',
  };
}

/**
 * Şans tahmini (Loto)
 */
export function analyzeLottery(gameType: string, birthDate?: string): LotteryAnalysis {
  let numbers: number[] = [];
  const maxNumber = gameType === 'onnumara' ? 80 : gameType === 'sans' ? 34 : 54;
  const count = gameType === 'onnumara' ? 10 : gameType === 'sans' ? 5 : 6;
  
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * maxNumber) + 1;
    if (!numbers.includes(num)) numbers.push(num);
  }
  
  numbers = numbers.sort((a, b) => a - b);
  
  const getGameName = (type: string) => {
    if (type === 'sans') return 'Şans Topu';
    if (type === 'sayisal') return 'Sayısal';
    if (type === 'super') return 'Süper';
    if (type === 'onnumara') return 'On Numara';
    return 'Loto';
  };

  if (gameType === 'sans') {
    const joker = Math.floor(Math.random() * 14) + 1;
    return {
      numbers,
      joker,
      interpretation: `Kişisel enerji haritanıza göre şanslı kombinasyonunuz hazır. ${getGameName(gameType)} için özel numaralarınız.`,
      gameType,
    };
  }
  
  return {
    numbers,
    interpretation: `Kişisel enerji haritanıza göre şanslı kombinasyonunuz hazır. ${getGameName(gameType)} için özel numaralarınız.`,
    gameType,
  };
}
