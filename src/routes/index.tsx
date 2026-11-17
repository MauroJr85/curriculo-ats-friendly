import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { analyze, optimize, type Analysis } from "@/lib/ats";
import { FileSearch, FileText, Printer, ShieldCheck, Upload, Loader2 } from "lucide-react";
import { extractResumeText } from "@/lib/import-resume";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Currículo ATS — Adapte seu currículo à vaga" },
      { name: "description", content: "Compare seu currículo com a vaga, veja palavras-chave e gere uma versão compatível com ATS, tudo no navegador." },
      { property: "og:title", content: "Currículo ATS" },
      { property: "og:description", content: "Análise de compatibilidade e currículo otimizado para ATS, sem inventar informações." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [job, setJob] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [output, setOutput] = useState("");
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setImporting(true);
    setImportMsg(null);
    try {
      setResume(await extractResumeText(file));
      setImportMsg({ ok: true, text: `Texto importado de "${file.name}". Revise antes de analisar.` });
    } catch (err) {
      setImportMsg({ ok: false, text: err instanceof Error && err.message ? err.message : "Não foi possível ler o arquivo." });
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="no-print border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-5">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground"><FileSearch className="h-5 w-5" /></div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Currículo ATS</h1>
            <p className="text-sm text-muted-foreground">Adapte seu currículo à vaga, sem inventar nada.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <div className="no-print grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Descrição da vaga</CardTitle></CardHeader>
            <CardContent><Textarea value={job} onChange={(e) => setJob(e.target.value)} placeholder="Cole aqui a descrição da vaga..." className="min-h-64" /></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
              <CardTitle className="text-base">Currículo original</CardTitle>
              <Button asChild variant="outline" size="sm" disabled={importing}>
                <label className="cursor-pointer">
                  {importing ? <Loader2 className="animate-spin" /> : <Upload />} Importar PDF/DOCX
                  <input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" onChange={handleFile} disabled={importing} />
                </label>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Cole aqui o texto do seu currículo ou importe um arquivo..." className="min-h-64" />
              {importMsg && <p role="status" className={`text-sm ${importMsg.ok ? "text-muted-foreground" : "text-destructive"}`}>{importMsg.text}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="no-print flex flex-wrap gap-3">
          <Button size="lg" disabled={!job.trim() || !resume.trim()} onClick={() => setResult(analyze(job, resume))}>
            <FileSearch /> Analisar currículo
          </Button>
          <Button size="lg" variant="outline" disabled={!resume.trim()} onClick={() => setOutput(optimize(resume))}>
            <FileText /> Gerar currículo otimizado
          </Button>
        </div>

        {result && (
          <Card className="no-print">
            <CardHeader><CardTitle className="text-base">Resultado da análise</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="mb-2 flex items-end justify-between">
                  <span className="text-sm text-muted-foreground">Compatibilidade estimada</span>
                  <span className="text-3xl font-bold text-primary">{result.score}%</span>
                </div>
                <Progress value={result.score} />
                <p className="mt-2 text-xs text-muted-foreground">
                  {result.found.length} de {result.found.length + result.missing.length} palavras-chave da vaga aparecem no seu currículo.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <KeywordList title="Encontradas" items={result.found} variant="default" />
                <KeywordList title="Ausentes" items={result.missing} variant="secondary" />
              </div>
              <p className="flex items-start gap-2 rounded-md bg-accent p-3 text-sm text-accent-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                Inclua palavras ausentes apenas se você realmente possui essa experiência ou habilidade.
              </p>
            </CardContent>
          </Card>
        )}

        {output && (
          <Card className="print-card">
            <CardHeader className="no-print flex flex-row items-center justify-between gap-2 space-y-0">
              <CardTitle className="text-base">Currículo otimizado (editável)</CardTitle>
              <Button onClick={() => window.print()}><Printer /> Exportar PDF</Button>
            </CardHeader>
            <CardContent>
              <Textarea value={output} onChange={(e) => setOutput(e.target.value)} className="no-print min-h-[28rem] font-mono text-sm" />
              <pre className="print-only whitespace-pre-wrap font-sans text-sm leading-relaxed">{output}</pre>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

function KeywordList({ title, items, variant }: { title: string; items: string[]; variant: "default" | "secondary" }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title} ({items.length})</h3>
      <div className="flex flex-wrap gap-1.5">
        {items.length ? items.map((k) => <Badge key={k} variant={variant}>{k}</Badge>) : <span className="text-sm text-muted-foreground">Nenhuma</span>}
      </div>
    </div>
  );
}
