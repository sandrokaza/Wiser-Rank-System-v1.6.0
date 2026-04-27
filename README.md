# Wiser Rank System

## 📦 Download

Baixe a versão mais recente:
[Wiser Rank System v1.7.10](../../releases/tag/Wiser-Rank-System-v1.7.10)

## ⚠️ Importante (Configuração do After Effects)

Para o funcionamento correto da ferramenta, ajuste as seguintes configurações:

- Vá em: **Edit > Preferences > Scripting & Expressions**

Configure assim:

- ✔️ Enable: **Allow Scripts to Write Files and Access Network**
- ❌ Disable: **Warn User When Executing Scripts**

Essas configurações são necessárias para:

- Permitir downloads automáticos de imagens
- Evitar interrupções durante a execução do script
- Garantir funcionamento completo das automações

Sem isso, algumas funcionalidades podem não funcionar corretamente ou exigir confirmação manual.

<img width="1390" height="1080" alt="Untitled-6" src="https://github.com/user-attachments/assets/5bac0fb0-0da4-4b15-80eb-5c87c772b0c6" />

## Visão Geral

Esta ferramenta fornece uma interface simplificada para entrada de dados e automatiza a aplicação dessas informações em múltiplos elementos do projeto. A solução foi projetada para fluxos de trabalho que exigem atualizações frequentes de listas ordenadas (rankings), permitindo reaplicações rápidas sem comprometer a integridade das referências internas do projeto.

## Principais Funcionalidades

- Interface para entrada estruturada de dados  
- Atualização automatizada de textos e identificadores visuais  
- Suporte a múltiplas posições (ex: Top 10, Top 20, etc.)  
- Atualização centralizada de categoria/título  
- Sistema de identificação persistente independente de nomes visuais  
- Aplicação de IDs individuais em cada composição  
- Reaplicação segura de alterações sem quebra de vínculos  
- Redução de intervenção manual em múltiplas composições  
- Download automatizado de imagens por meio de arquivo `.bat` a partir de múltiplos links  
- Renomeação automática das imagens conforme a ordem do ranking  
- Inserção automatizada das imagens nas composições correspondentes  
- Organização estruturada dos assets para importação direta no projeto  
- Suporte à revisão prévia de arquivos CSV e TSV antes da importação  
- Validação visual dos dados antes da aplicação no projeto 

## Arquitetura do Sistema

A ferramenta utiliza um sistema de identificação interna baseado em metadados das composições, evitando dependência direta de nomes visíveis.

## Fluxo de Uso

1. Executar o script dentro do After Effects  
2. Preencher os dados desejados na interface (nomes, categoria, etc.)  
3. Aplicar as alterações  

O script irá processar automaticamente todos os elementos vinculados, atualizando o projeto de forma consistente.

## Benefícios

- **Eficiência operacional**: redução significativa no tempo de edição
- **Escalabilidade**: fácil adaptação para diferentes volumes de dados
- **Consistência**: padronização das alterações no projeto
- **Reusabilidade**: suporte a múltiplas iterações sem necessidade de reconfiguração
- **Confiabilidade**: menor risco de erros humanos

## Casos de Uso

- Conteúdos recorrentes com estrutura fixa
- Atualizações frequentes de listas ordenadas
- Produções com prazos curtos
- Ambientes colaborativos que exigem padronização

## Considerações Técnicas

- O desempenho e a precisão do script dependem da consistência estrutural do projeto
- Alterações manuais fora do padrão podem exigir reconfiguração dos identificadores
- Recomenda-se manter um padrão organizacional para garantir máxima eficiência

## Requisitos

- Adobe After Effects
- Projeto previamente estruturado para suportar automação
- Elementos com identificação interna configurada

## Licença

Este projeto está licenciado sob a licença MIT — consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
