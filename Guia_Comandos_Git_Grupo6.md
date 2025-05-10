
# Guia Prático de Comandos Git para o Projeto

## 1. `git clone` – Clonar o repositório
Faz uma cópia do repositório remoto para o seu computador.

```bash
git clone https://github.com/ClaudivannJ/financapessoal.git
```
Você só faz isso uma vez no início.

---

## 2. `git checkout -b` – Criar e mudar para uma nova branch
Cria uma branch nova a partir da atual e já muda para ela.

```bash
git checkout -b "<nome da dua branch>"
```
Cada membro cria sua própria branch a partir da `dev`.

---

## 3. `git checkout` – Mudar de branch
Troca para uma branch já existente no seu repositório local.

```bash
git checkout dev
```

---

## 4. `git pull` – Baixar as últimas atualizações do GitHub
Traz para seu computador as mudanças feitas por outros no repositório remoto.

```bash
git pull origin dev
```
Sempre execute antes de começar a trabalhar, para evitar conflitos.

---

## 5. `git add .` – Preparar arquivos para commit
Adiciona todos os arquivos modificados para serem salvos no próximo commit.

```bash
git add .
```
Ou use `git add nome_do_arquivo` para adicionar um por um.

---

## 6. `git commit -m "mensagem"` – Salvar uma versão local
Registra suas alterações com uma mensagem descritiva.

```bash
git commit -m "feat: cria rota de login"
```

Use mensagens claras, como:
- `feat:` → nova funcionalidade
- `fix:` → correção de bug
- `docs:` → documentação
- `style:` → mudanças visuais

---

## 7. `git push` – Enviar suas alterações para o GitHub
Sobe o commit da sua branch local para o repositório remoto.

```bash
git push origin "<nome da dua branch>"
```
Primeira vez usando a branch? Use:

```bash
git push -u origin "<nome da dua branch>"
```

---

## 8. `git merge` – Unir outra branch à sua (feito via Pull Request)
Junta as mudanças de uma branch dentro da outra.

> Geralmente você **não faz isso manualmente.**  
> Use o botão “Merge Pull Request” no GitHub ao revisar o PR.

---

## 9. `git status` – Verificar o que está modificado
Mostra quais arquivos foram alterados, quais estão prontos para commit e se há conflitos.

```bash
git status
```

---

## 10. `git log` – Ver o histórico de commits
Lista todos os commits feitos com autor e mensagem.

```bash
git log
```
Pressione `q` para sair da visualização.

---

## Fluxo completo recomendado para cada integrante:

```bash
# Clonar o repositório (uma vez)
git clone https://github.com/ClaudivannJ/financapessoal.git

# Entrar no projeto
cd finacapessoal

# Ir para branch de desenvolvimento
git checkout dev
git pull origin dev

# Criar sua branch a partir da dev
git checkout -b backend-claudivan
git push -u origin backend-claudivan

# Trabalhar normalmente
# ...

# Salvar mudanças
#(o ponto indica que esta enviando todos os arquivos alterados para o commit)
git add .

# salva as alterações 
git commit -m "feat: implementa autenticação"

# Enviar para o GitHub
git push

# se voce seguiu os passos conforme foi indicado, tera enviado suas alterações para a branch que voce criou. só voce tem acesso a ela.

# Depois, criar Pull Request da sua branch para dev no GitHub (QUANDO TIVER CONCLUIDO UMA TAREFA)
```
