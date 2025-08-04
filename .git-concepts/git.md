# **Git Concepts**

> **`repo name(Project Name)` != `remote name(Local aliases for repositories are hosted remotely on cloud servers)` != `branch name(Code versions within repositories)`**

## **Git CLI Cmds**

```sh
# linking back the same repo from the github to system
git init
git remote add origin <repo link>
git pull origin main # it does the combination of `git fetch and git merge`

git add .
git commit -m "msg"
git push origin main

git stash # this to temporarily saving (storing) your uncommitted changes (modified or new files) so you can switch branches or do other operations without losing those changes
git stash pop # Applies the stashed changes back to your current branch, in this way we can push changes made in main branch to staging branch(by switch branch after stashing) without needing to merge.

git checkout <branch name> # to switch into specific branch
#OR
git switch <branch-name>
git checkout <branch name> -- path/to/file # to stag the specific file changes from that branch where we have already made the changes, while being in the branch, in which we want to merge the changes
```

```sh
# First, see what commits are in staging but not in main
git log main..staging --oneline
git log origin/main..main --oneline  # Shows unpushed commits on main
git log origin/staging..staging --oneline  # Shows unpushed commits on staging
```

```sh
# Start merge but don't commit
git checkout main
git merge --no-commit --no-ff staging # merge without commiting

# Now you can selectively stage files
git status                    # See what files changed
git add specific-file.js      # Stage only files you want
git reset HEAD unwanted-file.js  # Unstage files you don't want
# Commit the selective merge
git commit -m "any mgs"
```

```sh
git remote -v
git remote add <remote-name> <repository-url> # to add a new remote repository to our local Git repository's configuration
git remote remove <remote-name> # to remove a existing remote repository from our local Git repository's configuration
git remote rename <old remote name> <new remote name> # Rename a remote
git remote set-url <remote-name> <new url> # Change remote URL
git fetch #  downloads objects and refs (branches, tags, etc.) from a remote repository to our local repository without merging them into our current working branch.
git merge # merges the changes with the current branch


```

```sh
git worktree list
git subtree push --prefix backend <remote-name> <remote-branch-type>
```
