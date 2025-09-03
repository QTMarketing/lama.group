export type PasswordChecks = {
  length: boolean;      // >= 8 chars
  upperLower: boolean;  // has both upper & lower
  number: boolean;      // has digit
  special: boolean;     // one of ! @ # ? ]
  noAngles: boolean;    // excludes < and >
  score: 0 | 1 | 2 | 3 | 4; // how many of the first 4 are satisfied
};

/**
 * Evaluates password against specified rules.
 * - Strength score counts only the first 4 rules:
 *   length, upperLower, number, special.
 * - noAngles is enforced separately (must be true) but does not add to strength.
 */
export function checkPassword(pwd: string): PasswordChecks {
  const length = pwd.length >= 8;
  const upperLower = /[A-Z]/.test(pwd) && /[a-z]/.test(pwd);
  const number = /\d/.test(pwd);
  const special = /[!@#?\]]/.test(pwd); // only these specials
  const noAngles = !/[<>]/.test(pwd);

  let score = 0 as 0 | 1 | 2 | 3 | 4;
  [length, upperLower, number, special].forEach((ok) => {
    if (ok) score = (score + 1) as PasswordChecks["score"];
  });

  return { length, upperLower, number, special, noAngles, score };
}

export function strengthLabelFromScore(score: 0 | 1 | 2 | 3 | 4): "Weak" | "Medium" | "Strong" | "Very Strong" | "Empty" {
  if (score === 0) return "Empty";
  if (score === 1) return "Weak";
  if (score === 2) return "Medium";
  if (score === 3) return "Strong";
  return "Very Strong";
}


