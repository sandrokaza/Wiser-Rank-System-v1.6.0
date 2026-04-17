# Wiser Rank System

## 📦 Download

Baixe a versão mais recente:
[Wiser Rank System v1.7.2](../../releases/tag/Wiser-Rank-System-v1.7.2)

<img width="1920" height="293" alt="art02" src="https://github.com/user-attachments/assets/93e32057-045e-42d8-b44c-37dc6967f9e6" />

<img width="1440" height="1440" alt="Untitled-4" src="https://github.com/user-attachments/assets/ece1f7c8-b469-4a31-8baf-0138b8f8c223" />

## Visão Geral

Esta ferramenta fornece uma interface simplificada para entrada de dados e automatiza a aplicação dessas informações em múltiplos elementos do projeto. A solução foi projetada para fluxos de trabalho que exigem atualizações frequentes de listas ordenadas (rankings), permitindo reaplicações rápidas sem comprometer a integridade das referências internas do projeto.

## Principais Funcionalidades

- Interface para entrada estruturada de dados  
- Atualização automatizada de textos e identificadores visuais  
- Suporte a múltiplas posições (ex: Top 10, Top 20, etc.)  
- Atualização centralizada de categoria/título  
- Sistema de identificação persistente independente de nomes visuais  
- Reaplicação segura de alterações sem quebra de vínculos  
- Redução de intervenção manual em múltiplas composições  
- Download automatizado de imagens via PowerShell a partir de múltiplos links  
- Renomeação automática das imagens conforme a ordem do ranking  
- Inserção automatizada das imagens nas composições correspondentes  
- Organização estruturada dos assets para importação direta no projeto  

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
