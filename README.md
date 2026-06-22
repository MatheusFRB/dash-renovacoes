# Dash de Renovações — Board Academy

Dashboard de assinaturas conectado à API do Digital Manager Guru, com proxy serverless na Vercel para resolver o CORS.

## Estrutura

```
dash-renovacoes/
├── api/
│   └── guru.js          ← proxy serverless (roda na Vercel, faz a chamada pra Guru)
├── public/
│   └── index.html       ← o dashboard
├── vercel.json          ← config de rotas
├── package.json
└── README.md
```

## Deploy na Vercel (passo a passo)

### Opção A — Via GitHub (recomendado)

1. Crie um repositório no GitHub e faça push desta pasta
2. Acesse https://vercel.com e clique em **Add New Project**
3. Importe o repositório
4. Clique em **Deploy** — sem nenhuma configuração extra
5. Acesse a URL gerada pela Vercel

### Opção B — Via Vercel CLI

```bash
npm i -g vercel
cd dash-renovacoes
vercel
```

Siga as perguntas do CLI (pode aceitar os defaults todos).

## Como usar

1. Acesse a URL do seu deploy
2. Na seção **Empresas conectadas**, preencha nome e Bearer Token de cada empresa
3. Selecione o mês de referência
4. Clique em **Buscar dados**
5. Navegue pelas abas (Consolidado / empresa individual)

Os tokens ficam salvos no navegador (localStorage) — não precisa redigitar sempre.

## Indicadores

| Card | Lógica |
|---|---|
| Assinantes únicos | Todos os status, deduplica por contact_id |
| Ativas | status = active |
| Canceladas no mês | status = canceled + cancelled_at dentro do mês |
| Em renovação | status = started |
| Renovadas no mês | status = active + charged_times ≥ 2 + last_status_at dentro do mês |

## Segurança

O token **nunca sai do seu navegador para terceiros** — ele vai direto para o proxy `/api/guru` que roda no servidor Vercel (mesmo domínio), e esse proxy é que chama a Guru com o token no header.
