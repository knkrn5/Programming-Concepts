# **GitHub Concepts**

## **GitHub CLI Cmds**

```sh
# linking back the same repo from the github to system
git init
git remote add origin <repo link>
git pull origin main

git stash # this to temporarily saving (storing) your uncommitted changes (modified or new files) so you can switch branches or do other operations without losing those changes
git stash pop # Applies the stashed changes back to your current branch, in this way we can push changes made in main branch to staging branch(by switch branch after stashing) without needing to merge.

git checkout <branch name> # to go into specific branch
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
git merge --no-commit --no-ff staging

# Now you can selectively stage files
git status                    # See what files changed
git add specific-file.js      # Stage only files you want
git reset HEAD unwanted-file.js  # Unstage files you don't want

# Commit the selective merge
git commit -m "Selective merge from staging"
```

### **[🔗GitHub yml File Structure](../DevOp/github-action/workflow.md#github-actions-yaml-workflow-file)**

