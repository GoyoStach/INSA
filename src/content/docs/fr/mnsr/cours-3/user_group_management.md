---
title: Utilisateurs & groupes
description: "Les utilisateurs et groupes sous Unix/Linux"
---
# Utilisateurs & groupes

## Les utilisateurs et groupes sous Unix/Linux

### Concepts fondamentaux

**Utilisateurs** : Chaque personne ou service qui accède au système possède un compte utilisateur unique, identifié par un nom (login) et un numéro (UID - User ID).

**Groupes** : Collections d'utilisateurs qui partagent des permissions similaires, identifiés par un nom et un numéro (GID - Group ID).

### Mise en place et gestion

**Création d'utilisateurs :**
- `useradd nom_utilisateur` : crée un nouvel utilisateur
- `passwd nom_utilisateur` : définit le mot de passe
- `usermod` : modifie les propriétés d'un utilisateur existant
- `userdel` : supprime un utilisateur

**Gestion des groupes :**
- `groupadd nom_groupe` : crée un nouveau groupe
- `usermod -aG nom_groupe nom_utilisateur` : ajoute un utilisateur à un groupe
- `gpasswd -d nom_utilisateur nom_groupe` : retire un utilisateur d'un groupe
- `groupdel` : supprime un groupe

### Fichiers de configuration importants

- `/etc/passwd` : informations sur les utilisateurs
- `/etc/group` : informations sur les groupes  
- `/etc/shadow` : mots de passe chiffrés (accès restreint)
- `/etc/gshadow` : mots de passe des groupes

### Utilité et avantages

**Sécurité renforcée :** Chaque utilisateur ne peut accéder qu'aux ressources qui lui sont autorisées, limitant les dégâts en cas de compromission d'un compte.

**Séparation des responsabilités :** Différents utilisateurs peuvent avoir des rôles distincts (administrateur, développeur, utilisateur final) avec des permissions adaptées.

**Gestion collaborative :** Les groupes permettent de partager facilement des fichiers et ressources entre plusieurs utilisateurs travaillant sur le même projet.

**Audit et traçabilité :** Chaque action peut être associée à un utilisateur spécifique, facilitant le suivi et la résolution de problèmes.

**Isolation des processus :** Les applications peuvent s'exécuter sous des comptes dédiés, limitant leur impact sur le système en cas de dysfonctionnement.

### Bonnes pratiques

- Utiliser le principe du moindre privilège : donner uniquement les permissions nécessaires
- Créer des comptes de service dédiés pour les applications
- Organiser les utilisateurs en groupes logiques selon leur fonction
- Surveiller régulièrement les comptes actifs et supprimer ceux qui ne sont plus nécessaires
- Utiliser `sudo` plutôt que de travailler directement en root

Cette architecture permet une gestion fine et sécurisée des accès, essentielle dans un environnement multi-utilisateur.

## Valeurs numériques des permissions chmod

### 1. Système de notation octale

Chaque permission a une valeur numérique :
- **r (read)** = 4
- **w (write)** = 2  
- **x (execute)** = 1
- **- (aucune permission)** = 0

### 2. Calcul par addition

Pour chaque groupe (propriétaire, groupe, autres), on additionne les valeurs :

```
r + w + x = 4 + 2 + 1 = 7  (toutes permissions)
r + w     = 4 + 2     = 6  (lecture + écriture)
r + x     = 4 + 1     = 5  (lecture + exécution)
r         = 4         = 4  (lecture seule)
w + x     = 2 + 1     = 3  (écriture + exécution)
w         = 2         = 2  (écriture seule - rare)
x         = 1         = 1  (exécution seule)
          = 0         = 0  (aucune permission)
```

### 3. Structure à 3 chiffres

**Format : `chmod ABC fichier`**
- **A** = permissions du propriétaire (user)
- **B** = permissions du groupe (group)  
- **C** = permissions des autres (others)

### 4. Exemples détaillés

#### `chmod 755`
- **7** (propriétaire) = 4+2+1 = rwx (lecture, écriture, exécution)
- **5** (groupe) = 4+1 = r-x (lecture, exécution)
- **5** (autres) = 4+1 = r-x (lecture, exécution)
- **Résultat** : `rwxr-xr-x`

#### `chmod 644`  
- **6** (propriétaire) = 4+2 = rw- (lecture, écriture)
- **4** (groupe) = 4 = r-- (lecture seule)
- **4** (autres) = 4 = r-- (lecture seule)
- **Résultat** : `rw-r--r--`

#### `chmod 600`
- **6** (propriétaire) = 4+2 = rw- (lecture, écriture)
- **0** (groupe) = 0 = --- (aucune permission)
- **0** (autres) = 0 = --- (aucune permission)
- **Résultat** : `rw-------`

#### `chmod 777`
- **7** (propriétaire) = 4+2+1 = rwx
- **7** (groupe) = 4+2+1 = rwx  
- **7** (autres) = 4+2+1 = rwx
- **Résultat** : `rwxrwxrwx` (tous droits pour tous)

### 5. Permissions spéciales (4ème chiffre)

On peut ajouter un 4ème chiffre en préfixe pour les permissions spéciales :

```
4000 = SetUID (s sur propriétaire)
2000 = SetGID (s sur groupe)  
1000 = Sticky bit (t sur autres)
```

#### Exemples avec 4 chiffres :

#### `chmod 4755` (SetUID)
- **4** = SetUID activé
- **7** (propriétaire) = rwx mais affiché comme `rws`
- **5** (groupe) = r-x
- **5** (autres) = r-x
- **Résultat** : `rwsr-xr-x`

#### `chmod 2755` (SetGID)
- **2** = SetGID activé
- **7** (propriétaire) = rwx
- **5** (groupe) = r-x mais affiché comme `r-s`
- **5** (autres) = r-x
- **Résultat** : `rwxr-sr-x`

#### `chmod 1755` (Sticky bit)
- **1** = Sticky bit activé
- **7** (propriétaire) = rwx
- **5** (groupe) = r-x
- **5** (autres) = r-x mais affiché comme `r-t`
- **Résultat** : `rwxr-xr-t`

### 6. Combinaisons des permissions spéciales

```bash
chmod 6755  # SetUID + SetGID = rwsr-sr-x
chmod 7755  # SetUID + SetGID + Sticky = rwsr-sr-t
```

### 7. Table de référence rapide

| Octal | Binaire | Permissions | Description |
|-------|---------|-------------|-------------|
| 0 | 000 | --- | Aucune |
| 1 | 001 | --x | Exécution seule |
| 2 | 010 | -w- | Écriture seule |
| 3 | 011 | -wx | Écriture + Exécution |
| 4 | 100 | r-- | Lecture seule |
| 5 | 101 | r-x | Lecture + Exécution |
| 6 | 110 | rw- | Lecture + Écriture |
| 7 | 111 | rwx | Toutes permissions |

### 8. Cas d'usage courants

```bash
chmod 755  # Exécutable standard (rwxr-xr-x)
chmod 644  # Fichier de données (rw-r--r--)
chmod 600  # Fichier privé (rw-------)
chmod 700  # Dossier privé (rwx------)
chmod 666  # Fichier modifiable par tous (rw-rw-rw-)
chmod 777  # Accès total (rwxrwxrwx) - DANGEREUX
chmod 000  # Aucun accès (---------)
```

Le système octal permet une notation compacte et précise des permissions, très pratique pour l'administration système.