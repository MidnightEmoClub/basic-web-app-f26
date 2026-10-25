function extractNumbers(query: string): number[] {
  const matches = query.match(/-?\d+(?:\.\d+)?/g);
  return matches ? matches.map(Number) : [];
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

  if (query.toLowerCase().includes("plus")) {
    const numbers = extractNumbers(query);
    if (numbers.length === 0) {
      return "";
    }
    return String(numbers.reduce((sum, number) => sum + number, 0));
  }
  return "";
}
