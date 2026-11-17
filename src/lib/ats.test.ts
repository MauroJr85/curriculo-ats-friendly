import { describe, it, expect } from "vitest";
import { analyze, optimize, tokenize } from "./ats";
describe("ats", () => {
  it("scores real keyword overlap", () => {
    const r = analyze("React TypeScript Docker", "Experiência com React e Docker");
    expect(r.found.sort()).toEqual(["docker", "react"]);
    expect(r.missing).toEqual(["typescript"]);
    expect(r.score).toBe(67);
  });
  it("empty job gives 0", () => expect(analyze("", "x").score).toBe(0));
  it("never adds words", () => {
    const src = "Maria Silva\nExperiência:\n• Dev na Acme";
    const outWords = new Set(tokenize(optimize(src)));
    const srcWords = new Set([...tokenize(src), "experiencia", "profissional"]);
    outWords.forEach((w) => expect(srcWords.has(w)).toBe(true));
  });
});
