# This Week in Rust - Portuguese Translator

Este workflow automatiza a tradução da newsletter semanal "This Week in Rust" para português brasileiro.

## 🚀 Como Funciona

1. **Agendamento**: Roda toda quarta-feira às 12:00 UTC (ou manualmente via workflow_dispatch)
2. **Fetch**: Busca a última edição do This Week in Rust via RSS feed
3. **Tradução**: Traduz o conteúdo usando GitHub Copilot CLI (ou outras alternativas)
4. **Criação**: Cria um novo post em markdown no formato do seu blog
5. **Pull Request**: Abre automaticamente um PR para revisão

## 📋 Configuração Necessária

### 1. Obter API Key para Tradução

Você tem várias opções de serviços de tradução:

#### Opção A: GitHub Copilot CLI (⭐ RECOMENDADO - Incluído no Copilot!)
- **Incluído** na sua assinatura GitHub Copilot!
- Melhor integração com GitHub Actions
- Alta qualidade de tradução
- Instalação automática no workflow

**Como configurar**:
1. Certifique-se de ter acesso ao GitHub Copilot
2. Crie um Personal Access Token (PAT) em: https://github.com/settings/tokens?type=beta
3. Selecione as permissões:
   - Repository access: Este repositório
   - Permissions → Copilot: **Read and write**
4. Copie o token
5. Adicione como secret `COPILOT_GITHUB_TOKEN` no seu repositório

#### Opção B: GitHub Models (GRÁTIS)
- **GRÁTIS** com sua conta GitHub!
- Usa o `GITHUB_TOKEN` que já está disponível automaticamente
- Acesso a modelos: GPT-4o-mini, GPT-4o, Claude, Llama, etc.
- Saiba mais: https://github.com/marketplace/models
- **Sem configuração extra necessária!**

#### Opção C: DeepL (Bom para tradução técnica)
- Crie uma conta gratuita em: https://www.deepl.com/pro-api
- Plano gratuito: 500.000 caracteres/mês
- Copie sua API Key

#### Opção D: OpenAI (Alta qualidade, mas pago)
- Crie uma conta em: https://platform.openai.com/
- Adicione créditos (recomendado: $5-10)
- Crie uma API Key em: https://platform.openai.com/api-keys

### 2. Configurar GitHub Secrets

**Se usar Copilot CLI** (recomendado):
1. Vá para seu repositório no GitHub
2. Settings → Secrets and variables → Actions
3. Clique em "New repository secret"
4. Nome: `COPILOT_GITHUB_TOKEN`
5. Valor: Cole seu Personal Access Token

**Se usar GitHub Models**: Nenhuma configuração necessária! ✨

**Se preferir DeepL ou OpenAI**: Adicione `DEEPL_API_KEY` ou `OPENAI_API_KEY`

### 3. Testar o Workflow

1. Vá para Actions → "This Week in Rust - Portuguese Translation"
2. Clique em "Run workflow"
3. Aguarde alguns minutos
4. Um PR será criado automaticamente se houver novo conteúdo

## 📁 Estrutura de Arquivos

```
.github/
├── workflows/
│   └── twir-translator.yml    # Workflow principal
└── scripts/
    ├── translate-twir.py      # Script de tradução
    └── README.md              # Esta documentação
```

## 🎯 Formato do Post

O post gerado terá esta estrutura:

```yaml
---
pt-BR:
  layout: post
  date: 2024-02-27 12:00:00
  main-class: rust
  color: '#CE422B'
  tags:
    - rust
    - newsletter
    - this-week-in-rust
    - tradução
  title: "This Week in Rust 531"
  description: "Tradução em português da newsletter This Week in Rust"
  body: |
    [Conteúdo traduzido]

    ---

    *Artigo original: [link]*
    *Traduzido automaticamente. Para sugestões de melhorias...*
---
```

## 🔧 Customização

### Alterar Frequência

Edite o cron no arquivo `.github/workflows/twir-translator.yml`:

```yaml
schedule:
  - cron: '0 12 * * 3'  # Quarta às 12:00 UTC
```

Exemplos:
- `'0 12 * * 3'` - Toda quarta-feira às 12:00
- `'0 9 * * 2'` - Toda terça-feira às 09:00
- `'0 0 * * 1'` - Toda segunda-feira à meia-noite

### Alterar Tags/Categorias

Edite a função `create_post_file()` no `translate-twir.py`:

```python
'tags': [
    'rust',
    'newsletter',
    'this-week-in-rust',
    'tradução',
    'sua-tag-aqui'  # Adicione suas tags
],
```

### Alterar Cor

```python
'main-class': 'rust',
'color': '#CE422B',  # Cor oficial do Rust
```

## 🐛 Troubleshooting

### O workflow não está rodando
- Verifique se o agendamento está correto
- Confirme que o repositório tem Actions habilitado

### Erro: "No translation API key found"
- **Copilot CLI**: Verifique se `COPILOT_GITHUB_TOKEN` está configurado
  - Certifique-se de que o PAT tem permissão "Copilot" (Read and write)
  - Verifique se você tem acesso ao GitHub Copilot
- **GitHub Models**: Deve funcionar automaticamente com `GITHUB_TOKEN`
- Verifique se adicionou o secret no GitHub (se usando DeepL/OpenAI)
- Confirme o nome exato: `DEEPL_API_KEY` ou `OPENAI_API_KEY`

### Post duplicado
- O script verifica se o post já existe pelo slug
- Posts duplicados são automaticamente ignorados

### Qualidade da tradução
- **Copilot CLI**: Excelente qualidade, otimizado para código e documentação técnica ⭐
- **GitHub Models (GPT-4o-mini)**: Excelente qualidade, consistente
- OpenAI: Traduções muito naturais
- DeepL: Excelente para conteúdo técnico
- Sempre revise a tradução antes de publicar!

## 📊 Custos Estimados

### � GitHub Copilot CLI (RECOMENDADO)
- **Incluído na assinatura Copilot** (individual ou organizacional)
- Melhor integração com GitHub
- Alta qualidade de tradução
- ~1 newsletter = $0.00 (incluso)
- **Custo: Incluído no Copilot!** ⭐

### 🆓 GitHub Models
- **GRÁTIS** com sua conta GitHub!
- Modelos disponíveis: GPT-4o-mini, GPT-4o, Claude-3.5-Sonnet, Llama-3.1
- Rate limits generosos para uso pessoal
- ~1 newsletter = $0.00
- **Custo total: GRÁTIS** ✨

### DeepL Free
- 500.000 caracteres/mês grátis
- ~1 newsletter = 50.000 caracteres
- **Custo: GRÁTIS** (até 10 newsletters/mês)

### OpenAI
- Modelo: gpt-4o-mini
- ~1 newsletter = $0.01 - $0.05
- **Custo: ~$0.20/mês** (4 newsletters)

## 🤝 Contribuindo

Melhorias são bem-vindas! Algumas ideias:

- [ ] Suporte para mais serviços de tradução
- [ ] Tradução híbrida (combinar múltiplas APIs)
- [ ] Revisão automática de qualidade
- [ ] Notificações no Discord/Slack
- [ ] Cache de traduções já realizadas

## 📝 Licença

Este script é parte do seu blog e segue a mesma licença do repositório principal.

## 🔗 Links Úteis

- [This Week in Rust](https://this-week-in-rust.org/)
- [DeepL API Docs](https://www.deepl.com/docs-api)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
