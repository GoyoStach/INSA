---
title: "Guide des Dossiers Principaux de Linux"
description: "Guide complet de l'architecture du système de fichiers Linux avec une description détaillée de chaque dossier principal et de son utilité."
---

# 📁 Guide des Dossiers Principaux de Linux

Ce guide présente les dossiers principaux du système de fichiers Linux et leur utilité détaillée selon le standard FHS (Filesystem Hierarchy Standard).

## 🏠 Dossiers racine essentiels

### 🔧 `/bin`
**Binaires essentiels du système**
Contient les commandes binaires essentielles nécessaires au système, même en mode mono-utilisateur. On y trouve des commandes comme `ls`, `cp`, `mv`, `bash`, `cat`. Ces programmes sont indispensables au fonctionnement de base du système.

### 🚀 `/boot`
**Fichiers de démarrage**
Stocke tous les fichiers nécessaires au démarrage du système : le noyau Linux (`vmlinuz`), l'image du disque RAM initial (`initrd` ou `initramfs`), les fichiers de configuration du chargeur de démarrage (GRUB), et parfois le System.map.

### 🖥️ `/dev`
**Fichiers de périphériques**
Contient les fichiers de périphériques qui représentent les composants matériels sous forme de fichiers spéciaux. Par exemple `/dev/sda` pour le premier disque dur, `/dev/tty` pour les terminaux, `/dev/null` pour le périphérique null, `/dev/random` pour la génération aléatoire.

### ⚙️ `/etc`
**Configuration système**
Répertoire de configuration système contenant tous les fichiers de configuration globaux du système et des services. On y trouve `passwd`, `fstab`, `hosts`, `crontab`, et les configurations des services dans des sous-dossiers comme `/etc/apache2/` ou `/etc/ssh/`.

### 🏡 `/home`
**Dossiers personnels des utilisateurs**
Dossiers personnels des utilisateurs standard. Chaque utilisateur possède un sous-dossier ici (par exemple `/home/jean/`) contenant ses fichiers personnels, configurations d'applications, documents, et paramètres d'environnement.

### 📚 `/lib` et `/lib64`
**Bibliothèques partagées**
Bibliothèques partagées essentielles nécessaires aux programmes de `/bin` et `/sbin`. `/lib64` contient spécifiquement les bibliothèques 64 bits sur les systèmes multi-architectures.

### 💿 `/media`
**Supports amovibles**
Point de montage temporaire pour les supports amovibles détectés automatiquement (clés USB, CD-ROM, disques externes). Le système y crée automatiquement des sous-dossiers lors de la connexion de périphériques.

### 🔗 `/mnt`
**Montage temporaire**
Point de montage temporaire traditionnel pour monter manuellement des systèmes de fichiers. Les administrateurs l'utilisent souvent pour des montages temporaires de partitions ou de périphériques réseau.

### 📦 `/opt`
**Logiciels optionnels**
Destiné aux packages logiciels optionnels installés par des tiers ou des applications commerciales. Chaque application y crée généralement son propre sous-dossier auto-contenu (par exemple `/opt/google/chrome/`).

### 🔍 `/proc`
**Système de fichiers virtuel**
Système de fichiers virtuel qui expose les informations du noyau et des processus sous forme de fichiers. `/proc/cpuinfo` donne des infos sur le processeur, `/proc/meminfo` sur la mémoire, `/proc/PID/` contient les détails d'un processus spécifique.

### 👑 `/root`
**Dossier personnel de root**
Répertoire personnel de l'utilisateur root (administrateur système). Séparé de `/home` pour des raisons de sécurité et pour être disponible même si `/home` n'est pas monté.

### ⚡ `/run`
**Données d'exécution**
Système de fichiers temporaire en RAM contenant les données variables d'exécution des services système (PID files, sockets, verrous). Remplace les anciens `/var/run` et `/var/lock`.

### 🛠️ `/sbin`
**Binaires système d'administration**
Binaires système essentiels destinés à l'administration système, utilisables principalement par root. On y trouve des commandes comme `fdisk`, `iptables`, `mount`, `init`.

### 🌐 `/srv`
**Données serveur**
Données servies par le système pour des services spécifiques (sites web, FTP, etc.). Par exemple, `/srv/www/` peut contenir les fichiers d'un serveur web, `/srv/ftp/` ceux d'un serveur FTP.

### 🔌 `/sys`
**Interface matériel**
Système de fichiers virtuel exposant les informations sur les périphériques, pilotes et fonctionnalités du noyau. Permet l'interaction avec le matériel et la configuration des paramètres du noyau en temps réel.

### 🗑️ `/tmp`
**Fichiers temporaires**
Fichiers temporaires accessibles à tous les utilisateurs. Le contenu est généralement effacé au redémarrage. Certaines distributions utilisent un système de fichiers temporaire en RAM pour améliorer les performances.

### 👤 `/usr`
**Programmes et données utilisateur**
Contient la majorité des programmes et données utilisateur en lecture seule. Se divise en sous-dossiers importants :

- **📱 `/usr/bin`** - Programmes utilisateur
- **📚 `/usr/lib`** - Bibliothèques
- **📄 `/usr/share`** - Données partagées (documentation, icônes, etc.)
- **🏠 `/usr/local`** - Programmes installés localement

### 📊 `/var`
**Données variables**
Données variables du système qui changent pendant le fonctionnement. Structure importante :

- **📋 `/var/log/`** - Journaux système et applications
- **💾 `/var/lib/`** - Bases de données et états des applications
- **📬 `/var/spool/`** - Files d'attente (impression, mail)
- **🚀 `/var/cache/`** - Cache des applications
- **⏰ `/var/tmp/`** - Fichiers temporaires persistants

## 🏗️ Architecture et Standards

### 📋 Points Clés
- **Structure standardisée** : Suit le FHS (Filesystem Hierarchy Standard)
- **Cohérence** : Architecture identique sur toutes les distributions Linux
- **Séparation logique** : Distinction claire entre système, utilisateur et données
- **Sécurité** : Isolation des composants critiques
- **Maintenance** : Organisation facilitant l'administration système

### 💡 Systèmes de Fichiers Virtuels
Certains dossiers ne contiennent pas de vrais fichiers mais exposent des interfaces système :
- **`/proc`** 🔍 - Informations sur les processus et le noyau
- **`/sys`** 🔌 - Interface avec le matériel et les pilotes
- **`/run`** ⚡ - Données d'exécution en mémoire vive

### 🎯 Bonnes Pratiques
- Respecter la hiérarchie standard pour la compatibilité
- Ne pas modifier directement les dossiers système critiques
- Utiliser `/opt` pour les applications tierces
- Séparer les données utilisateur (/home) du système
- Surveiller l'espace disque dans `/var` et `/tmp`

---

> **💡 Note :** Cette structure hiérarchique standardisée assure la cohérence entre les différentes distributions Linux et facilite l'administration système. La compréhension de cette organisation est essentielle pour tout administrateur système Linux.