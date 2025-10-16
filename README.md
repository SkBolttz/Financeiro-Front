# 💰 Sistema Financeiro React + Spring Boot

![License](https://img.shields.io/badge/license-MIT-green)
![Java](https://img.shields.io/badge/Java-21-blue)
![React](https://img.shields.io/badge/React-18-blueviolet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## 📌 Descrição do Projeto
Este é um **sistema de controle financeiro**, desenvolvido com **React.js** no frontend e **Spring Boot** no backend, com **PostgreSQL** como banco de dados.  
O sistema permite gerenciar **receitas, despesas, categorias, clientes e fornecedores**, além de oferecer dashboards interativos e relatórios financeiros.

---

## 🛠 Tecnologias Utilizadas

**Frontend**
- React.js
- Axios
- React Router Dom
- TailwindCSS
- JavaScript ES6+
- Chart.js (gráficos e dashboards)

**Backend**
- Java 21
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- PostgreSQL
- Maven

**Outros**
- Git/GitHub
- Postman (testes de API)

---

## ⚙️ Funcionalidades

### Usuário
- Login e autenticação via JWT
- Recuperação de informações do usuário logado

### Movimentações Financeiras
- Adicionar, editar e remover receitas e despesas
- Pagamento de despesas
- Upload de comprovantes
- Lançamentos recorrentes com periodicidade
- Filtros e paginação

### Categorias
- Adicionar, editar e remover categorias
- Listagem de categorias ativas por tipo (Receita/Despesa)

### Clientes e Fornecedores
- Cadastro, edição e exclusão
- Gestão de dados completos (CPF/CNPJ, endereço, telefone, e-mail, banco)
- Listagem de clientes e fornecedores ativos

### Dashboards e Relatórios
- **Resumo financeiro**: total de receitas, despesas e saldo atual
- **Gráficos de pizza**: proporção de categorias de despesas
- **Gráficos de linha**: evolução de receitas e despesas ao longo do tempo
- **Filtros por período**: mensal, trimestral, anual
- **Exportação**: relatórios em PDF ou CSV

### Alertas
- Alertas de vencimentos de contas
- Aviso quando o limite de despesas é atingido

