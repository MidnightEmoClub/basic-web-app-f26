function extractNumbers(query: string): number[] {
  const matches = query.match(/-?\d+(?:\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

function isPrime(value: number): boolean {
  if (!Number.isInteger(value) || value < 2) {
    return false;
  }
  if (value < 4) {
    return true;
  }
  if (value % 2 === 0) {
    return false;
  }
  for (let divisor = 3; divisor * divisor <= value; divisor += 2) {
    if (value % divisor === 0) {
      return false;
    }
  }
  return true;
}

function bigIntPower(base: bigint, exponent: bigint): bigint {
  let result = BigInt(1);
  let factor = base;
  let remaining = exponent;
  const two = BigInt(2);
  const one = BigInt(1);
  const zero = BigInt(0);

  while (remaining > zero) {
    if (remaining % two === one) {
      result *= factor;
    }
    factor *= factor;
    remaining /= two;
  }

  return result;
}

export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Joey";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "wentaod"
  }

  if (query.toLowerCase().includes("largest")) {
    const numbers = extractNumbers(query);
    if (numbers.length === 0) {
      return "";
    }
    return String(Math.max(...numbers));
  }

  if (query.toLowerCase().includes("prime")) {
    const primes = extractNumbers(query).filter(isPrime);
    if (primes.length === 0) {
      return "";
    }
    return primes.join(", ");
  }

  if (query.toLowerCase().includes("power")) {
    const [base, exponent] = extractNumbers(query);
    if (base === undefined || exponent === undefined) {
      return "";
    }
    if (!Number.isInteger(base) || !Number.isInteger(exponent) || exponent < 0) {
      return String(Math.pow(base, exponent));
    }
    return bigIntPower(BigInt(base), BigInt(exponent)).toString();
  }

  if (query.toLowerCase().includes("plus")) {
    const numbers = extractNumbers(query);
    if (numbers.length === 0) {
      return "";
    }
    return String(numbers.reduce((sum, number) => sum + number, 0));
  }
  return "";
}
