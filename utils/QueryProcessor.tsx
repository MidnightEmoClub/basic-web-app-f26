function extractNumbers(query: string): number[] {
  const matches = query.match(/-?\d+(?:\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

const ARITHMETIC_PATTERN =
  /\bplus\b|\bminus\b|\bmultiplied\s+by\b|\btimes\b|\bdivided\s+by\b|-?\d+(?:\.\d+)?/gi;

function evaluateArithmetic(query: string): number | null {
  const tokens = query.match(ARITHMETIC_PATTERN) || [];
  const values: number[] = [];
  const operators: string[] = [];
  let expectingNumber = true;

  for (const token of tokens) {
    if (/^-?\d+(?:\.\d+)?$/.test(token)) {
      if (!expectingNumber) {
        return null;
      }
      values.push(Number(token));
      expectingNumber = false;
    } else {
      if (expectingNumber) {
        return null;
      }
      operators.push(token.toLowerCase().replace(/\s+/g, " "));
      expectingNumber = true;
    }
  }

  if (values.length !== operators.length + 1) {
    return null;
  }

  const reducedValues = values.slice();
  const reducedOperators = operators.slice();

  let index = 0;
  while (index < reducedOperators.length) {
    const operator = reducedOperators[index];
    if (
      operator === "multiplied by" ||
      operator === "times" ||
      operator === "divided by"
    ) {
      const left = reducedValues[index];
      const right = reducedValues[index + 1];
      const result = operator === "divided by" ? left / right : left * right;
      reducedValues.splice(index, 2, result);
      reducedOperators.splice(index, 1);
    } else {
      index++;
    }
  }

  let result = reducedValues[0];
  for (let i = 0; i < reducedOperators.length; i++) {
    result =
      reducedOperators[i] === "plus"
        ? result + reducedValues[i + 1]
        : result - reducedValues[i + 1];
  }

  return result;
}

const SCRABBLE_VALUES: { [letter: string]: number } = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1,
  j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1,
  s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
};

function sortLetters(word: string): string {
  return word.toLowerCase().split("").sort().join("");
}

function scrabbleScore(word: string): number {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += SCRABBLE_VALUES[word[i].toLowerCase()] || 0;
  }
  return score;
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

  if (query.toLowerCase().includes("anagram")) {
    const targetMatch = query.match(/anagram\s+of\s+([a-z]+)/i);
    const colonIndex = query.indexOf(":");
    if (!targetMatch || colonIndex === -1) {
      return "";
    }

    const target = sortLetters(targetMatch[1]);
    const anagrams = query
      .slice(colonIndex + 1)
      .split(",")
      .map((candidate) => candidate.replace(/[^a-z]/gi, ""))
      .filter((candidate) => candidate.length > 0)
      .filter((candidate) => sortLetters(candidate) === target);

    if (anagrams.length === 0) {
      return "";
    }
    return anagrams.join(", ");
  }

  if (query.toLowerCase().includes("scrabble")) {
    const wordMatch = query.match(/scrabble\s+score\s+(?:of|for)\s+([a-z]+)/i);
    if (!wordMatch) {
      return "";
    }
    return String(scrabbleScore(wordMatch[1]));
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

  if (/\b(plus|minus|multiplied\s+by|times|divided\s+by)\b/i.test(query)) {
    const result = evaluateArithmetic(query);
    return result === null ? "" : String(result);
  }
  return "";
}
