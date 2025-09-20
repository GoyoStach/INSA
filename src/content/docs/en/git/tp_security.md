---
title: Security TP
description: Discovering basic security concepts with Git
---
# Practical Exercises - Git & Cybersecurity Workshop

## **TP 1: Manual secret detection**

### **Exercise 1.1: Investigation of a compromised repository (15 min)**

**Context:** You just joined a team and need to audit the `secrets-leak-demo` repository.

**Tasks:**
1. Clone the repository and examine the current state
2. Search for secret traces in the complete history
3. Identify all commits containing suspicious keywords

**Commands to use:**
```bash
# History navigation
git log --oneline --all
git log --grep="password\|secret\|key\|token" --all

# Search in diffs
git log -p --all | grep -i -A3 -B3 "password\|secret\|api"

# Analysis of deleted files
git log --name-status --diff-filter=D
```

**Questions:**
- How many commits contain secrets?
- What types of secrets did you find?
- When was the first secret added?

### **Exercise 1.2: Reconstruction of a deleted file (15 min)**

**Tasks:**
1. Find the commit where `config.py` was deleted
2. Recover the content of this file
3. Analyze all secrets it contained

**Commands:**
```bash
# Find when the file was deleted
git log --follow -- config.py

# Recover content before deletion
git show <commit-hash>:config.py

# Alternative to see the last state
git show <commit-before-deletion>:config.py
```

---

## **TP 2: Automated scan with GitLeaks (35 min)**

### **Exercise 2.1: Mastering GitLeaks (25 min)**

**Objective:** Master all GitLeaks functionalities.

**Tasks:**
1. Install GitLeaks and verify installation
2. Scan the `secrets-leak-demo` repository with different options
3. Analyze and interpret results

**Procedure:**
```bash
# Installation from apt
# TO FIND BY YOURSELF

# Basic scan
gitleaks detect --source . --verbose

# Scan with JSON report
gitleaks detect --source . --verbose --report-format json --report-path report.json

# Scan with secret masking
gitleaks detect --source . --redact --verbose

# Scan recent history (last 30 days)
gitleaks detect --source . --log-opts="--since='30 days ago'" --verbose
```

**Analysis to perform:**
- How many secrets does GitLeaks detect?
- What types of secrets are identified?
- Are there false positives?
- How do results vary according to options?

### **Exercise 2.2: Custom configuration (10 min)**

**Tasks:**
1. Create a custom GitLeaks configuration
2. Add rules to detect:
   - French phone numbers
   - Internal email addresses from your organization
   - Specific database URLs

**Example configuration:**
```toml
title = "Custom GitLeaks configuration"

[extend]
useDefault = true

[[rules]]
id = "french-phone"
description = "French phone number"
regex = '''0[1-9](?:[0-9]{8})'''
tags = ["phone", "pii"]

[[rules]]
id = "internal-email"
description = "Internal organization email"
regex = '''[a-zA-Z0-9._%+-]+@mycompany\.com'''
tags = ["email", "internal"]

[[rules]]
id = "database-url"
description = "Database URL"
regex = '''(postgresql|mysql|mongodb)://[^\s'"]+'''
tags = ["database", "connection"]

[allowlist]
description = "Files to ignore"
paths = [
    '''.env.example$''',
    '''README\.md$''',
    '''test.*\.py$'''
]
```

**Configuration testing:**
```bash
# Use custom configuration
gitleaks detect --config .gitleaks.toml --source .

# Create baseline to ignore existing secrets
gitleaks detect --source . --baseline-path .gitleaks-baseline.json
```

---

## **TP 3: Complete repository audit (35 min)**

### **Exercise 3.1: Forensic analysis with GitLeaks (20 min)**

**Scenario:** A security incident occurred. You need to analyze the `compromised-repo-demo` repository.

**Investigation to conduct:**

1. **Complete GitLeaks scan**
```bash
# Complete scan with detailed report
gitleaks detect --source . --verbose --report-format json --report-path audit-report.json

# Report analysis
jq '.[] | {rule: .RuleID, file: .File, line: .StartLine, description: .Description}' audit-report.json

# Count secrets by type
jq -r '.[].RuleID' audit-report.json | sort | uniq -c | sort -rn
```

2. **Secret metadata analysis**
```bash
# Secrets by file
jq -r '.[].File' audit-report.json | sort | uniq -c | sort -rn

# Secrets by commit (if available)
jq -r '.[].Commit' audit-report.json 2>/dev/null | sort | uniq -c | sort -rn
```

3. **Temporal analysis**
```bash
# Scan by period
gitleaks detect --source . --log-opts="--since='2023-01-01' --until='2023-06-30'" --verbose

# First secret identification
git log --reverse --oneline | head -1
gitleaks detect --source . --log-opts="--reverse" --verbose | head -10
```

**Analysis questions:**
- What is the first commit containing a secret?
- Which files contain the most secrets?
- Is there temporal evolution in secret exposure?

### **Exercise 3.2: Audit report with GitLeaks (15 min)**

**Task:** Create a structured audit report based on GitLeaks results.

**Automatic analysis script:**
```bash
#!/bin/bash
# Audit report generation script

echo "# GITLEAKS AUDIT REPORT - $(date)"
echo "## Repository: $(basename $(pwd))"
echo ""

# General statistics
echo "## General statistics"
gitleaks detect --source . --report-format json --report-path temp-report.json 2>/dev/null
total_secrets=$(jq length temp-report.json 2>/dev/null || echo "0")
echo "- Secrets detected: $total_secrets"

if [ "$total_secrets" -gt 0 ]; then
    echo "- Secret types:"
    jq -r '.[].RuleID' temp-report.json | sort | uniq -c | sort -rn | sed 's/^/  /'
    
    echo ""
    echo "## Affected files"
    jq -r '.[].File' temp-report.json | sort | uniq -c | sort -rn | sed 's/^/- /'
    
    echo ""
    echo "## Criticality level"
    if [ "$total_secrets" -gt 10 ]; then
        echo "🔴 CRITICAL: More than 10 secrets detected"
    elif [ "$total_secrets" -gt 5 ]; then
        echo "🟠 HIGH: Between 5 and 10 secrets detected"
    else
        echo "🟡 MODERATE: Less than 5 secrets detected"
    fi
fi

rm -f temp-report.json
```

---

## **TP 4: Cleanup and remediation (30 min)**

### **Exercise 4.1: Cleanup with git filter-branch and GitLeaks (20 min)**

**Objective:** Completely clean the `compromised-repo-demo` repository and verify with GitLeaks.

**Steps:**
1. Create a repository backup
2. Analyze with GitLeaks before cleanup
3. Use git filter-branch for cleanup
4. Verify with GitLeaks after cleanup

**Procedure:**
```bash
# Backup
cp -r compromised-repo-demo compromised-repo-demo.backup

# Analysis before cleanup
cd compromised-repo-demo
echo "=== BEFORE CLEANUP ==="
gitleaks detect --source . --verbose --report-format json --report-path before-cleanup.json
echo "Secrets before: $(jq length before-cleanup.json)"

# Cleanup with git filter-branch
echo "=== CLEANUP ==="

# Remove specific file
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch secrets.json' \
--prune-empty --tag-name-filter cat -- --all

# Remove another file
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch backup.sql' \
--prune-empty --tag-name-filter cat -- --all

# Remove large files
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch large-binary-file.bin' \
--prune-empty --tag-name-filter cat -- --all

# Finalization
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Verification with GitLeaks
echo "=== AFTER CLEANUP ==="
gitleaks detect --source . --verbose --report-format json --report-path after-cleanup.json
echo "Secrets after: $(jq length after-cleanup.json)"
```

**⚠️ Important note:**
`git filter-branch` rewrites Git history and changes all commit hashes. This operation is irreversible and requires a `git push --force` to update the remote repository.

### **Exercise 4.2: Post-cleanup verification with GitLeaks (10 min)**

**Tasks:**
1. Verify that all secrets have been removed with GitLeaks
2. Check that history is consistent
3. Document the cleanup process

**Verifications with GitLeaks:**
```bash
# Complete post-cleanup scan
gitleaks detect --source . --verbose

# Verify no secrets are present
if gitleaks detect --source . --exit-code; then
    echo "✅ No secrets detected - Cleanup successful"
else
    echo "❌ Secrets still present"
fi

# Before/after comparison
echo "Report comparison:"
echo "Before: $(jq length before-cleanup.json 2>/dev/null || echo 0) secrets"
echo "After: $(jq length after-cleanup.json 2>/dev/null || echo 0) secrets"

# Complementary manual verification
git log -p --all | grep -i "password\|secret\|api_key" | wc -l

# Integrity test
git fsck --full

# Repository size verification
echo "Repository size after cleanup:"
du -sh .git/
```

**Control points:**
- GitLeaks report must show 0 secrets after cleanup
- Repository size must have decreased
- Git integrity must be preserved
- Legitimate commits must be preserved

---

## **BONUS TP 5: Prevention with GitLeaks (25 min)**

### **Exercise 5.1: GitLeaks hooks installation (15 min)**

**Objective:** Set up proactive protection with GitLeaks.

**Tasks:**
1. Install security hooks with GitLeaks
2. Configure GitLeaks for the project
3. Test functionality

**Installation:**
```bash
# Use provided script
./scripts/06-security-hooks.sh

# Customize GitLeaks configuration
vim .gitleaks.toml

# Test with file containing secrets
echo 'API_KEY="sk_live_test123456789"' > test.txt
git add test.txt
git commit -m "Test commit"  # Should fail with GitLeaks

# Real-time protection test
gitleaks protect --staged --verbose
```

---

## **ADVANCED BONUS EXERCISES**

### **Bonus 1: CI/CD configuration with GitLeaks (10 min)**

**Objective:** Integrate GitLeaks into CI/CD pipeline.

**GitHub Actions configuration:**
```yaml
name: GitLeaks Security Scan
on: [push, pull_request]

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    name: GitLeaks Scan
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: Run GitLeaks
      uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Upload GitLeaks report
      if: failure()
      uses: actions/upload-artifact@v3
      with:
        name: gitleaks-report
        path: gitleaks-report.json
```

**GitLab CI configuration:**
```yaml
gitleaks:
  stage: security
  image: zricethezav/gitleaks:latest
  script:
    - gitleaks detect --source . --verbose --report-format json --report-path gitleaks-report.json
  artifacts:
    reports:
      sast: gitleaks-report.json
    when: always
    expire_in: 1 week
  only:
    - merge_requests
    - main
```

### **Bonus 2: Baseline and false positives GitLeaks (15 min)**

**Objective:** Manage false positives and create a baseline with GitLeaks.

```bash
# Create baseline to ignore existing secrets
gitleaks detect --source . --baseline-path .gitleaks-baseline.json

# Scan using baseline
gitleaks detect --source . --baseline-path .gitleaks-baseline.json

# Add exclusion rules
cat >> .gitleaks.toml << 'EOF'
[allowlist]
regexes = [
    '''password.*=.*example''',
    '''key.*=.*your_key_here''',
    '''token.*=.*replace_me'''
]
paths = [
    '''.env.example$''',
    '''test.*\.py$'''
]
EOF
```

### **Bonus 3: Advanced GitLeaks integration (20 min)**

**Objective:** Create an advanced workflow with GitLeaks.

**Complete workflow script:**
```bash
#!/bin/bash
# Advanced GitLeaks workflow

# 1. Scan with detailed report
gitleaks detect --source . --verbose \
    --report-format json --report-path detailed-report.json \
    --report-format sarif --report-path sarif-report.json

# 2. Results analysis
if [ -s detailed-report.json ]; then
    echo "🚨 Secrets detected!"
    
    # Group by type
    echo "Secret types:"
    jq -r '.[].RuleID' detailed-report.json | sort | uniq -c
    
    # Critical secrets (AWS keys, GitHub tokens)
    critical_secrets=$(jq -r '.[] | select(.RuleID | test("aws|github|stripe")) | .RuleID' detailed-report.json | wc -l)
    if [ "$critical_secrets" -gt 0 ]; then
        echo "⚠️ $critical_secrets critical secrets detected!"
        exit 1
    fi
fi

# 3. HTML report generation (optional)
if command -v pandoc &> /dev/null; then
    echo "# GitLeaks Report" > report.md
    echo "Date: $(date)" >> report.md
    echo "" >> report.md
    jq -r '.[] | "- **\(.RuleID)**: \(.File):\(.StartLine) - \(.Description)"' detailed-report.json >> report.md
    pandoc report.md -o gitleaks-report.html
fi
```

### **Bonus 4: Continuous monitoring with GitLeaks (25 min)**

**Objective:** Set up continuous secret monitoring.

**Monitoring script:**
```bash
#!/bin/bash
# GitLeaks monitoring script

REPO_PATH="$1"
WEBHOOK_URL="$2"  # Slack/Teams URL for notifications

monitor_repo() {
    cd "$REPO_PATH"
    
    # GitLeaks scan
    gitleaks detect --source . --report-format json --report-path /tmp/gitleaks-monitor.json
    
    if [ -s /tmp/gitleaks-monitor.json ]; then
        secret_count=$(jq length /tmp/gitleaks-monitor.json)
        
        # Notification
        if [ -n "$WEBHOOK_URL" ]; then
            curl -X POST "$WEBHOOK_URL" \
                -H 'Content-Type: application/json' \
                -d "{\"text\":\"🚨 $secret_count secrets detected in $REPO_PATH\"}"
        fi
        
        # Local log
        echo "$(date): $secret_count secrets detected" >> /var/log/gitleaks-monitor.log
    fi
}

# Execution
monitor_repo "$@"
```

**Cron job for automatic monitoring:**
```bash
# Add to crontab: crontab -e
# Daily scan at 2 AM
0 2 * * * /path/to/gitleaks-monitor.sh /path/to/repo https://hooks.slack.com/webhook
```

---

### **Post-training GitLeaks checklist**

```markdown
☐ GitLeaks installed on all workstations
☐ .gitleaks.toml configuration in critical projects
☐ Pre-commit hooks with GitLeaks configured
☐ GitLeaks integrated in CI/CD pipelines
☐ Baseline created for existing projects
☐ Incident procedures documented
☐ Team training on GitLeaks commands
☐ git filter-branch procedures documented
☐ Automatic monitoring set up
```

### **Additional GitLeaks resources**

**Official documentation:**
- [GitLeaks GitHub](https://github.com/gitleaks/gitleaks)
- [GitLeaks Configuration](https://github.com/gitleaks/gitleaks#configuration)
- [Default rules](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml)

**Git cleanup:**
- [Git filter-branch](https://git-scm.com/docs/git-filter-branch)
- [Git filter-repo](https://github.com/newren/git-filter-repo) (modern alternative)

**Advanced integrations:**
- [GitLeaks GitHub Action](https://github.com/gitleaks/gitleaks-action)
- [Pre-commit hooks](https://github.com/gitleaks/gitleaks#pre-commit)
- [Docker GitLeaks](https://hub.docker.com/r/zricethezav/gitleaks)

### **Essential Git commands for cleanup**

```bash
# Cleanup with git filter-branch
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch <file>' \
--prune-empty --tag-name-filter cat -- --all

# Large file cleanup
git filter-branch --force --tree-filter \
'find . -name "*.bin" -size +10M -delete' \
--prune-empty HEAD

# Finalization after cleanup
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Verification with GitLeaks
gitleaks detect --source . --verbose
```