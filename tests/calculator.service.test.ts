import { CalculatorService } from '../src/calculator.service';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;

  beforeEach(() => {
    calculatorService = new CalculatorService();
  });

  describe('add', () => {
    it('iki pozitif sayıyı toplamalı', () => {
      expect(calculatorService.add(2, 3)).toBe(5);
    });

    it('bir pozitif ve bir negatif sayıyı toplamalı', () => {
      expect(calculatorService.add(5, -3)).toBe(2);
    });

    it('iki negatif sayıyı toplamalı', () => {
      expect(calculatorService.add(-2, -3)).toBe(-5);
    });

    it('ondalıklı sayıları toplamalı', () => {
      expect(calculatorService.add(2.5, 3.5)).toBe(6);
    });
  });

  describe('subtract', () => {
    it('bir sayıdan diğerini çıkarmalı', () => {
      expect(calculatorService.subtract(5, 3)).toBe(2);
    });

    it('negatif sonuç vermeli', () => {
      expect(calculatorService.subtract(3, 5)).toBe(-2);
    });

    it('ondalıklı sayılarla çalışmalı', () => {
      expect(calculatorService.subtract(5.5, 2.2)).toBeCloseTo(3.3);
    });
  });

  describe('multiply', () => {
    it('iki pozitif sayıyı çarpmalı', () => {
      expect(calculatorService.multiply(2, 3)).toBe(6);
    });

    it('bir pozitif ve bir negatif sayıyı çarpmalı', () => {
      expect(calculatorService.multiply(2, -3)).toBe(-6);
    });

    it('iki negatif sayıyı çarpmalı', () => {
      expect(calculatorService.multiply(-2, -3)).toBe(6);
    });

    it('bir sayıyı sıfır ile çarpınca sıfır vermeli', () => {
      expect(calculatorService.multiply(5, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('bir sayıyı diğerine bölmeli', () => {
      expect(calculatorService.divide(6, 2)).toBe(3);
    });

    it('bir sayıyı negatif sayıya bölmeli', () => {
      expect(calculatorService.divide(6, -2)).toBe(-3);
    });

    it('ondalıklı sonuç vermeli', () => {
      expect(calculatorService.divide(5, 2)).toBe(2.5);
    });

    it('sıfıra bölme durumunda hata fırlatmalı', () => {
      expect(() => {
        calculatorService.divide(5, 0);
      }).toThrow('Sıfıra bölme hatası');
    });
  });

  describe('square', () => {
    it('pozitif sayının karesini hesaplamalı', () => {
      expect(calculatorService.square(4)).toBe(16);
    });

    it('negatif sayının karesini hesaplamalı', () => {
      expect(calculatorService.square(-3)).toBe(9);
    });

    it('ondalıklı sayının karesini hesaplamalı', () => {
      expect(calculatorService.square(1.5)).toBe(2.25);
    });

    it('sıfırın karesini hesaplamalı', () => {
      expect(calculatorService.square(0)).toBe(0);
    });
  });
});