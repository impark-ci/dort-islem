# Hesap Makinesi API

Bu proje, temel matematiksel işlemleri (toplama, çıkarma, çarpma, bölme, kare alma) yapabilen bir REST API sunucusudur. TypeScript ve Express.js kullanılarak geliştirilmiştir.

## Kurulum

```bash
# Bağımlılıkları yükleme
npm install

# Geliştirme sunucusunu başlatma
npm run dev

# Derleme
npm run build

# Derlenen uygulamayı çalıştırma
npm start
```

## API Kullanımı

### GET Metodları

- `GET /`: Ana sayfa
- `GET /api/calculate/add/:a/:b`: İki sayıyı toplar
- `GET /api/calculate/subtract/:a/:b`: İlk sayıdan ikinci sayıyı çıkarır
- `GET /api/calculate/multiply/:a/:b`: İki sayıyı çarpar
- `GET /api/calculate/divide/:a/:b`: İlk sayıyı ikinci sayıya böler
- `GET /api/calculate/square/:a`: Bir sayının karesini hesaplar

### POST Metodu

- `POST /api/calculate`: JSON formatında işlem yapar

Örnek istek (iki operand gerektiren işlemler için):
```json
{
  "operation": "add", // add, subtract, multiply, divide
  "a": 5,
  "b": 3
}
```

Örnek istek (tek operand gerektiren işlemler için):
```json
{
  "operation": "square",
  "a": 5
}
```

Örnek cevap:
```json
{
  "operation": "add",
  "a": 5,
  "b": 3,
  "result": 8
}
```

Kare hesaplama için örnek cevap:
```json
{
  "operation": "square",
  "a": 5,
  "result": 25
}
```

## Testler

Testleri çalıştırmak için:

```bash
npm test
```

## Kullanılan Teknolojiler

- TypeScript
- Express.js
- Jest
- Supertest