---
title: Filter Branch
description: Filter branch cheat sheet for history rewriting
---
# Complete Guide: git filter-branch

## **Overview**

`git filter-branch` is a Git tool that allows **history rewriting** by applying filters to each commit. It's the equivalent of a "time machine" that replays history with modifications.

### **How it works**

```
Original history:  A → B → C → D → E (HEAD)
                   ↓
Filtering:        A' → B' → C' → D' → E' (new HEAD)
```

Each commit is "replayed" with the modifications specified by the filters.

---

## **Available filter types**

### **1. --index-filter (Most used)**
Modifies the **Git index** (staging area) at each commit.

```bash
git filter-branch --index-filter 'COMMAND' [OPTIONS]
```

**Advantages:**
- ✅ Very fast (no file checkout)
- ✅ Ideal for file removal
- ✅ Works even with large repositories

**Typical example:**
```bash
# Remove a file from entire history
git filter-branch --index-filter 'git rm --cached --ignore-unmatch secrets.txt'
```

### **2. --tree-filter**
Modifies the **working tree** (working directory) at each commit.

```bash
git filter-branch --tree-filter 'COMMAND' [OPTIONS]
```

**Advantages:**
- ✅ More intuitive (works with real files)
- ✅ Allows complex operations on files

**Disadvantages:**
- ❌ Slower (checkout at each commit)
- ❌ Consumes more disk space

**Example:**
```bash
# Remove all .log files
git filter-branch --tree-filter 'find . -name "*.log" -delete'
```

### **3. --msg-filter**
Modifies **commit messages**.

```bash
# Replace a word in all messages
git filter-branch --msg-filter 'sed "s/password/credential/g"'
```

### **4. --env-filter**
Modifies **environment variables** (author, date, etc.).

```bash
# Change author's email
git filter-branch --env-filter '
if [ "$GIT_AUTHOR_EMAIL" = "old@example.com" ]; then
    export GIT_AUTHOR_EMAIL="new@example.com"
fi'
```

### **5. --commit-filter**
The most powerful: allows **complete rewriting** of commits.

```bash
# Merge commits or delete them completely
git filter-branch --commit-filter 'git commit-tree "$@"'
```

---

## **Detailed syntax**

### **Complete command**
```bash
git filter-branch [OPTIONS] [--] [REVISIONS]
```

### **Important options**

| Option | Description | Usage |
|--------|-------------|-------|
| `--force` or `-f` | Force execution even if backup exists | Always recommended |
| `--prune-empty` | Remove empty commits after filtering | Essential for clean history |
| `--tag-name-filter` | Filter tag names | `cat` to preserve, `'sed ...'` to modify |
| `--subdirectory-filter` | Extract a subdirectory | Create new repo from a folder |
| `--` | Separate options from revisions | Avoid ambiguities |
| `--all` | Process all branches and tags | For complete cleanup |

---

## **Detailed practical examples**

### **1. Remove a specific file**

```bash
# Basic syntax
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch secret-file.txt' \
  --prune-empty --tag-name-filter cat -- --all

# Explanation of each part:
# --force                      : Force execution
# --index-filter               : Use index filter (fast)
# git rm --cached              : Remove from staging (not disk)
# --ignore-unmatch             : No error if file doesn't exist
# --prune-empty                : Remove commits that become empty
# --tag-name-filter cat        : Preserve tag names
# -- --all                     : Process all branches
```

### **2. Remove multiple files**

```bash
# Method 1: Pattern with index-filter
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch *.key *.pem secrets.json config.py' \
  --prune-empty --tag-name-filter cat -- --all

# Method 2: Complex bash script
git filter-branch --force --index-filter '
  git rm --cached --ignore-unmatch secrets.json
  git rm --cached --ignore-unmatch backup.sql
  git rm --cached --ignore-unmatch *.key
  git rm --cached --ignore-unmatch large-file.bin
' --prune-empty --tag-name-filter cat -- --all
```

### **3. Remove by file size**

```bash
# Remove all files > 10MB with tree-filter
git filter-branch --force --tree-filter \
  'find . -type f -size +10M -delete' \
  --prune-empty --tag-name-filter cat -- --all

# More sophisticated version with logging
git filter-branch --force --tree-filter '
  find . -type f -size +10M -print0 | while read -d $'\''\0'\'' file; do
    echo "Removing: $file" >&2
    rm -f "$file"
  done
' --prune-empty --tag-name-filter cat -- --all
```

### **4. Clean a specific directory**

```bash
# Remove all contents of a folder
git filter-branch --force --tree-filter \
  'rm -rf sensitive-folder/' \
  --prune-empty --tag-name-filter cat -- --all

# Extract only a subdirectory (create a new repo)
git filter-branch --force --subdirectory-filter my-module/ \
  --prune-empty --tag-name-filter cat -- --all
```

### **5. Replace content in files**

```bash
# Replace passwords in all files
git filter-branch --force --tree-filter '
  find . -type f -name "*.py" -exec sed -i "s/password123/REMOVED/g" {} +
  find . -type f -name "*.js" -exec sed -i "s/api_key_secret/REMOVED/g" {} +
' --prune-empty --tag-name-filter cat -- --all
```

---

## **Detailed internal process**

### **What happens during execution:**

1. **Automatic backup**: Git saves refs in `refs/original/`
2. **Chronological traversal**: Processes each commit in order
3. **Filter application**: Executes the specified command
4. **New commit creation**: With same author/date but new hash
5. **Refs update**: Points to new commits

### **Example logs during execution:**

```
Rewrite 1a2b3c4d (1/47) (0 seconds passed, 46 remaining)
Rewrite 2b3c4d5e (2/47) (1 seconds passed, 45 remaining)
...
Ref 'refs/heads/main' was rewritten
Ref 'refs/heads/feature-branch' was rewritten
```

---

## **Common error handling**

### **1. "Cannot create a new backup"**
```bash
# Problem: Previous backup exists
# Solution: Force or clean
git filter-branch --force ...

# Or clean manually
rm -rf .git/refs/original/
```

### **2. "Command failed"**
```bash
# Problem: Command in filter fails
# Solution: Add error handling
git filter-branch --index-filter \
  'git rm --cached --ignore-unmatch file.txt || true'
```

### **3. Empty commits after filtering**
```bash
# Problem: Commits become empty
# Solution: Use --prune-empty
git filter-branch --prune-empty ...
```

### **4. Slow performance**
```bash
# Problem: tree-filter too slow
# Solution: Use index-filter when possible
# Instead of:
git filter-branch --tree-filter 'rm -f secrets.txt'
# Use:
git filter-branch --index-filter 'git rm --cached --ignore-unmatch secrets.txt'
```

---

## **Mandatory post-processing**

### **After each filter-branch:**

```bash
# 1. Clean references
git reflog expire --expire=now --all

# 2. Aggressive garbage collection
git gc --prune=now --aggressive

# 3. Check integrity
git fsck --full

# 4. Force remote update
git push --force-with-lease --all
git push --force-with-lease --tags
```

---

## **Modern alternatives**

### **git filter-repo (Recommended)**
```bash
# Installation
pip3 install git-filter-repo

# Usage (simpler and faster)
git filter-repo --path secrets.txt --invert-paths
git filter-repo --strip-blobs-bigger-than 10M
```

### **Tool comparison**

| Criteria | filter-branch | filter-repo | BFG |
|----------|---------------|-------------|-----|
| **Speed** | Slow | Fast | Very fast |
| **Complexity** | High | Medium | Low |
| **Flexibility** | Maximum | High | Limited |
| **Maintenance** | Obsolete | Active | Active |
| **Learning curve** | Difficult | Medium | Easy |

---

## **Best practices for filter-branch**

### **1. Preparation**
```bash
# Always create a backup
cp -r my-repo my-repo-backup

# Work on a clone
git clone --mirror original-repo.git cleaned-repo.git
cd cleaned-repo.git
```

### **2. Test on a branch**
```bash
# Test first on a branch
git checkout -b test-cleanup
git filter-branch --force --index-filter '...' HEAD~10..HEAD

# If OK, apply to entire history
git checkout main
git filter-branch --force --index-filter '...' --all
```

### **3. Verification**
```bash
# Verify secrets are removed
gitleaks detect --source . --verbose

# Check size
du -sh .git/

# Check integrity
git fsck --full
```

### **4. Complete cleanup script**
```bash
#!/bin/bash
# Secure cleanup script

set -e  # Stop on error

echo "🚨 WARNING: This operation is irreversible!"
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Backup
echo "📦 Creating backup..."
cp -r . ../backup-$(date +%Y%m%d-%H%M%S)

# Cleanup
echo "🧹 Cleanup in progress..."
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch secrets.json config.py *.key' \
  --prune-empty --tag-name-filter cat -- --all

# Post-processing
echo "🔧 Post-processing..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Verification
echo "✅ Verification with GitLeaks..."
if gitleaks detect --source . --exit-code; then
    echo "✅ No secrets detected!"
else
    echo "❌ Secrets still present!"
    exit 1
fi

echo "🎉 Cleanup completed successfully!"
```

---

## **Advanced use cases**

### **1. Split a repository**
```bash
# Extract a module as separate repo
git filter-branch --subdirectory-filter auth-module/ \
  --prune-empty --tag-name-filter cat -- --all
```

### **2. Merge commits**
```bash
# Use commit-filter to merge
git filter-branch --commit-filter '
  if [ "$GIT_COMMIT" = "commit-to-remove" ]; then
    skip_commit "$@"
  else
    git commit-tree "$@"
  fi
' HEAD~10..HEAD
```

### **3. Anonymize history**
```bash
# Replace all emails
git filter-branch --env-filter '
  export GIT_AUTHOR_EMAIL="anonymous@example.com"
  export GIT_COMMITTER_EMAIL="anonymous@example.com"
' --all
```

---

## **⚠️ Important warnings**

### **Major risks:**
1. **Irreversible**: Original history is lost
2. **Signature breakage**: Signed commits become invalid
3. **Collaboration issues**: Force push required
4. **External references**: Links to commits break

### **When NOT to use filter-branch:**
- On a shared production repository
- Without complete backup
- If you're not sure of consequences
- For small modifications (use `git revert` instead)