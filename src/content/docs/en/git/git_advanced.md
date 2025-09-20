---
title: Advanced Git Concepts
description: Merge processes and gitflows
---

## Advanced Git Concepts: Branches, Merge and Rebase 🌳

### Branches: The Art of Creating Parallel Universes

#### What is a Branch REALLY?

Imagine your project is like a tree 🌳. The main trunk (main/master) represents your stable and functional code. Branches are like... well, branches! Each explores a different direction.

**But technically, what is a branch?**
- Just a **mobile pointer** to a specific commit
- When you commit on a branch, the pointer advances automatically
- Creating a branch = creating a new pointer (0 performance cost!)

```bash
# Let's visualize this
git log --oneline --graph --all
```

#### The Life Cycle of a Branch

**1. Birth** 👶
```bash
# From main
git checkout main
git checkout -b feature/new-feature

# Or more modern
git switch -c feature/new-feature
```

**2. Development** 💪
```bash
# Work peacefully
echo "new code" >> file.txt
git add file.txt
git commit -m "Add awesome feature"
```

**3. Synchronization** (important!)
```bash
# Get latest changes from main
git checkout main
git pull origin main
git checkout feature/new-feature
git merge main  # or git rebase main (we'll get to it!)
```

**4. Integration** 🤝
```bash
git checkout main
git merge feature/new-feature
```

**5. Cleanup** 🧹
```bash
git branch -d feature/new-feature
```

### Merge: The Fusion of Worlds 🌍➕🌎

#### Types of Merge

**1. Fast-Forward Merge (the simplest)**
```
Before:
main:     A---B---C
feature:           D---E

After merge:
main:     A---B---C---D---E
```

This happens when main hasn't moved since the branch was created. Git says: "Easy, I just move the pointer!"

**2. Three-Way Merge (the classic)**
```
Before:
main:     A---B---C---F
               \
feature:        D---E

After merge:
main:     A---B---C---F---G
               \         /
feature:        D---E---/
```

Git creates a **merge commit** (G) that has two parents!

**3. Merge with Conflicts (the adventure begins!)**

```bash
# Scenario: two people modify the same line
# Branch main: "Price: 3€"
# Branch feature: "Price: 2.5€"

git merge feature/reduced-prices
# CONFLICT! 🚨
```

Git shows you something like this:
```
Price: 
<<<<<<< HEAD
3€
=======
2.5€
>>>>>>> feature/reduced-prices
```

**How to resolve:**
1. Edit the file manually
2. Remove the markers `<<<<<<<`, `=======`, `>>>>>>>`
3. Keep what you want
4. `git add` the resolved file
5. `git commit` (Git automatically prepares the message)

#### Merge Strategies

```bash
# Classic merge (always creates a merge commit)
git merge --no-ff feature-branch

# Squash merge (squashes all commits into one)
git merge --squash feature-branch
git commit -m "Complete feature in one commit"
```

### Rebase: Rewriting History ✨

#### What is Rebase?

Rebase is like telling Git: "Act as if my branch was created from the latest commit on main, EVEN if that's not historically true."

```
Before rebase:
main:     A---B---C---F
               \
feature:        D---E

After rebase:
main:     A---B---C---F
                       \
feature:                D'---E'
```

Commits D and E are **rewritten** (D' and E') to apply after F!

#### Rebase vs Merge: The Great Debate 🥊

**Team Merge says:**
- "True history matters! We see when branches were created"
- "Safer, we don't rewrite history"
- "Merge commits document integrations"

**Team Rebase says:**
- "Linear history = easier to read"
- "No parasitic merge commits"
- "Looks like everything was developed sequentially"

#### Interactive Rebase: The Swiss Army Knife 🛠️

```bash
git rebase -i HEAD~3  # Modify the last 3 commits
```

Git opens an editor with something like:
```
pick a1b2c3d Add menu
pick e4f5g6h Fix typo
pick i7j8k9l Add descriptions

# Commands:
# p, pick = use commit
# r, reword = use commit but edit the message
# e, edit = use commit but stop for amendment
# s, squash = use commit but meld into previous
# d, drop = remove commit
```

**Magic use cases:**
- Fix a terrible commit message
- Merge several small commits into one
- Remove an embarrassing commit
- Reorganize commit order

#### Daily Rebase

**Typical scenario:**
```bash
# You work on a feature
git checkout feature/awesome-stuff

# Meanwhile, main has evolved
# Instead of merging main into your branch...
git rebase main

# Result: your branch appears to have been created from the latest commit on main!
```

### Golden Rules ⚖️

#### When to Use Merge
- Integrate a feature branch into main
- Preserve exact history of collaborative work
- When working on a shared branch

#### When to Use Rebase
- Clean up your branch before merging
- Synchronize your local branch with main
- Reorganize your local commits (not yet pushed!)

#### THE ULTIMATE RULE 🚨
**NEVER REBASE SHARED HISTORY!**
Never rebase a branch that has been pushed and on which other people are working. You'll create temporal chaos!

### Practical Examples 🧪

#### Workflow with Merge
```bash
git checkout main
git pull origin main
git checkout -b feature/login-system

# Development...
git add .
git commit -m "Add login system"
git commit -m "Tests for login"
git commit -m "Fix login bug"

# Integration
git checkout main
git pull origin main  # In case main has evolved
git merge feature/login-system
git push origin main
git branch -d feature/login-system
```

#### Workflow with Rebase
```bash
git checkout main
git pull origin main
git checkout -b feature/login-system

# Development...
git add .
git commit -m "WIP: login in progress"
git commit -m "Almost done"
git commit -m "Login functional"

# Cleanup before integration
git rebase -i HEAD~3  # Squash into one clean commit
git rebase main       # Update relative to main

# Clean integration
git checkout main
git merge feature/login-system  # Fast-forward!
```

#### Conflict Resolution in Rebase
```bash
git rebase main
# CONFLICT!

# Resolve conflict in files
git add resolved-file.txt
git rebase --continue

# If you want to abort
git rebase --abort
```

### Debug and Visualization Commands 🔍

```bash
# See branch tree
git log --oneline --graph --all --decorate

# See where a branch comes from
git merge-base main feature-branch

# See commits only in a branch
git log main..feature-branch

# See who modified what
git blame file.txt

# Visualize differences
git diff main...feature-branch  # Three dots = from divergence point
```

### Anti-Patterns and Common Errors ⚠️

**❌ Never do:**
```bash
# Rebase a public branch
git checkout main
git rebase feature  # NO! main is shared!

# Merge main into your feature branch repeatedly
git checkout feature
git merge main  # Creates polluted merge commits
```

**✅ Better to do:**
```bash
# Keep your branch up to date
git checkout feature
git rebase main  # Clean and linear

# Or if you prefer merge
git checkout main
git merge feature  # Once, at the end
```