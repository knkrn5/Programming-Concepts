# **Git Concepts**

> **`repo-name(Project Name)` != `remote-name( repositories hosted remotely on cloud servers)` != `remote-tracking-branch(Local copies of remote branch states)` != `branch-name(Code versions branches within repositories)`**

## **Git Workflow Diagram**

![Git repo Diagram](./git.svg)

## **Git File States**

1. **Untracked**: Files that Git doesn't know about yet - never been added in Git tracking system.
2. **UnStaged = Modified**: Files that have been modified but not yet staged.
3. **Staged**: Files that have been added to the staging area and are ready to be committed.
4. **Uncommited**: All changes that haven't been committed yet (includes both modified and staged files).
5. **Local Changes**: All changes in your local repository (uncommitted + unpushed commits).

## **Git CLI Cmds**

```sh
git config --local --list #This reads from .git/config in your current repo
git config --global --list #This reads from ~/.gitconfig (your home directory)
git config --system --list #git config --system --list
git config --get core.ignorecase # View specific config key

```

```sh
git ls-tree -r HEAD          # Current commit, recursive
git ls-tree -r main          # Main branch
git ls-tree -r commit-hash   # Specific commit

git ls-remote <remote-name> #Lists all references on the remote repository


```

```sh

git merge # merges the changes with the current branch
git merge --abort # If you're in a merge, abort it
git merge staging   # merge staging into current branch
git merge staging --no-commit # Merge with --no-commit to review before finalizing

git cherry-pick <commit-hash> # Apply that one commit from the branch we have picked the commit-hash into our current branch


git branch -f main staging # Make local main match staging without merging
git branch -f main origin/main # Reset local main to exactly match remote main


git push -u origin main # -u means upstream
git push -f origin staging:main # overwrites the remote main branch with your local staging branch even if remote has commits that local staging doesn’t have


git rebase origin/main # Move my current branch's commits to start from the tip of local remote-tracking-brach(origin/main)
```

```sh
git worktree list
```

```sh

git push heroku-backend `git subtree split --prefix server main`:main --force # usefull incase of non-fast-forward error,

git diff origin/main origin/staging # Shows Differences between the remote branches on your origin
```

```sh
### reset desired-branch while being in the desired-branch ###
git switch main
git reset --hard staging # our working directory and staging area are updated to exactly match staging. Any uncommitted changes or local commits on main are discarded.
git push -f origin main # This overwrites remote main to match your local main (which now matches staging).

# resent desired-branch while being in the different branch
git switch staging
git branch -f main
git push -f origin main # This overwrites remote main to match your local main (which now matches staging).
```

```sh
# Compare commit hashes
# If hashes are same = identical commits
git rev-parse main
git rev-parse staging
```
