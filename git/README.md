# Git

Notes for Git — version control, branching, and collaboration.

Files are numbered in **learning order**: `01-git-topic.md`, `02-git-topic.md`, and so on.

**Prerequisite:** none. Use alongside any coding track from day one.

## Contents

**01. [Basics & Setup](./01-git-basics-setup.md)**  
Tier — Fundamental

1. What Git is  
2. Install and configure (`user.name`, `user.email`)  
3. `init`, `clone`, `status`  
4. Working tree, staging, repository  
5. Common questions

**02. [Commits & History](./02-git-commits-history.md)**  
Tier — Fundamental

1. `add` and `commit`  
2. `log`, `show`, and `diff`  
3. `.gitignore`  
4. Good commit messages  
5. Common questions

**03. [Branching](./03-git-branching.md)**  
Tier — Fundamental

1. What branches are  
2. `branch`, `switch` / `checkout`  
3. Creating and listing branches  
4. Branch naming conventions  
5. Common questions

**04. [Merging](./04-git-merging.md)**  
Tier — Fundamental

1. Fast-forward vs merge commit  
2. `merge` and conflict markers  
3. Resolving conflicts  
4. `merge --abort`  
5. Common questions

**05. [Rebasing](./05-git-rebasing.md)**  
Tier — Intermediate

1. What rebase does  
2. `rebase` vs `merge`  
3. Interactive rebase (`rebase -i`)  
4. Golden rule of rebasing  
5. Common questions

**06. [Remote & Collaboration](./06-git-remote-collaboration.md)**  
Tier — Intermediate

1. `remote`, `fetch`, `pull`, `push`  
2. `origin` and upstream tracking  
3. Pull requests (GitHub flow)  
4. Code review basics  
5. Common questions

**07. [Workflows](./07-git-workflows.md)**  
Tier — Intermediate

1. Trunk-based development  
2. Git Flow (overview)  
3. Feature branches  
4. Release and hotfix branches  
5. Common questions

**08. [Stash, Cherry-pick & Reset](./08-git-stash-cherry-pick-reset.md)**  
Tier — Intermediate

1. `stash` and `stash pop`  
2. `cherry-pick`  
3. `reset` — soft, mixed, hard  
4. `revert` vs `reset`  
5. Common questions

**09. [Hooks & Best Practices](./09-git-hooks-best-practices.md)**  
Tier — Advanced

1. Client-side hooks (pre-commit)  
2. Conventional commits (intro)  
3. Signing commits (intro)  
4. `.gitattributes`  
5. Common questions

**10. [Troubleshooting](./10-git-troubleshooting.md)**  
Tier — Advanced

1. Detached HEAD  
2. Recovering lost commits (`reflog`)  
3. Fixing wrong branch commits  
4. Common interview scenarios  
5. Common questions

**11. [Multiple GitHub Accounts (SSH)](./11-git-multiple-github-accounts-ssh.md)**  
Tier — Advanced

1. Create SSH keys per account  
2. `~/.ssh/config` host entries  
3. SSH agent and public keys on GitHub  
4. Clone and remote URLs per account  
5. Per-repo `user.name` and `user.email`

## Learning path

```
01–04  Fundamental  →  commits, branches, merge
05–08  Intermediate →  rebase, remote, workflows, recovery
09–11  Advanced     →  hooks, troubleshooting, multi-account SSH
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).
