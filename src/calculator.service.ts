/**
 * Hesap makinesi servisi
 * 4 temel matematiksel işlemi gerçekleştirir
 */
export class CalculatorService {
  /**
   * İki sayıyı toplar
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * İlk sayıdan ikinci sayıyı çıkarır
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * İki sayıyı çarpar
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * İlk sayıyı ikinci sayıya böler
   * @throws Error sıfıra bölme durumunda
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Sıfıra bölme hatası');
    }
    return a / b;
  }
}