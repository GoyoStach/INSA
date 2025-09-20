---
title: Concepts avancé git
description: Processus de merge et gitflows
---

## Les Concepts Avancés de Git : Branches, Merge et Rebase 🌳

### Les Branches : L'Art de Créer des Univers Parallèles

#### Qu'est-ce qu'une Branche VRAIMENT ?

Imaginez que votre projet est comme un arbre 🌳. Le tronc principal (main/master) représente votre code stable et fonctionnel. Les branches sont comme... eh bien, des branches ! Chacune explore une direction différente.

**Mais techniquement, une branche c'est quoi ?**
- Juste un **pointeur mobile** vers un commit spécifique
- Quand vous commitez sur une branche, le pointeur avance automatiquement
- Créer une branche = créer un nouveau pointeur (0 coût en performance !)

```bash
# Visualisons cela
git log --oneline --graph --all
```

#### Le Cycle de Vie d'une Branche

**1. Naissance** 👶
```bash
# Depuis main
git checkout main
git checkout -b feature/nouvelle-fonctionnalite

# Ou plus moderne
git switch -c feature/nouvelle-fonctionnalite
```

**2. Développement** 💪
```bash
# Travaillez tranquillement
echo "nouveau code" >> fichier.txt
git add fichier.txt
git commit -m "Ajout fonctionnalité géniale"
```

**3. Synchronisation** (importante !)
```bash
# Récupérez les dernières modifs de main
git checkout main
git pull origin main
git checkout feature/nouvelle-fonctionnalite
git merge main  # ou git rebase main (on y vient !)
```

**4. Intégration** 🤝
```bash
git checkout main
git merge feature/nouvelle-fonctionnalite
```

**5. Nettoyage** 🧹
```bash
git branch -d feature/nouvelle-fonctionnalite
```

### Merge : La Fusion des Mondes 🌍➕🌎

#### Les Types de Merge

**1. Fast-Forward Merge (le plus simple)**
```
Avant :
main:     A---B---C
feature:           D---E

Après merge :
main:     A---B---C---D---E
```

Ça arrive quand main n'a pas bougé depuis la création de la branche. Git dit : "Facile, je déplace juste le pointeur !"

**2. Three-Way Merge (le classique)**
```
Avant :
main:     A---B---C---F
               \
feature:        D---E

Après merge :
main:     A---B---C---F---G
               \         /
feature:        D---E---/
```

Git crée un **commit de merge** (G) qui a deux parents !

**3. Merge avec Conflits (l'aventure commence !)**

```bash
# Scénario : deux personnes modifient la même ligne
# Branch main : "Prix: 3€"
# Branch feature : "Prix: 2.5€"

git merge feature/prix-reduits
# CONFLICT! 🚨
```

Git vous montre quelque chose comme ça :
```
Prix: 
<<<<<<< HEAD
3€
=======
2.5€
>>>>>>> feature/prix-reduits
```

**Comment résoudre :**
1. Éditez le fichier manuellement
2. Supprimez les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`
3. Gardez ce que vous voulez
4. `git add` le fichier résolu
5. `git commit` (Git prépare automatiquement le message)

#### Strategies de Merge

```bash
# Merge classique (crée toujours un commit de merge)
git merge --no-ff feature-branch

# Squash merge (écrase tous les commits en un seul)
git merge --squash feature-branch
git commit -m "Fonctionnalité complète en un commit"
```

### Rebase : La Réécriture de l'Histoire ✨

#### Qu'est-ce que le Rebase ?

Le rebase, c'est comme dire à Git : "Fais comme si ma branche avait été créée à partir du dernier commit de main, MÊME si ce n'est pas vrai historiquement."

```
Avant rebase :
main:     A---B---C---F
               \
feature:        D---E

Après rebase :
main:     A---B---C---F
                       \
feature:                D'---E'
```

Les commits D et E sont **réécrits** (D' et E') pour s'appliquer après F !

#### Rebase vs Merge : Le Grand Débat 🥊

**Team Merge dit :**
- "L'histoire vraie compte ! On voit quand les branches ont été créées"
- "Plus sûr, on ne réécrit pas l'histoire"
- "Les commits de merge documentent les intégrations"

**Team Rebase dit :**
- "Histoire linéaire = plus facile à lire"
- "Pas de commits de merge parasites"
- "On dirait que tout a été développé séquentiellement"

#### Rebase Interactif : Le Couteau Suisse 🛠️

```bash
git rebase -i HEAD~3  # Modifier les 3 derniers commits
```

Git vous ouvre un éditeur avec quelque chose comme :
```
pick a1b2c3d Ajout du menu
pick e4f5g6h Correction typo
pick i7j8k9l Ajout descriptions

# Commands:
# p, pick = utiliser le commit
# r, reword = utiliser le commit mais modifier le message
# e, edit = utiliser le commit mais s'arrêter pour modification
# s, squash = utiliser le commit mais le fusionner avec le précédent
# d, drop = supprimer le commit
```

**Cas d'usage magiques :**
- Corriger un message de commit pourri
- Fusionner plusieurs petits commits en un seul
- Supprimer un commit embarrassant
- Réorganiser l'ordre des commits

#### Le Rebase du Quotidien

**Scenario typique :**
```bash
# Vous travaillez sur une feature
git checkout feature/awesome-stuff

# Pendant ce temps, main a évolué
# Au lieu de merger main dans votre branche...
git rebase main

# Résultat : votre branche semble avoir été créée depuis le dernier commit de main !
```

### Les Règles d'Or ⚖️

#### Quand Utiliser Merge
- Intégrer une branche de feature dans main
- Préserver l'historique exact du travail collaboratif
- Quand vous travaillez sur une branche partagée

#### Quand Utiliser Rebase
- Nettoyer votre branche avant de la merger
- Synchroniser votre branche locale avec main
- Réorganiser vos commits locaux (pas encore pushés !)

#### LA RÈGLE ULTIME 🚨
**NEVER REBASE SHARED HISTORY !**
Ne rebasez JAMAIS une branche qui a été pushée et sur laquelle d'autres personnes travaillent. Vous allez créer un chaos temporel ! 

### Exemples Pratiques 🧪

#### Workflow avec Merge
```bash
git checkout main
git pull origin main
git checkout -b feature/login-system

# Développement...
git add .
git commit -m "Ajout système de login"
git commit -m "Tests pour le login"
git commit -m "Correction bug login"

# Intégration
git checkout main
git pull origin main  # Au cas où main ait évolué
git merge feature/login-system
git push origin main
git branch -d feature/login-system
```

#### Workflow avec Rebase
```bash
git checkout main
git pull origin main
git checkout -b feature/login-system

# Développement...
git add .
git commit -m "WIP: login en cours"
git commit -m "Presque fini"
git commit -m "Login fonctionnel"

# Nettoyage avant intégration
git rebase -i HEAD~3  # Squash en un seul commit propre
git rebase main       # Mettre à jour par rapport à main

# Intégration propre
git checkout main
git merge feature/login-system  # Fast-forward !
```

#### Résolution de Conflits en Rebase
```bash
git rebase main
# CONFLICT!

# Résolvez le conflit dans les fichiers
git add fichier-resolu.txt
git rebase --continue

# Si vous voulez abandonner
git rebase --abort
```

### Commandes de Debug et Visualisation 🔍

```bash
# Voir l'arbre des branches
git log --oneline --graph --all --decorate

# Voir d'où vient une branche
git merge-base main feature-branch

# Voir les commits uniquement dans une branche
git log main..feature-branch

# Voir qui a modifié quoi
git blame fichier.txt

# Visualiser les différences
git diff main...feature-branch  # Trois points = depuis le point de divergence
```

### Anti-Patterns et Erreurs Communes ⚠️

**❌ Ne jamais faire :**
```bash
# Rebase une branche publique
git checkout main
git rebase feature  # NON ! main est partagée !

# Merge main dans votre branche de feature repetitivement
git checkout feature
git merge main  # Crée des commits de merge pollués
```

**✅ Mieux faire :**
```bash
# Garder votre branche à jour
git checkout feature
git rebase main  # Propre et linéaire

# Ou si vous préférez merge
git checkout main
git merge feature  # Une seule fois, à la fin
```
