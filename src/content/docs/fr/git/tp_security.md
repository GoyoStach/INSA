---
title: Tp concernant la securité
description: Découverte des concepts de base de sécurité avec Git
---
# Exercices Pratiques - TP Git & Cybersécurité

## **TP 1 : Détection manuelle de secrets**

### **Exercice 1.1 : Investigation d'un dépôt compromis (15 min)**

**Contexte :** Vous venez de rejoindre une équipe et devez auditer le dépôt `secrets-leak-demo`.

**Tâches :**
1. Cloner le dépôt et examiner l'état actuel
2. Rechercher des traces de secrets dans l'historique complet
3. Identifier tous les commits contenant des mots-clés suspects

**Commandes à utiliser :**
```bash
# Navigation dans l'historique
git log --oneline --all
git log --grep="password\|secret\|key\|token" --all

# Recherche dans les diffs
git log -p --all | grep -i -A3 -B3 "password\|secret\|api"

# Analyse des fichiers supprimés
git log --name-status --diff-filter=D
```

**Questions :**
- Combien de commits contiennent des secrets ?
- Quels types de secrets avez-vous trouvés ?
- À quelle date le premier secret a-t-il été ajouté ?

### **Exercice 1.2 : Reconstruction d'un fichier supprimé (15 min)**

**Tâches :**
1. Trouver le commit où `config.py` a été supprimé
2. Récupérer le contenu de ce fichier
3. Analyser tous les secrets qu'il contenait

**Commandes :**
```bash
# Trouver quand le fichier a été supprimé
git log --follow -- config.py

# Récupérer le contenu avant suppression
git show <commit-hash>:config.py

# Alternative pour voir le dernier état
git show <commit-before-deletion>:config.py
```

---

## **TP 2 : Scan automatisé avec GitLeaks (35 min)**

### **Exercice 2.1 : Maîtrise de GitLeaks (25 min)**

**Objectif :** Maîtriser toutes les fonctionnalités de GitLeaks.

**Tâches :**
1. Installer GitLeaks et vérifier l'installation
2. Scanner le dépôt `secrets-leak-demo` avec différentes options
3. Analyser et interpréter les résultats

**Procédure :**
```bash
# Installation depuis apt
# TO FIND BY YOURSELF

# Scan basique
gitleaks detect --source . --verbose

# Scan avec rapport JSON
gitleaks detect --source . --verbose --report-format json --report-path report.json

# Scan avec masquage des secrets
gitleaks detect --source . --redact --verbose

# Scan de l'historique récent (30 derniers jours)
gitleaks detect --source . --log-opts="--since='30 days ago'" --verbose
```

**Analyse à faire :**
- Combien de secrets GitLeaks détecte-t-il ?
- Quels types de secrets sont identifiés ?
- Y a-t-il des faux positifs ?
- Comment les résultats varient-ils selon les options ?

### **Exercice 2.2 : Configuration personnalisée (10 min)**

**Tâches :**
1. Créer une configuration GitLeaks personnalisée
2. Ajouter des règles pour détecter :
   - Les numéros de téléphone français
   - Les adresses email internes de votre organisation
   - Les URLs de base de données spécifiques

**Configuration exemple :**
```toml
title = "Configuration GitLeaks personnalisée"

[extend]
useDefault = true

[[rules]]
id = "french-phone"
description = "Numéro de téléphone français"
regex = '''0[1-9](?:[0-9]{8})'''
tags = ["phone", "pii"]

[[rules]]
id = "internal-email"
description = "Email interne organisation"
regex = '''[a-zA-Z0-9._%+-]+@monentreprise\.com'''
tags = ["email", "internal"]

[[rules]]
id = "database-url"
description = "URL de base de données"
regex = '''(postgresql|mysql|mongodb)://[^\s'"]+'''
tags = ["database", "connection"]

[allowlist]
description = "Fichiers à ignorer"
paths = [
    '''.env.example$''',
    '''README\.md$''',
    '''test.*\.py$'''
]
```

**Test de la configuration :**
```bash
# Utiliser la configuration personnalisée
gitleaks detect --config .gitleaks.toml --source .

# Créer une baseline pour ignorer les secrets existants
gitleaks detect --source . --baseline-path .gitleaks-baseline.json
```

---

## **TP 3 : Audit complet d'un dépôt (35 min)**

### **Exercice 3.1 : Analyse forensique avec GitLeaks (20 min)**

**Scénario :** Un incident de sécurité s'est produit. Vous devez analyser le dépôt `compromised-repo-demo`.

**Investigation à mener :**

1. **Scan GitLeaks complet**
```bash
# Scan complet avec rapport détaillé
gitleaks detect --source . --verbose --report-format json --report-path audit-report.json

# Analyse du rapport
jq '.[] | {rule: .RuleID, file: .File, line: .StartLine, description: .Description}' audit-report.json

# Compter les secrets par type
jq -r '.[].RuleID' audit-report.json | sort | uniq -c | sort -rn
```

2. **Analyse des métadonnées des secrets**
```bash
# Secrets par fichier
jq -r '.[].File' audit-report.json | sort | uniq -c | sort -rn

# Secrets par commit (si disponible)
jq -r '.[].Commit' audit-report.json 2>/dev/null | sort | uniq -c | sort -rn
```

3. **Analyse temporelle**
```bash
# Scan par période
gitleaks detect --source . --log-opts="--since='2023-01-01' --until='2023-06-30'" --verbose

# Identification du premier secret
git log --reverse --oneline | head -1
gitleaks detect --source . --log-opts="--reverse" --verbose | head -10
```

**Questions d'analyse :**
- Quel est le premier commit contenant un secret ?
- Quels fichiers contiennent le plus de secrets ?
- Y a-t-il une évolution temporelle dans l'exposition des secrets ?

### **Exercice 3.2 : Rapport d'audit avec GitLeaks (15 min)**

**Tâche :** Créer un rapport d'audit structuré basé sur les résultats GitLeaks.

**Script d'analyse automatique :**
```bash
#!/bin/bash
# Script de génération de rapport d'audit

echo "# RAPPORT D'AUDIT GITLEAKS - $(date)"
echo "## Dépôt: $(basename $(pwd))"
echo ""

# Statistiques générales
echo "## Statistiques générales"
gitleaks detect --source . --report-format json --report-path temp-report.json 2>/dev/null
total_secrets=$(jq length temp-report.json 2>/dev/null || echo "0")
echo "- Secrets détectés: $total_secrets"

if [ "$total_secrets" -gt 0 ]; then
    echo "- Types de secrets:"
    jq -r '.[].RuleID' temp-report.json | sort | uniq -c | sort -rn | sed 's/^/  /'
    
    echo ""
    echo "## Fichiers affectés"
    jq -r '.[].File' temp-report.json | sort | uniq -c | sort -rn | sed 's/^/- /'
    
    echo ""
    echo "## Niveau de criticité"
    if [ "$total_secrets" -gt 10 ]; then
        echo "🔴 CRITIQUE: Plus de 10 secrets détectés"
    elif [ "$total_secrets" -gt 5 ]; then
        echo "🟠 ÉLEVÉ: Entre 5 et 10 secrets détectés"
    else
        echo "🟡 MODÉRÉ: Moins de 5 secrets détectés"
    fi
fi

rm -f temp-report.json
```

---

## **TP 4 : Nettoyage et remediation (30 min)**

### **Exercice 4.1 : Nettoyage avec git filter-branch et GitLeaks (20 min)**

**Objectif :** Nettoyer complètement le dépôt `compromised-repo-demo` et vérifier avec GitLeaks.

**Étapes :**
1. Créer une sauvegarde du dépôt
2. Analyser avec GitLeaks avant nettoyage
3. Utiliser git filter-branch pour le nettoyage
4. Vérifier avec GitLeaks après nettoyage

**Procédure :**
```bash
# Sauvegarde
cp -r compromised-repo-demo compromised-repo-demo.backup

# Analyse avant nettoyage
cd compromised-repo-demo
echo "=== AVANT NETTOYAGE ==="
gitleaks detect --source . --verbose --report-format json --report-path before-cleanup.json
echo "Secrets avant: $(jq length before-cleanup.json)"

# Nettoyage avec git filter-branch
echo "=== NETTOYAGE ==="

# Suppression d'un fichier spécifique
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch secrets.json' \
--prune-empty --tag-name-filter cat -- --all

# Suppression d'un autre fichier
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch backup.sql' \
--prune-empty --tag-name-filter cat -- --all

# Suppression des gros fichiers
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch large-binary-file.bin' \
--prune-empty --tag-name-filter cat -- --all

# Finalisation
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Vérification avec GitLeaks
echo "=== APRÈS NETTOYAGE ==="
gitleaks detect --source . --verbose --report-format json --report-path after-cleanup.json
echo "Secrets après: $(jq length after-cleanup.json)"
```

**⚠️ Note importante :**
`git filter-branch` réécrit l'historique Git et change tous les hash de commits. Cette opération est irréversible et nécessite un `git push --force` pour mettre à jour le dépôt distant.

### **Exercice 4.2 : Vérification post-nettoyage avec GitLeaks (10 min)**

**Tâches :**
1. Vérifier que tous les secrets ont été supprimés avec GitLeaks
2. Contrôler que l'historique est cohérent
3. Documenter le processus de nettoyage

**Vérifications avec GitLeaks :**
```bash
# Scan complet post-nettoyage
gitleaks detect --source . --verbose

# Vérification qu'aucun secret n'est présent
if gitleaks detect --source . --exit-code; then
    echo "✅ Aucun secret détecté - Nettoyage réussi"
else
    echo "❌ Des secrets sont encore présents"
fi

# Comparaison avant/après
echo "Comparaison des rapports:"
echo "Avant: $(jq length before-cleanup.json 2>/dev/null || echo 0) secrets"
echo "Après: $(jq length after-cleanup.json 2>/dev/null || echo 0) secrets"

# Vérification manuelle complémentaire
git log -p --all | grep -i "password\|secret\|api_key" | wc -l

# Test d'intégrité
git fsck --full

# Vérification de la taille du dépôt
echo "Taille du dépôt après nettoyage:"
du -sh .git/
```

**Points de contrôle :**
- Le rapport GitLeaks doit montrer 0 secret après nettoyage
- La taille du dépôt doit avoir diminué
- L'intégrité Git doit être préservée
- Les commits légitimes doivent être conservés

---

## **BONUS TP 5 : Prévention avec GitLeaks (25 min)**

### **Exercice 5.1 : Installation des hooks GitLeaks (15 min)**

**Objectif :** Mettre en place une protection proactive avec GitLeaks.

**Tâches :**
1. Installer les hooks de sécurité avec GitLeaks
2. Configurer GitLeaks pour le projet
3. Tester le fonctionnement

**Installation :**
```bash
# Utiliser le script fourni
./scripts/06-security-hooks.sh

# Personnaliser la configuration GitLeaks
vim .gitleaks.toml

# Tester avec un fichier contenant des secrets
echo 'API_KEY="sk_live_test123456789"' > test.txt
git add test.txt
git commit -m "Test commit"  # Devrait échouer avec GitLeaks

# Test de protection en temps réel
gitleaks protect --staged --verbose
```


---

## **EXERCICES BONUS AVANCÉS**

### **Bonus 1: Configuration CI/CD avec GitLeaks (10 min)**

**Objectif :** Intégrer GitLeaks dans la pipeline CI/CD.

**Configuration GitHub Actions :**
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

**Configuration GitLab CI :**
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


### **Bonus 2: Baseline et faux positifs GitLeaks (15 min)**

**Objectif :** Gérer les faux positifs et créer une baseline avec GitLeaks.

```bash
# Créer une baseline pour ignorer les secrets existants
gitleaks detect --source . --baseline-path .gitleaks-baseline.json

# Scan en utilisant la baseline
gitleaks detect --source . --baseline-path .gitleaks-baseline.json

# Ajouter des règles d'exclusion
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

### **Bonus 3 : Intégration GitLeaks avancée (20 min)**

**Objectif :** Créer un workflow avancé avec GitLeaks.

**Script de workflow complet :**
```bash
#!/bin/bash
# Workflow GitLeaks avancé

# 1. Scan avec rapport détaillé
gitleaks detect --source . --verbose \
    --report-format json --report-path detailed-report.json \
    --report-format sarif --report-path sarif-report.json

# 2. Analyse des résultats
if [ -s detailed-report.json ]; then
    echo "🚨 Secrets détectés!"
    
    # Grouper par type
    echo "Types de secrets:"
    jq -r '.[].RuleID' detailed-report.json | sort | uniq -c
    
    # Secrets critiques (clés AWS, GitHub tokens)
    critical_secrets=$(jq -r '.[] | select(.RuleID | test("aws|github|stripe")) | .RuleID' detailed-report.json | wc -l)
    if [ "$critical_secrets" -gt 0 ]; then
        echo "⚠️ $critical_secrets secrets critiques détectés!"
        exit 1
    fi
fi

# 3. Génération de rapport HTML (optionnel)
if command -v pandoc &> /dev/null; then
    echo "# Rapport GitLeaks" > report.md
    echo "Date: $(date)" >> report.md
    echo "" >> report.md
    jq -r '.[] | "- **\(.RuleID)**: \(.File):\(.StartLine) - \(.Description)"' detailed-report.json >> report.md
    pandoc report.md -o gitleaks-report.html
fi
```

### **Bonus 4 : Monitoring continu avec GitLeaks (25 min)**

**Objectif :** Mettre en place un monitoring continu des secrets.

**Script de monitoring :**
```bash
#!/bin/bash
# Script de monitoring GitLeaks

REPO_PATH="$1"
WEBHOOK_URL="$2"  # URL Slack/Teams pour notifications

monitor_repo() {
    cd "$REPO_PATH"
    
    # Scan GitLeaks
    gitleaks detect --source . --report-format json --report-path /tmp/gitleaks-monitor.json
    
    if [ -s /tmp/gitleaks-monitor.json ]; then
        secret_count=$(jq length /tmp/gitleaks-monitor.json)
        
        # Notification
        if [ -n "$WEBHOOK_URL" ]; then
            curl -X POST "$WEBHOOK_URL" \
                -H 'Content-Type: application/json' \
                -d "{\"text\":\"🚨 $secret_count secrets détectés dans $REPO_PATH\"}"
        fi
        
        # Log local
        echo "$(date): $secret_count secrets détectés" >> /var/log/gitleaks-monitor.log
    fi
}

# Exécution
monitor_repo "$@"
```

**Cron job pour monitoring automatique :**
```bash
# Ajouter au crontab : crontab -e
# Scan quotidien à 2h du matin
0 2 * * * /path/to/gitleaks-monitor.sh /path/to/repo https://hooks.slack.com/webhook
```

---


### **Checklist post-formation GitLeaks**

```markdown
☐ GitLeaks installé sur tous les postes
☐ Configuration .gitleaks.toml dans les projets critiques
☐ Hooks pre-commit avec GitLeaks configurés
☐ GitLeaks intégré dans les pipelines CI/CD
☐ Baseline créée pour les projets existants
☐ Documentation des procédures d'incident
☐ Formation des équipes aux commandes GitLeaks
☐ Procédures git filter-branch documentées
☐ Monitoring automatique mis en place
```

### **Ressources GitLeaks complémentaires**

**Documentation officielle :**
- [GitLeaks GitHub](https://github.com/gitleaks/gitleaks)
- [Configuration GitLeaks](https://github.com/gitleaks/gitleaks#configuration)
- [Règles par défaut](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml)

**Git nettoyage :**
- [Git filter-branch](https://git-scm.com/docs/git-filter-branch)
- [Git filter-repo](https://github.com/newren/git-filter-repo) (alternative moderne)

**Intégrations avancées :**
- [GitLeaks Action GitHub](https://github.com/gitleaks/gitleaks-action)
- [Pre-commit hooks](https://github.com/gitleaks/gitleaks#pre-commit)
- [Docker GitLeaks](https://hub.docker.com/r/zricethezav/gitleaks)

### **Commandes Git essentielles pour le nettoyage**

```bash
# Nettoyage avec git filter-branch
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch <file>' \
--prune-empty --tag-name-filter cat -- --all

# Nettoyage de gros fichiers
git filter-branch --force --tree-filter \
'find . -name "*.bin" -size +10M -delete' \
--prune-empty HEAD

# Finalisation après nettoyage
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Vérification avec GitLeaks
gitleaks detect --source . --verbose
```