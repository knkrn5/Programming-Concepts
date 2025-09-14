# **Git Concepts**

> **`repo name(Project Name)` != `remote name( repositories hosted remotely on cloud servers)` != `branch name(Code versions within repositories)`**

## Untracked vs Uncommited vs UnStaged vs modified vs Local Changes

## **Git CLI Cmds**

```sh
git config --local --list #This reads from .git/config in your current repo
git config --global --list #This reads from ~/.gitconfig (your home directory)
git config --system --list #git config --system --list
git config --get core.ignorecase # View specific config key

```

```sh
git ls-files # shows all files that Git is currently tracking in our working directory's index, which corresponds to our current branch

git ls-tree -r HEAD          # Current commit, recursive
git ls-tree -r main          # Main branch
git ls-tree -r commit-hash   # Specific commit

git rm <path/to/file> # to remove from both disk and git tracking
git rm --cached <path/to/file> #If you want to keep the files locally, but remove them from Git tracking
git rm -r <path/to/directory> # To delete the whole folder and all files in it from Git and disk
git rm -r --cached folder/ # Removes folder only from Git, keeps it on disk
git add <path/to/file> # To add file in git tracking

```

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

git clean -fdn # Wanna preview what will be deleted before actually deleting?
git clean -f -d # -d: include untracked directories
git clean -fd # -f= force, -d= delete untracked folders/files
git clean -f # Command to delete all untracked files
git clean -f path/to/specific/file # Remove specific untracked file
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
