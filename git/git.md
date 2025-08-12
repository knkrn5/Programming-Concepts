# **Git Concepts**

> **`repo name(Project Name)` != `remote name(Local aliases for repositories are hosted remotely on cloud servers)` != `branch name(Code versions within repositories)`**

## **Git CLI Cmds**

```sh
# linking back the same repo from the github to system
git init
git remote add origin <repo link>
git pull origin main # it does the combination of `git fetch and git merge`

git add .
git add specific-file.js      # Stage only files you want
git reset  # Unstage all files
git reset HEAD unwanted-file.js  # Unstage specific files you don't want
git commit -m "msg"
git push origin main

git branch
git branch --show-current
git checkout -b <branch-name> # Creates and switches to feature-branch from the current branch
git branch -d <branch-name> # Deletes the branch locally if it has been fully merged into another branch
git branch -D <branch-name> # to force delete even if unmerged

git stash # this to temporarily saving (storing) your uncommitted changes (modified or new files) so you can switch branches or do other operations without losing those changes
git stash pop # Applies the stashed changes back to your current branch, in this way we can push changes made in main branch to staging branch(by switch branch after stashing) without needing to merge.

git checkout <branch name> # to switch into specific branch
#OR
git switch <branch-name>
git checkout <branch name> -- path/to/file # to stag the specific folder/file changes from that branch where we have already made the changes, while being in the branch, in which we want to merge the changes
git diff main..staging --name-status # To see what changes will be applied before merging. # This shows⬇️:
# A    newfile.txt     (A = Added)
# M    config.js       (M = Modified) 
# D    oldfile.txt     (D = Deleted)
git log main..staging --oneline  # First, see what commits are in staging but not in main
git log origin/main..main --oneline  # Shows unpushed commits on main
git merge staging --no-commit # Merge with --no-commit to review before finalizing
git cherry-pick <commit-hash> # Cherry-pick specific commits instead of merging all
git merge --abort
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
git remote
git remote -v
git remote add <remote-name> <repository-url> # to add a new remote repository to our local Git repository's configuration
git remote remove <remote-name> # to remove a existing remote repository from our local Git repository's configuration
git remote rename <old remote name> <new remote name> # Rename a remote
git remote set-url <remote-name> <new url> # Change remote URL
git fetch #  downloads objects and refs (branches, tags, etc.) from a remote repository to our local repository without merging them into our current working branch.
git fetch --all # to fetch all branches (both remote and local)
git fetch <remote name> --prune # This removes local references to deleted remote branches
git merge # merges the changes with the current branch


```

```sh
git worktree list
git subtree push --prefix <sub-dir name> <remote-name>  <remote-branch-type> # to push a specific subdirectory of your Git repository to a remote repository
git subtree split --prefix=<sub-dir name> -b <create new branch name>
```
