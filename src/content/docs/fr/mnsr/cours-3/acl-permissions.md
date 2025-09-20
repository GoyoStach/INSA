---
title: Permissions ACL
description: "Access Control list"
---

# Les commandes de base pour les ACL (Access Control Lists)

### 📚 Commandes principales

#### **1. `setfacl` - Définir les ACL**
Commande pour créer, modifier ou supprimer les permissions ACL.

#### **2. `getfacl` - Consulter les ACL**  
Commande pour visualiser les permissions ACL existantes.

---

### 🔧 `setfacl` - Syntaxe et options

#### **Syntaxe de base :**
```bash
setfacl [options] [règles] fichier/dossier
```

#### **Options principales :**

| Option | Description | Exemple |
|--------|-------------|---------|
| `-m` | **Modifier** - Ajouter/modifier une règle ACL | `setfacl -m u:alice:rwx fichier` |
| `-x` | **Supprimer** - Retirer une règle ACL spécifique | `setfacl -x u:alice fichier` |
| `-b` | **Supprimer tout** - Effacer toutes les ACL | `setfacl -b fichier` |
| `-R` | **Récursif** - Appliquer aux sous-dossiers | `setfacl -R -m g:dev:rwx dossier/` |
| `-d` | **Par défaut** - Règles pour nouveaux éléments | `setfacl -d -m g:users:r-x dossier/` |
| `-k` | **Supprimer défaut** - Retirer les ACL par défaut | `setfacl -k dossier/` |

### 🎯 Types de règles ACL

#### **Format général :** `[type]:[nom]:[permissions]`

#### **Types disponibles :**

| Type | Signification | Exemple | Description |
|------|---------------|---------|-------------|
| `u:` | **User** (utilisateur) | `u:alice:rwx` | Permissions pour l'utilisateur alice |
| `g:` | **Group** (groupe) | `g:admin:r-x` | Permissions pour le groupe admin |
| `m:` | **Mask** (masque) | `m:rw-` | Permissions maximales autorisées |
| `o:` | **Other** (autres) | `o:r--` | Permissions pour les autres |

#### **Permissions :**
- **r** = read (lecture)
- **w** = write (écriture)  
- **x** = execute (exécution/navigation)
- **-** = pas de permission

### 📋 Exemples pratiques `setfacl`

#### **Permissions utilisateur :**
```bash
# Donner tous les droits à alice sur un fichier
setfacl -m u:alice:rwx document.txt

# Donner lecture seule à bob
setfacl -m u:bob:r-- document.txt

# Utilisateur sans nom = propriétaire actuel  
setfacl -m u::rw- document.txt
```

#### **Permissions groupe :**
```bash
# Groupe admin peut tout faire
setfacl -m g:admin:rwx projet/

# Groupe dev en lecture/écriture
setfacl -m g:dev:rw- fichier.txt

# Groupe users en lecture seule
setfacl -m g:users:r-- document.txt
```

#### **Permissions récursives :**
```bash
# Appliquer à tout le contenu existant
setfacl -R -m g:team:rwx projet/

# Pour dossiers ET fichiers
setfacl -R -m u:alice:r-x dossier/
```

#### **ACL par défaut (nouveaux fichiers) :**
```bash
# Les nouveaux fichiers dans ce dossier hériteront de ces permissions
setfacl -d -m g:dev:rw- projet/
setfacl -d -m g:users:r-- projet/

# Combiner défaut et immédiat
setfacl -m g:dev:rwx projet/          # Pour l'existant
setfacl -d -m g:dev:rwx projet/       # Pour les nouveaux
```

#### **Masque (limiter les permissions) :**
```bash
# Limiter les permissions maximales à rw-
setfacl -m m:rw- fichier.txt
```

### 🔍 `getfacl` - Consulter les ACL

#### **Syntaxe de base :**
```bash
getfacl [options] fichier/dossier
```

#### **Options principales :**

| Option | Description | Exemple |
|--------|-------------|---------|
| `-a` | Affichage par défaut | `getfacl fichier` |
| `-d` | Seulement les ACL par défaut | `getfacl -d dossier/` |
| `-R` | Récursif | `getfacl -R projet/` |
| `-t` | Format tabulaire | `getfacl -t fichier` |
| `-n` | Afficher les IDs numériques | `getfacl -n fichier` |

#### **Exemples `getfacl` :**
```bash
# Voir toutes les ACL d'un fichier
getfacl document.txt

# Voir seulement les ACL par défaut d'un dossier
getfacl -d projet/

# Voir les ACL de tous les fichiers dans un dossier
getfacl -R dossier/

# Format tabulaire (plus lisible)
getfacl -t fichier
```

### 📊 Lecture des résultats `getfacl`

#### **Exemple de sortie :**
```bash
getfacl document.txt
# file: document.txt
# owner: root
# group: admin
user::rw-                    # Propriétaire (root) : rw-
user:alice:rwx               # Utilisateur alice : rwx  
user:bob:r--                 # Utilisateur bob : r--
group::r--                   # Groupe propriétaire : r--
group:dev:rw-                # Groupe dev : rw-
mask::rwx                    # Masque : permissions max autorisées
other::r--                   # Autres : r--
```

#### **ACL par défaut :**
```bash
getfacl dossier/
# file: dossier/
# owner: root  
# group: admin
user::rwx
group::r-x
other::r-x
default:user::rwx            # Par défaut pour nouveaux fichiers
default:group::r-x           # Par défaut pour groupe
default:group:dev:rwx        # Par défaut pour groupe dev
default:mask::rwx            # Masque par défaut
default:other::r-x           # Par défaut pour autres
```

### 🗑️ Suppression d'ACL

#### **Supprimer une règle spécifique :**
```bash
# Supprimer les droits de l'utilisateur alice
setfacl -x u:alice fichier

# Supprimer les droits du groupe dev  
setfacl -x g:dev fichier
```

#### **Supprimer toutes les ACL :**
```bash
# Revenir aux permissions Unix classiques uniquement
setfacl -b fichier

# Supprimer seulement les ACL par défaut
setfacl -k dossier/
```

### 🔄 Copier/Déplacer des ACL

#### **Copier les ACL d'un fichier à l'autre :**
```bash
# Méthode 1 : via pipe
getfacl source.txt | setfacl --set-file=- destination.txt

# Méthode 2 : via fichier temporaire
getfacl source.txt > acl_backup.txt
setfacl --set-file=acl_backup.txt destination.txt
```

#### **Sauvegarder et restaurer des ACL :**
```bash
# Sauvegarde
getfacl -R projet/ > sauvegarde_acl.txt

# Restauration  
setfacl --restore=sauvegarde_acl.txt
```

### 🧪 Exemples pratiques complets

#### **Projet collaboratif :**
```bash
# Créer la structure
mkdir projet/
mkdir projet/{src,docs,tests}

# Permissions de base
setfacl -m g:dev:rwx projet/
setfacl -m g:test:r-x projet/  
setfacl -m g:doc:rw- projet/docs/

# Permissions par défaut
setfacl -d -m g:dev:rwx projet/
setfacl -d -m g:test:r-x projet/
setfacl -d -m g:doc:rw- projet/docs/

# Appliquer récursivement
setfacl -R -m g:dev:rwx projet/
setfacl -R -m g:test:r-x projet/
```

#### **Serveur web :**
```bash
# Dossier web accessible
setfacl -m u:www-data:r-x /var/www/html/
setfacl -m g:webdev:rwx /var/www/html/
setfacl -d -m u:www-data:r-x /var/www/html/
setfacl -d -m g:webdev:rw- /var/www/html/
```

### ⚠️ Points importants à retenir

#### **Le masque ACL :**
- Calculé automatiquement
- Limite les permissions effectives
- Peut être modifié manuellement avec `setfacl -m m:permissions`

#### **Compatibilité :**
- Tous les systèmes de fichiers ne supportent pas les ACL
- Vérifier avec `tune2fs -l /dev/device | grep acl`

#### **Sauvegarde :**
- Les outils de sauvegarde standards peuvent ne pas préserver les ACL
- Utiliser `tar --acls` ou `rsync -A`

Ces commandes vous donnent un contrôle très fin sur les permissions, bien plus flexible que les permissions Unix classiques !