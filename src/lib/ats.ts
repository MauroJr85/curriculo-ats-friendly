const STOP = new Set(`a o as os um uma uns umas de do da dos das em no na nos nas por para pelo pela pelos pelas com sem sob sobre entre e ou mas que se como ao aos à às é ser são foi está estão ter tem têm seu sua seus suas nosso nossa você voce eles elas ele ela isso este esta esse essa aquele mais menos muito muita muitos muitas também tambem já ja não nao sim todo toda todos todas cada qual quais onde quando bem pode podem deve devem será sera serão etc vaga vagas empresa candidato candidata buscamos procuramos requisitos desejável desejavel diferencial diferenciais experiência experiencia conhecimento conhecimentos atividades responsabilidades área area anos ano nível nivel boa bom forte fortes trabalho atuar atuação the and or of to in for with on at by an is are be as from our your you we will this that de los las del y`.split(/\s+/));

export function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function tokenize(text: string): string[] {
  return (normalize(text).match(/[a-z0-9][a-z0-9+#.\-]*[a-z0-9+#]|[a-z0-9]/g) ?? [])
    .filter((w) => w.length > 2 || /^[a-z]#|c\+\+$/.test(w))
    .filter((w) => !STOP.has(w) && !/^\d+$/.test(w));
}

/** Extract job keywords: unique terms + recurring two-word phrases. Max 40, ranked by frequency. */
export function extractKeywords(job: string): string[] {
  const words = tokenize(job);
  const freq = new Map<string, number>();
  words.forEach((w) => freq.set(w, (freq.get(w) ?? 0) + 1));
  for (let i = 0; i < words.length - 1; i++) {
    const bg = `${words[i]} ${words[i + 1]}`;
    freq.set(bg, (freq.get(bg) ?? 0) + 0);
  }
  const bigramCounts = new Map<string, number>();
  for (let i = 0; i < words.length - 1; i++) {
    const bg = `${words[i]} ${words[i + 1]}`;
    bigramCounts.set(bg, (bigramCounts.get(bg) ?? 0) + 1);
  }
  const singles = [...new Set(words)].sort((a, b) => (freq.get(b)! - freq.get(a)!));
  const bigrams = [...bigramCounts].filter(([, c]) => c >= 2).map(([b]) => b);
  return [...bigrams, ...singles].slice(0, 40);
}

export interface Analysis { score: number; found: string[]; missing: string[]; }

export function analyze(job: string, resume: string): Analysis {
  const kws = extractKeywords(job);
  const resumeTokens = tokenize(resume);
  const set = new Set(resumeTokens);
  const joined = " " + resumeTokens.join(" ") + " ";
  const found: string[] = [], missing: string[] = [];
  for (const k of kws) {
    (k.includes(" ") ? joined.includes(` ${k} `) : set.has(k)) ? found.push(k) : missing.push(k);
  }
  const score = kws.length ? Math.round((found.length / kws.length) * 100) : 0;
  return { score, found, missing };
}

const SECTIONS: [string, RegExp][] = [
  ["RESUMO PROFISSIONAL", /^(resumo|perfil|objetivo|sobre( mim)?|summary|profile)/],
  ["EXPERIÊNCIA PROFISSIONAL", /^(experiencia|experiencias|historico profissional|experience)/],
  ["FORMAÇÃO ACADÊMICA", /^(formacao|educacao|escolaridade|education)/],
  ["HABILIDADES", /^(habilidades|competencias|conhecimentos|skills|tecnologias)/],
  ["CERTIFICAÇÕES E CURSOS", /^(certificac|cursos|certifications)/],
  ["IDIOMAS", /^(idiomas|languages)/],
];

/** Reorganize the original text into plain ATS-friendly sections. Never adds content. */
export function optimize(resume: string): string {
  const lines = resume.replace(/\r/g, "").split("\n").map((l) => l.replace(/\s+/g, " ").trim());
  const out: string[] = [];
  for (const raw of lines) {
    if (!raw) { if (out.length && out[out.length - 1] !== "") out.push(""); continue; }
    const key = normalize(raw).replace(/[:\-–—]+$/, "").trim();
    const sec = key.length < 40 ? SECTIONS.find(([, re]) => re.test(key)) : undefined;
    if (sec) {
      if (out.length && out[out.length - 1] !== "") out.push("");
      out.push(sec[0]);
      continue;
    }
    out.push(raw.replace(/^[•●▪■◆►✓✔*·\-–—]\s*/, "- ").replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim());
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
