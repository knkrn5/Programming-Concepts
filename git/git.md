# **Git Concepts**

> **`repo name(Project Name)` != `remote name( repositories hosted remotely on cloud servers)` != `branch name(Code versions within repositories)`**

## Untracked vs Uncommited vs UnStaged vs modified vs Local Changes

## **Git CLI Cmds**

```sh
# linking back the same repo from the github to system
git init
git pull origin main # it does the combination of `git fetch and git merge`

git add .
git add specific-file.js      # Stage only files you want
git reset  # Unstage all files
git reset --hard HEAD # Remove all staged and unstaged changes
git reset HEAD unwanted-file.js  # Unstage specific files you don't want
git restore . # remove all uncommitted changes(modified or staged)
rm path/to/specific/file # Delete the file
git clean -fd # -f= force, -d= delete untracked folders/files
git clean -f path/to/specific/file # Remove untracked file
git commit -m "msg"
git push  # If no branch mention, then defualt to current branch
git push origin <branch-name>

git branch
git branch --show-current
git branch -r # lists all remote branches
git branch -a # See All Branches (Local + Remote)
git checkout -b <new-branch-name> # Creates the new branch from the current branch and switches to newly-created-branch from the current branch, here -b is shortcut for "git branch new-branch + git checkout new-branch"
git branch -d <branch-name> # Deletes the branch locally if it has been fully merged into another branch
git branch -D <branch-name> # to force delete even if unmerged

git stash # this to temporarily saving (storing) your uncommitted changes (modified or new files) so you can switch branches or do other operations without losing those changes
git stash pop # Applies the stashed changes back to our current branch, in this way we can push changes in the current branch.

git checkout <branch name> # to switch into specific branch
#OR
git switch <branch-name>
git checkout <branch name> -- path/to/file # to stag the specific folder/file changes from that branch where we have already made the changes, while being in the branch-where we want to merge the changes
git diff main..staging --name-status # To see what changes will be applied before merging. # This shows⬇️:
# A    newfile.txt     (A = Added)
# M    config.js       (M = Modified)
# D    oldfile.txt     (D = Deleted)
git log main..staging --oneline  # First, see what commits are in staging but not in main
git log origin/main..main --oneline  # Shows unpushed commits on main
git merge staging --no-commit # Merge with --no-commit to review before finalizing
git cherry-pick <commit-hash> # Cherry-pick specific commits instead of merging all
git merge # merges the changes with the current branch
git merge --abort # If you're in a merge, abort it
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
git worktree list
git subtree push --prefix <sub-dir name> <remote-name>  <remote-branch-name> # to push a specific subdirectory of your Git repository to a remote repository
git subtree split --prefix <sub-dir-path> <branch-name> # It only extracts the commit history of only the server/ folder from the local main branch, and returns the latest commit SHA of that subtree. Defualt to the current branch if not mentioned
git subtree split --prefix=<sub-dir name> -b <create new branch name> # This will create the new branch with just the sepecific-folder subtree

```

```sh
git remote
git remote add origin <repo link> # to add remote branch
git branch -r # lists all remote branches
git remote -v # Shows the URLs of our remotes
git remote add <remote-name> <repository-url> # to add a new remote repository to our local Git repository's configuration
git remote remove <remote-name> # to remove a existing remote repository from our local Git repository's configuration
git remote rename <old remote name> <new remote name> # Rename a remote
git remote set-url <remote-name> <new url> # Change remote URL
git push heroku-backend `git subtree split --prefix server main`:main --force # usefull incase of non-fast-forward error,
git fetch #  downloads objects and refs (branches, tags, etc.) from a remote repository to our local repository without merging them into our current working branch.
git fetch --all # Fetch all updates from all remotes in our project, without merging or modifying our working code
git fetch <remote name> --prune # This removes local references to deleted remote branches
git push <remote> <source_branch>:<target_branch> # If you leave out the <source_branch> (i.e. it's blank before the colon), git will then delete the target-branch

```
