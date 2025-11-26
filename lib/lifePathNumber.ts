/**
 * Calculate life path number from birthday (mm/dd/yyyy)
 * Life path number is calculated by reducing the date to a single digit (1-9) or master numbers (11, 22, 33)
 */
export function calculateLifePathNumber(birthday: string): number {
  // Parse the date (format: mm/dd/yyyy)
  const [month, day, year] = birthday.split('/').map(Number);
  
  if (!month || !day || !year || isNaN(month) || isNaN(day) || isNaN(year)) {
    throw new Error('Invalid date format. Please use mm/dd/yyyy');
  }
  
  // Validate date
  const date = new Date(year, month - 1, day);
  if (date.getMonth() !== month - 1 || date.getDate() !== day || date.getFullYear() !== year) {
    throw new Error('Invalid date');
  }
  
  // Reduce month, day, year to single digits
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };
  
  const monthReduced = reduceToSingleDigit(month);
  const dayReduced = reduceToSingleDigit(day);
  const yearReduced = reduceToSingleDigit(year);
  
  // Sum them up
  let lifePath = monthReduced + dayReduced + yearReduced;
  
  // Reduce to single digit or master number
  lifePath = reduceToSingleDigit(lifePath);
  
  return lifePath;
}

/**
 * Get life path number meaning (for context in prompts)
 */
export function getLifePathMeaning(number: number): string {
  const meanings: Record<number, string> = {
    1: 'Leader, independent, pioneering, ambitious',
    2: 'Cooperative, diplomatic, peacemaker, intuitive',
    3: 'Creative, expressive, optimistic, social',
    4: 'Practical, organized, disciplined, reliable',
    5: 'Adventurous, freedom-loving, curious, versatile',
    6: 'Nurturing, responsible, caring, harmonious',
    7: 'Spiritual, analytical, introspective, wise',
    8: 'Ambitious, material success, authoritative, powerful',
    9: 'Humanitarian, compassionate, idealistic, wise',
    11: 'Intuitive, inspirational, idealistic, spiritual teacher',
    22: 'Master builder, practical idealist, powerful manifestor',
    33: 'Master teacher, compassionate healer, spiritual guide'
  };
  
  return meanings[number] || 'Unique path of self-discovery';
}

