---
title: Filter branch
description: Filtre branch cheat cheet pour la réécriture d'histo
---
# Guide Complet : git filter-branch

## **Vue d'ensemble**

`git filter-branch` est un outil Git qui permet de **réécrire l'historique** en appliquant des filtres à chaque commit. C'est l'équivalent d'une "machine à remonter le temps" qui rejoue l'historique avec des modifications.

### **Principe de fonctionnement**

```
Historique original:  A → B → C → D → E (HEAD)
                      ↓
Filtrage:            A' → B' → C' → D' → E' (nouveau HEAD)
```

Chaque commit est "rejoué" avec les modifications spécifiées par les filtres.

---

## **Types de filtres disponibles**

### **1. --index-filter (Le plus utilisé)**
Modifie l'**index Git** (staging area) à chaque commit.

```bash
git filter-branch --index-filter 'COMMANDE' [OPTIONS]
```

**Avantages :**
- ✅ Très rapide (pas de checkout des fichiers)
- ✅ Idéal pour supprimer des fichiers
- ✅ Fonctionne même avec de gros dépôts

**Exemple typique :**
```bash
# Supprimer un fichier de tout l'historique
git filter-branch --index-filter 'git rm --cached --ignore-unmatch secrets.txt'
```

### **2. --tree-filter**
Modifie l'**arbre de travail** (working directory) à chaque commit.

```bash
git filter-branch --tree-filter 'COMMANDE' [OPTIONS]
```

**Avantages :**
- ✅ Plus intuitif (travaille avec des fichiers réels)
- ✅ Permet des opérations complexes sur les fichiers

**Inconvénients :**
- ❌ Plus lent (checkout à chaque commit)
- ❌ Consomme plus d'espace disque

**Exemple :**
```bash
# Supprimer tous les fichiers .log
git filter-branch --tree-filter 'find . -name "*.log" -delete'
```

### **3. --msg-filter**
Modifie les **messages de commit**.

```bash
# Remplacer un mot dans tous les messages
git filter-branch --msg-filter 'sed "s/password/credential/g"'
```

### **4. --env-filter**
Modifie les **variables d'environnement** (auteur, date, etc.).

```bash
# Changer l'email de l'auteur
git filter-branch --env-filter '
if [ "$GIT_AUTHOR_EMAIL" = "old@example.com" ]; then
    export GIT_AUTHOR_EMAIL="new@example.com"
fi'
```

### **5. --commit-filter**
Le plus puissant : permet de **réécrire complètement** les commits.

```bash
# Fusionner des commits ou les supprimer complètement
git filter-branch --commit-filter 'git commit-tree "$@"'
```

---

## **Syntaxe détaillée**

### **Commande complète**
```bash
git filter-branch [OPTIONS] [--] [RÉVISIONS]
```

### **Options importantes**

| Option | Description | Usage |
|--------|-------------|-------|
| `--force` ou `-f` | Force l'exécution même si backup existe | Toujours recommandé |
| `--prune-empty` | Supprime les commits vides après filtrage | Essentiel pour un historique propre |
| `--tag-name-filter` | Filtre les noms de tags | `cat` pour conserver, `'sed ...'` pour modifier |
| `--subdirectory-filter` | Extrait un sous-répertoire | Créer un nouveau dépôt d'un dossier |
| `--` | Sépare les options des révisions | Évite les ambiguïtés |
| `--all` | Traite toutes les branches et tags | Pour un nettoyage complet |

---

## **Exemples pratiques détaillés**

### **1. Supprimer un fichier spécifique**

```bash
# Syntaxe de base
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch fichier-secret.txt' \
  --prune-empty --tag-name-filter cat -- --all

# Explication de chaque partie :
# --force                      : Force l'exécution
# --index-filter               : Utilise le filtre d'index (rapide)
# git rm --cached              : Supprime du staging (pas du disque)
# --ignore-unmatch             : Pas d'erreur si le fichier n'existe pas
# --prune-empty                : Supprime les commits devenus vides
# --tag-name-filter cat        : Préserve les noms de tags
# -- --all                     : Traite toutes les branches
```

### **2. Supprimer plusieurs fichiers**

```bash
# Méthode 1 : Pattern avec index-filter
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch *.key *.pem secrets.json config.py' \
  --prune-empty --tag-name-filter cat -- --all

# Méthode 2 : Script bash complexe
git filter-branch --force --index-filter '
  git rm --cached --ignore-unmatch secrets.json
  git rm --cached --ignore-unmatch backup.sql
  git rm --cached --ignore-unmatch *.key
  git rm --cached --ignore-unmatch large-file.bin
' --prune-empty --tag-name-filter cat -- --all
```

### **3. Supprimer par taille de fichier**

```bash
# Supprimer tous les fichiers > 10MB avec tree-filter
git filter-branch --force --tree-filter \
  'find . -type f -size +10M -delete' \
  --prune-empty --tag-name-filter cat -- --all

# Version plus sophistiquée avec logging
git filter-branch --force --tree-filter '
  find . -type f -size +10M -print0 | while read -d $'\''\0'\'' file; do
    echo "Suppression de: $file" >&2
    rm -f "$file"
  done
' --prune-empty --tag-name-filter cat -- --all
```

### **4. Nettoyer un répertoire spécifique**

```bash
# Supprimer tout le contenu d'un dossier
git filter-branch --force --tree-filter \
  'rm -rf dossier-sensible/' \
  --prune-empty --tag-name-filter cat -- --all

# Extraire uniquement un sous-répertoire (créer un nouveau dépôt)
git filter-branch --force --subdirectory-filter mon-module/ \
  --prune-empty --tag-name-filter cat -- --all
```

### **5. Remplacer du contenu dans les fichiers**

```bash
# Remplacer des mots de passe dans tous les fichiers
git filter-branch --force --tree-filter '
  find . -type f -name "*.py" -exec sed -i "s/password123/REMOVED/g" {} +
  find . -type f -name "*.js" -exec sed -i "s/api_key_secret/REMOVED/g" {} +
' --prune-empty --tag-name-filter cat -- --all
```

---

## **Processus interne détaillé**

### **Ce qui se passe pendant l'exécution :**

1. **Backup automatique** : Git sauvegarde les refs dans `refs/original/`
2. **Parcours chronologique** : Traite chaque commit dans l'ordre
3. **Application du filtre** : Exécute la commande spécifiée
4. **Création nouveau commit** : Avec le même auteur/date mais nouveau hash
5. **Mise à jour des refs** : Pointe vers les nouveaux commits

### **Exemple de logs pendant l'exécution :**

```
Rewrite 1a2b3c4d (1/47) (0 seconds passed, 46 remaining)
Rewrite 2b3c4d5e (2/47) (1 seconds passed, 45 remaining)
...
Ref 'refs/heads/main' was rewritten
Ref 'refs/heads/feature-branch' was rewritten
```

---

## **Gestion des erreurs courantes**

### **1. "Cannot create a new backup"**
```bash
# Problème : Backup précédent existe
# Solution : Forcer ou nettoyer
git filter-branch --force ...

# Ou nettoyer manuellement
rm -rf .git/refs/original/
```

### **2. "Command failed"**
```bash
# Problème : Commande dans le filtre échoue
# Solution : Ajouter gestion d'erreur
git filter-branch --index-filter \
  'git rm --cached --ignore-unmatch file.txt || true'
```

### **3. Commits vides après filtrage**
```bash
# Problème : Des commits deviennent vides
# Solution : Utiliser --prune-empty
git filter-branch --prune-empty ...
```

### **4. Performance lente**
```bash
# Problème : tree-filter trop lent
# Solution : Utiliser index-filter quand possible
# Au lieu de :
git filter-branch --tree-filter 'rm -f secrets.txt'
# Utiliser :
git filter-branch --index-filter 'git rm --cached --ignore-unmatch secrets.txt'
```

---

## **Post-traitement obligatoire**

### **Après chaque filter-branch :**

```bash
# 1. Nettoyer les références
git reflog expire --expire=now --all

# 2. Garbage collection agressive
git gc --prune=now --aggressive

# 3. Vérifier l'intégrité
git fsck --full

# 4. Forcer la mise à jour du remote
git push --force-with-lease --all
git push --force-with-lease --tags
```

---

## **Alternatives modernes**

### **git filter-repo (Recommandé)**
```bash
# Installation
pip3 install git-filter-repo

# Utilisation (plus simple et rapide)
git filter-repo --path secrets.txt --invert-paths
git filter-repo --strip-blobs-bigger-than 10M
```

### **Comparaison des outils**

| Critère | filter-branch | filter-repo | BFG |
|---------|---------------|-------------|-----|
| **Vitesse** | Lent | Rapide | Très rapide |
| **Complexité** | Élevée | Moyenne | Faible |
| **Flexibilité** | Maximale | Élevée | Limitée |
| **Maintenance** | Obsolète | Actif | Actif |
| **Courbe d'apprentissage** | Difficile | Moyenne | Facile |

---

## **Bonnes pratiques pour filter-branch**

### **1. Préparation**
```bash
# Toujours créer une sauvegarde
cp -r mon-depot mon-depot-backup

# Travailler sur un clone
git clone --mirror original-repo.git cleaned-repo.git
cd cleaned-repo.git
```

### **2. Test sur une branche**
```bash
# Tester d'abord sur une branche
git checkout -b test-cleanup
git filter-branch --force --index-filter '...' HEAD~10..HEAD

# Si OK, appliquer sur tout l'historique
git checkout main
git filter-branch --force --index-filter '...' --all
```

### **3. Vérification**
```bash
# Vérifier que les secrets sont supprimés
gitleaks detect --source . --verbose

# Vérifier la taille
du -sh .git/

# Vérifier l'intégrité
git fsck --full
```

### **4. Script de nettoyage complet**
```bash
#!/bin/bash
# Script de nettoyage sécurisé

set -e  # Arrêter en cas d'erreur

echo "🚨 ATTENTION: Cette opération est irréversible!"
read -p "Continuer? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Sauvegarde
echo "📦 Création de la sauvegarde..."
cp -r . ../backup-$(date +%Y%m%d-%H%M%S)

# Nettoyage
echo "🧹 Nettoyage en cours..."
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch secrets.json config.py *.key' \
  --prune-empty --tag-name-filter cat -- --all

# Post-traitement
echo "🔧 Post-traitement..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Vérification
echo "✅ Vérification avec GitLeaks..."
if gitleaks detect --source . --exit-code; then
    echo "✅ Aucun secret détecté!"
else
    echo "❌ Des secrets sont encore présents!"
    exit 1
fi

echo "🎉 Nettoyage terminé avec succès!"
```

---

## **Cas d'usage avancés**

### **1. Diviser un dépôt**
```bash
# Extraire un module en dépôt séparé
git filter-branch --subdirectory-filter module-auth/ \
  --prune-empty --tag-name-filter cat -- --all
```

### **2. Fusionner des commits**
```bash
# Utiliser commit-filter pour fusionner
git filter-branch --commit-filter '
  if [ "$GIT_COMMIT" = "commit-a-supprimer" ]; then
    skip_commit "$@"
  else
    git commit-tree "$@"
  fi
' HEAD~10..HEAD
```

### **3. Anonymiser l'historique**
```bash
# Remplacer tous les emails
git filter-branch --env-filter '
  export GIT_AUTHOR_EMAIL="anonymous@example.com"
  export GIT_COMMITTER_EMAIL="anonymous@example.com"
' --all
```

---

## **⚠️ Avertissements importants**

### **Risques majeurs :**
1. **Irréversible** : L'historique original est perdu
2. **Cassure des signatures** : Les commits signés deviennent invalides
3. **Problèmes de collaboration** : Force push nécessaire
4. **Références externes** : Les liens vers les commits cassent

### **Quand NE PAS utiliser filter-branch :**
- Sur un dépôt partagé en production
- Sans sauvegarde complète
- Si vous n'êtes pas sûr des conséquences
- Pour de petites modifications (utiliser `git revert` à la place)
