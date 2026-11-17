# Currículo ATS — Gerador de Currículos ATS Friendly

Aplicação web desenvolvida com auxílio de inteligência artificial, utilizando o **Lovable**, como projeto final do curso da **DIO**.

## 1. Sobre o projeto

O Currículo ATS é uma aplicação que auxilia candidatos a analisar a compatibilidade de seus currículos com vagas de emprego e a organizar as informações profissionais em um formato mais adequado à leitura por sistemas ATS (*Applicant Tracking Systems*).

O objetivo é oferecer uma ferramenta simples e acessível, que ajude a identificar palavras-chave relevantes e oportunidades de melhoria, sem inventar experiências ou qualificações.

**Aplicação publicada:** https://curriculo-ats-mjr.lovable.app/

## 2. Funcionalidades

- Inserção da descrição de uma vaga de emprego.
- Inserção do currículo por texto ou importação de arquivos PDF e DOCX.
- Análise de compatibilidade entre currículo e vaga.
- Exibição de percentual estimado de correspondência.
- Identificação de palavras-chave encontradas e ausentes.
- Geração de currículo reorganizado para leitura por ATS.
- Visualização e edição do currículo gerado.
- Exportação do currículo em PDF.

## 3. Tecnologias

- **Lovable:** desenvolvimento da aplicação com auxílio de IA.
- **React:** construção da interface.
- **TypeScript:** linguagem utilizada no desenvolvimento.
- **Tailwind CSS:** estilização.
- **shadcn/ui:** componentes de interface.

O MVP foi planejado para funcionar sem autenticação, banco de dados ou integração com APIs externas.

## 4. Desenvolvimento com IA

O desenvolvimento foi realizado por meio de instruções em linguagem natural, utilizando o Lovable para gerar e modificar a aplicação.

### Prompt inicial

O seguinte prompt foi utilizado para construir a primeira versão:

> Crie uma aplicação web simples e responsiva chamada Currículo ATS, utilizando React, Tailwind CSS e componentes shadcn/ui.
>
> Objetivo: ajudar candidatos a adaptar seus currículos às exigências de uma vaga de emprego, sem inventar informações.
>
> A aplicação deve ter uma única página com:
>
> - Dois campos de texto: um para colar a descrição da vaga e outro para colar o currículo original.
> - Um botão Analisar currículo, que apresente um percentual estimado de compatibilidade, palavras-chave encontradas e palavras-chave ausentes.
> - Um botão Gerar currículo otimizado, que organize o conteúdo original em um formato profissional, simples e adequado à leitura por sistemas ATS.
> - Uma área para visualizar e editar o currículo gerado.
> - Um botão Exportar PDF, utilizando a função de impressão do navegador.
>
> Regras essenciais:
>
> - Nunca inventar experiências, habilidades ou qualificações.
> - Calcular a compatibilidade com base na comparação real de palavras-chave entre os textos.
> - Não apresentar resultados fictícios.
> - Preservar as informações originais do candidato.
> - Funcionar sem login, banco de dados, APIs externas ou serviços pagos.
> - Processar os dados localmente no navegador.
>
> Design: visual moderno, limpo e profissional, com cores azul, branco e cinza.
>
> Priorize uma implementação enxuta, funcional e intuitiva, evitando recursos desnecessários.

### Melhorias realizadas

Após a primeira geração, foram realizados testes das funcionalidades principais.

Foi identificada uma oportunidade de melhoria na experiência do usuário: permitir a importação de currículos existentes, evitando a necessidade de copiar e colar manualmente todo o conteúdo.

Para implementar essa funcionalidade, foi utilizado o seguinte prompt:

> Na aplicação existente, adicione a opção de importar currículos nos formatos PDF e DOCX, mantendo também a opção atual de colar texto.
>
> Ao selecionar um arquivo, extraia seu conteúdo textual localmente no navegador e preencha automaticamente o campo do currículo, permitindo que o usuário revise e edite o texto antes da análise.
>
> Utilize bibliotecas JavaScript adequadas para leitura dos arquivos, sem backend ou APIs externas.
>
> Exiba uma mensagem clara caso o arquivo não contenha texto extraível, como PDFs digitalizados.
>
> Importante: preserve todas as funcionalidades existentes, especialmente a análise de compatibilidade, a geração do currículo otimizado e a exportação em PDF. Não altere o layout além do necessário para incluir a importação.

**Resultado:** a aplicação passou a permitir a importação de arquivos PDF e DOCX, preservando as funcionalidades originais.

## 5. Como funciona

O funcionamento segue cinco etapas:

1. O usuário insere a descrição da vaga.
2. Informa seu currículo, colando o texto ou importando um arquivo.
3. A aplicação compara os textos e identifica palavras-chave presentes e ausentes.
4. O usuário gera uma versão reorganizada do currículo, podendo revisar e editar seu conteúdo.
5. O currículo pode ser exportado em PDF.

O percentual apresentado representa uma estimativa de correspondência textual entre currículo e vaga. Não equivale a uma pontuação oficial de um sistema ATS nem garante aprovação em processos seletivos.

A reorganização do currículo é baseada em regras de processamento textual, sem geração de experiências ou qualificações inexistentes.

## 6. Testes realizados

Foram realizados testes manuais das principais funcionalidades:

- [x] Inserção da descrição da vaga.
- [x] Inserção do currículo em texto.
- [x] Cálculo e apresentação do percentual de compatibilidade.
- [x] Identificação de palavras-chave encontradas e ausentes.
- [x] Geração do currículo reorganizado.
- [x] Edição do currículo gerado.
- [x] Exportação para PDF.
- [x] Importação de currículo em DOCX.

Os testes foram executados com dados fictícios, verificando o funcionamento do fluxo principal.

## 7. Limitações

Esta versão é um MVP e possui algumas limitações:

- A análise de compatibilidade utiliza correspondência textual, não avaliação semântica avançada por IA.
- O percentual é indicativo e não representa a avaliação de um ATS específico.
- A importação de documentos complexos ou PDFs digitalizados pode não preservar integralmente o conteúdo.
- O currículo gerado deve ser revisado pelo usuário antes de sua utilização.

## 8. Demonstração

A aplicação está disponível gratuitamente para utilização.

**Acesse:** https://curriculo-ats-mjr.lovable.app/

### Interface e funcionamento

A imagem abaixo apresenta a aplicação em funcionamento, incluindo a análise de compatibilidade entre currículo e vaga.

<img width="1366" height="1561" alt="01" src="https://github.com/user-attachments/assets/589eb8cc-d035-4286-9246-950aeab69462" />

## 9. Considerações finais

O projeto demonstra a utilização de inteligência artificial como ferramenta de apoio ao desenvolvimento de software, desde a definição dos requisitos até a implementação e validação de um MVP funcional.

A proposta foi priorizar simplicidade, experiência do usuário e entrega de valor, evitando funcionalidades que não fossem essenciais para resolver o problema apresentado.

---

**Projeto desenvolvido para o desafio final da DIO, utilizando Lovable.**
