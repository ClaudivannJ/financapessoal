
# 📝 Plano de Testes

## 🔐 Autenticação
- ✅ Cadastro de usuário válido
- ❌ Cadastro com e-mail já registrado
- ✅ Login válido
- ❌ Login com senha incorreta
- ❌ Login com e-mail inexistente

## 💰 Transações
- ✅ Criar receita válida
- ✅ Criar despesa válida
- ❌ Criar transação sem token
- ✅ Listar transações
- ✅ Deletar transação existente
- ❌ Deletar transação inexistente
- ❌ Acessar transações de outro usuário

## 🔗 Integração
- ✅ Frontend → Backend comunicação
- ✅ Verificar erros e respostas corretas na interface
