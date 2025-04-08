import express, { Request, Response } from 'express';
import { CalculatorService } from './calculator.service';

const app = express();
const port = process.env.PORT || 3000;
const calculatorService = new CalculatorService();

app.use(express.json());

// Ana sayfa
app.get('/', (req: Request, res: Response) => {
  res.send('Hesap Makinesi API - Kullanım: /api/calculate/add/5/3 gibi');
});

// İşlem rotaları
app.get('/api/calculate/add/:a/:b', (req: Request, res: Response) => {
  try {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    
    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Geçersiz sayısal değerler' });
    }
    
    const result = calculatorService.add(a, b);
    res.json({ operation: 'add', a, b, result });
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

app.get('/api/calculate/subtract/:a/:b', (req: Request, res: Response) => {
  try {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    
    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Geçersiz sayısal değerler' });
    }
    
    const result = calculatorService.subtract(a, b);
    res.json({ operation: 'subtract', a, b, result });
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

app.get('/api/calculate/multiply/:a/:b', (req: Request, res: Response) => {
  try {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    
    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Geçersiz sayısal değerler' });
    }
    
    const result = calculatorService.multiply(a, b);
    res.json({ operation: 'multiply', a, b, result });
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

app.get('/api/calculate/divide/:a/:b', (req: Request, res: Response) => {
  try {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    
    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Geçersiz sayısal değerler' });
    }
    
    const result = calculatorService.divide(a, b);
    res.json({ operation: 'divide', a, b, result });
  } catch (error) {
    if (error instanceof Error && error.message === 'Sıfıra bölme hatası') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

// Kare Hesaplama Endpoint'i
app.get('/api/calculate/square/:a', (req: Request, res: Response) => {
  try {
    const a = parseFloat(req.params.a);
    
    if (isNaN(a)) {
      return res.status(400).json({ error: 'Geçersiz sayısal değer' });
    }
    
    const result = calculatorService.square(a);
    res.json({ operation: 'square', a, result });
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

// JSON API tüm işlemler için
app.post('/api/calculate', (req: Request, res: Response) => {
  try {
    const { operation, a, b } = req.body;
    
    if (operation === 'square') {
      // Kare işlemi için sadece bir sayı gerekli
      if (typeof a !== 'number') {
        return res.status(400).json({ error: 'a sayısal bir değer olmalıdır' });
      }
      
      const result = calculatorService.square(a);
      return res.json({ operation, a, result });
    }
    
    // Diğer işlemler için iki sayı gerekli
    if (typeof a !== 'number' || typeof b !== 'number') {
      return res.status(400).json({ error: 'a ve b sayısal değerler olmalıdır' });
    }
    
    let result: number;
    
    switch (operation) {
      case 'add':
        result = calculatorService.add(a, b);
        break;
      case 'subtract':
        result = calculatorService.subtract(a, b);
        break;
      case 'multiply':
        result = calculatorService.multiply(a, b);
        break;
      case 'divide':
        result = calculatorService.divide(a, b);
        break;
      default:
        return res.status(400).json({ error: 'Geçersiz işlem. Kullanılabilir işlemler: add, subtract, multiply, divide, square' });
    }
    
    res.json({ operation, a, b, result });
  } catch (error) {
    if (error instanceof Error && error.message === 'Sıfıra bölme hatası') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

// Sunucu başlatma
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
  });
}

export default app;