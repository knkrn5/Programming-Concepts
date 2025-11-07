# **Git Concepts**

```sh
git config --local --list #This reads from .git/config in your current repo
git config --global --list #This reads from ~/.gitconfig (your home directory)
git config --system --list #git config --system --list
git config --get core.ignorecase # View specific config key

```

## **Git Workflow Diagram**

![Git repo Diagram](./git.svg)

## **Git CLI Cmds**

```sh
git worktree list
git ls-tree -r HEAD          # Current commit, recursive
git ls-tree -r main          # Main branch
git ls-tree -r commit-hash   # Specific commit

git ls-remote <remote-name> #Lists all references on the remote repository

```

```sh
git push heroku-backend `git subtree split --prefix server main`:main --force # usefull incase of non-fast-forward error,

```

```sh
# Compare commit hashes
# If hashes are same = identical commits
git rev-parse main
git rev-parse staging
```
