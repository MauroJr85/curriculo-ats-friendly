// Browser-only: call from event handlers. Libraries are loaded on demand.
export async function extractResumeText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const buf = await file.arrayBuffer();
  let text = "";
  if (name.endsWith(".pdf")) {
    const pdfjs = await import("pdfjs-dist");
    const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
    const pages: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const content = await (await pdf.getPage(i)).getTextContent();
      let line = "";
      const lines: string[] = [];
      for (const item of content.items) {
        if (!("str" in item)) continue;
        line += item.str;
        if (item.hasEOL) { lines.push(line); line = ""; }
      }
      if (line) lines.push(line);
      pages.push(lines.join("\n"));
    }
    text = pages.join("\n\n");
  } else if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth");
    text = (await mammoth.extractRawText({ arrayBuffer: buf })).value;
  } else {
    throw new Error("Formato não suportado. Use PDF ou DOCX.");
  }
  text = text.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!text) throw new Error("Não foi possível extrair texto deste arquivo. Ele pode ser um PDF digitalizado (imagem). Cole o texto manualmente.");
  return text;
}
