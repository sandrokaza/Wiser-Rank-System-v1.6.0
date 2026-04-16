# Wiser-Rank-System-v1.6.0

<img width="377" height="800" alt="01" src="https://github.com/user-attachments/assets/625b212b-83fe-4cf8-8f91-66f309c20b17" />

## Visão Geral

Este script fornece uma interface simplificada para entrada de dados e automatiza a aplicação dessas informações em múltiplos elementos do projeto.

A solução foi projetada para fluxos de trabalho que exigem atualizações frequentes de listas ordenadas (rankings), permitindo reaplicações rápidas sem comprometer a integridade das referências internas do projeto.

## Principais Funcionalidades

- Interface para entrada estruturada de dados
- Atualização automatizada de textos e identificadores visuais
- Suporte a múltiplas posições (ex: Top 10, Top 20, etc.)
- Atualização centralizada de categoria/título
- Sistema de identificação persistente independente de nomes visuais
- Reaplicação segura de alterações sem quebra de vínculos
- Redução de intervenção manual em múltiplas composições

## Arquitetura do Sistema

A ferramenta utiliza um sistema de identificação interna baseado em metadados das composições (campo `Comment`), evitando dependência direta de nomes visíveis.

### Estratégia de Identificação

Cada elemento relevante do projeto é associado a um identificador único persistente.  
Isso permite que o script:

- localize corretamente os elementos mesmo após renomeações
- mantenha consistência entre execuções sucessivas
- evite falhas comuns em workflows baseados em nomes dinâmicos

Essa abordagem aumenta a robustez do projeto e reduz riscos de inconsistência.

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

## Requisitos

- Adobe After Effects
- Projeto previamente estruturado para suportar automação
- Elementos com identificação interna configurada

## Considerações Técnicas

- O desempenho e a precisão do script dependem da consistência estrutural do projeto
- Alterações manuais fora do padrão podem exigir reconfiguração dos identificadores
- Recomenda-se manter um padrão organizacional para garantir máxima eficiência

## Proposta

Esta ferramenta transforma um processo manual e repetitivo em um fluxo automatizado, confiável e escalável dentro do After Effects.

Ao abstrair a dependência de nomes visuais e utilizar identificadores persistentes, o sistema permite ciclos rápidos de atualização com alta integridade estrutural.
