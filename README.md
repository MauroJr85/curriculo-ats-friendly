# Curriculo Ats Mjr

Crie uma aplicação web simples e responsiva chamada Currículo ATS, utilizando React, Tailwind CSS e componentes shadcn/ui.

Objetivo: ajudar candidatos a adaptar seus currículos às exigências de uma vaga de emprego, sem inventar informações.

A aplicação deve ter uma única página com:

Dois campos de texto: um para colar a descrição da vaga e outro para colar o currículo original.

Um botão Analisar currículo, que apresente um percentual estimado de compatibilidade, palavras-chave encontradas e palavras-chave ausentes.

Um botão Gerar currículo otimizado, que organize o conteúdo original em um formato profissional, simples e adequado à leitura por sistemas ATS.

Uma área para visualizar e editar o currículo gerado.

Um botão Exportar PDF, utilizando a função de impressão do navegador.

Regras essenciais:

Nunca inventar experiências, habilidades ou qualificações.

Calcular a compatibilidade com base na comparação real de palavras-chave entre os textos.

Não apresentar resultados fictícios.

Preservar as informações originais do candidato.

Funcionar sem login, banco de dados, APIs externas ou serviços pagos.

Processar os dados localmente no navegador.

Design: visual moderno, limpo e profissional, com cores azul, branco e cinza.

Priorize uma implementação enxuta, funcional e intuitiva, evitando recursos desnecessários.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://curriculo-ats-mjr.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/aa5d899c-3f67-42ae-9670-3c0976aafd8a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
