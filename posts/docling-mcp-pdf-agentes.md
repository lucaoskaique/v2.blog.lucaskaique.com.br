---
pt-BR:
  layout: post
  date: 2026-07-04 10:00:00
  image: /assets/img/docling-mcp-pdf-agentes/cover.png
  main-class: ai
  color: "#6366f1"
  tags:
    - ai
    - mcp
    - document-ai
    - rag
  categories:
    - ai
  title: "docling-mcp — IBM Docling como ferramenta MCP para agentes"
  description: "O docling-mcp envolve o Docling da IBM como uma ferramenta MCP padrão: instale com uvx, conecte ao Claude ou LM Studio, e seu agente obtém JSON estruturado com ordem de leitura e extração de tabelas."
  body: |
    Parsing de PDF é a dependência não documentada em torno da qual todo pipeline RAG cresce. O **docling-mcp** envolve o Docling da IBM como uma ferramenta MCP padrão: instale com `uvx mcp-server-docling`, conecte ao Claude ou LM Studio, e seu agente chama `convert_document` para obter JSON estruturado com ordem de leitura, extração de tabelas e hierarquia de seções intacta.

    Extração de texto plano sempre foi a abstração errada para agentes conscientes de documentos.

    - **Instalação:** `uvx mcp-server-docling`
    - **Saída:** JSON estruturado · ordem de leitura · tabelas · hierarquia de seções

    ## Repositório

    **GitHub:** [docling-project/docling-mcp](https://github.com/docling-project/docling-mcp)

    `#MCP` `#DocumentAI` `#RAG` `#AIEngineering` `#OpenSource`

en:
  layout: post
  date: 2026-07-04 10:00:00
  image: /assets/img/docling-mcp-pdf-agentes/cover.png
  main-class: ai
  color: "#6366f1"
  tags:
    - ai
    - mcp
    - document-ai
    - rag
  categories:
    - ai
  title: "docling-mcp — IBM Docling as an MCP Tool for Document-Aware Agents"
  description: "docling-mcp wraps IBM's Docling as a standard MCP tool: install with uvx, connect Claude or LM Studio, and your agent gets structured JSON with reading order and table extraction."
  body: |
    PDF parsing is the undocumented dependency every RAG pipeline grows around. **docling-mcp** wraps IBM's Docling as a standard MCP tool: install with `uvx mcp-server-docling`, connect Claude or LM Studio, and your agent calls `convert_document` to get structured JSON with reading order, table extraction, and section hierarchy intact.

    Flat text extraction was always the wrong abstraction for document-aware agents.

    - **Install:** `uvx mcp-server-docling`
    - **Output:** Structured JSON · reading order · tables · section hierarchy

    ## Repo

    **GitHub:** [docling-project/docling-mcp](https://github.com/docling-project/docling-mcp)

    `#MCP` `#DocumentAI` `#RAG` `#AIEngineering` `#OpenSource`
---
