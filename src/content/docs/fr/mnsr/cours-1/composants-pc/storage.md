---
title: "Storage (SSD/HDD)"
description: "Your digital hoarder's paradise - holds everything you'll never delete"
---

# HDD
Created : 📅1st September 2025 
Modified: 📅Sunday 21st September 2025 14:24 

![HDD](/src/assets/HDD.png)
# 💿 Hard Drive - Le Bibliothécaire Méticuleux

## 📝 Description

Le Hard Drive est le gardien méticuleux de tous les secrets et souvenirs de l'ordinateur. Organisé comme personne, il classe et range chaque fichier dans son système personnel complexe. Plus lent que la RAM mais infiniment plus fiable, il n'oublie jamais rien ! Il peut être un peu grognon quand on lui demande de retrouver quelque chose rapidement, mais il finit toujours par livrer l'information demandée. Fier de sa collection grandissante de données !

**Personnalité :** Méthodique, fiable, un peu lent, fier de sa collection **Phrase fétiche :** "Patience, je retrouve ça dans mes archives..."

## 🤝 Interactions avec les autres composants

### Avec le CPU 🧠

- **Relation :** Archiviste consciencieux mais parfois exaspérant
- **Interaction :** "CPU, tes données sont en sécurité chez moi, mais laisse-moi le temps de les chercher !"
- Source principale de programmes et données permanentes

### Avec la RAM 💾

- **Relation :** Collègue complémentaire avec une pointe de jalousie
- **Interaction :** "Tu es rapide RAM, mais moi je garde tout pour l'éternité !"
- Collabore pour la mémoire virtuelle et le cache

### Avec la Carte Mère 🏠

- **Relation :** Locataire discret et bien connecté
- **Interaction :** "Merci pour ces connexions SATA, maman !"
- Utilise les ports et l'alimentation fournis

### Avec le BIOS ⚡

- **Relation :** Dépositaire du trésor principal
- **Interaction :** "Sage BIOS, le système d'exploitation est ici, dans mon secteur de boot !"
- Héberge les fichiers de démarrage essentiels

## ⚙️ Utilité dans le groupe

- **Rôle principal :** Archiviste permanent et gardien de la mémoire
    
- **Responsabilités :**
    
    - Stocker de manière permanente tous les programmes et données
    - Conserver le système d'exploitation et les fichiers utilisateur
    - Gérer l'organisation et l'indexation des fichiers
    - Servir de mémoire de sauvegarde pour la RAM
    - Maintenir l'intégrité des données sur le long terme
- **Capacités spéciales :**
    
    - Mémoire permanente (résiste aux coupures de courant)
    - Énorme capacité de stockage
    - Organisation hiérarchique sophistiquée (dossiers/fichiers)
    - Systèmes de sauvegarde et récupération
    - Évolutivité (peut être remplacé ou complété)
- **Faiblesses :**
    
    - Vitesse d'accès plus lente que la RAM
    - Sensible aux chocs mécaniques (pour les HDD traditionnels)
    - Peut se fragmenter au fil du temps
    - Point de défaillance pour les données importantes
    - Durée de vie limitée (usure mécanique ou électronique)

## 💽 1. **Rôle du disque dur (HDD/SSD)**

Un **disque dur** (ou SSD) est un **périphérique de stockage permanent**. Contrairement à la RAM, il **conserve les données même sans alimentation**.

### 📂 À quoi sert-il ?

- Stocker le **système d’exploitation**
    
- Stocker les **données utilisateurs** (fichiers, documents, applis)
    
- Contenir le **bootloader** (dans certains cas, ex : GRUB ou bootmgr)
    
- Servir d’espace pour la **mémoire virtuelle** (swap/pagefile)
    

---

## 🧱 2. **Que sont les partitions ?**

Le disque est vu par le système comme une **grande suite de blocs binaires**. Les **partitions** sont des **zones logiques** qui divisent ce disque en morceaux indépendants.

> Une partition = un "compartiment" du disque qui peut contenir un système de fichiers (ext4, NTFS…) et être utilisé pour démarrer ou stocker des données.

### Exemples d’usages :

- Une partition pour le système (`/` ou `C:`)
    
- Une pour le swap
    
- Une pour `/home`
    
- Une pour la restauration d’usine
    
- Une pour **l’ESP** dans le cas UEFI (EFI System Partition)
    

---

## 🧭 3. **Types de partitionnement : MBR vs GPT (UEFI)**

||**MBR (Master Boot Record)**|**GPT (GUID Partition Table)**|
|---|---|---|
|Taille max disque|2 To|9.4 Zettaoctets (~infinie)|
|Partitions max|4 primaires (ou 3 + partitions logiques)|128 (standard)|
|Position de la table|Secteur 0 du disque (512 octets)|Début + copie de secours en fin de disque|
|Compatible UEFI ?|❌ Non (Legacy BIOS uniquement)|✅ Oui (standard UEFI)|
|Redondance|❌ Non|✅ Oui (table GPT copiée à la fin du disque)|
|Stockage du bootloader|MBR contient un mini bootloader|Bootloader = fichier `.efi` dans l’ESP|

---

### 🧮 Détail : MBR (Legacy BIOS)

- Le **secteur 0** (512 octets) contient :
    
    - Les **446 premiers octets** : code de boot (petit programme)
        
    - Une **table de partition** pour **4 partitions maximum**
        
    - Une **signature bootable** `0x55AA`
        
- Le BIOS lit ce secteur → lance le bootloader
    

📌 **Limites :**

- Pas de redondance (si le MBR est corrompu, disque inutilisable)
    
- Maximum 4 partitions primaires (ou une étendue contenant des logiques)
    
- Obsolète pour les disques > 2 To
    

---

### 🧬 Détail : GPT (UEFI)

- Utilise une **partition spéciale appelée ESP** (EFI System Partition)
    
    - Formatée en **FAT32**
        
    - Contient des fichiers `.efi` (bootloaders UEFI)
        
    - Exemple : `/EFI/Microsoft/Boot/bootmgfw.efi` ou `/EFI/Boot/bootx64.efi`
        
- Le reste du disque contient des partitions classiques (OS, swap, etc.)
    

📌 **Avantages :**

- Redondance intégrée (copie en fin de disque)
    
- Peut contenir **jusqu’à 128 partitions** sans bidouille
    
- Requis pour le **Secure Boot** et le boot en mode **UEFI pur**
    
- Supporte les disques énormes (4, 8, 16 To ou plus)
    

---

## 🗂️ 4. Exemple concret : disque dur avec Windows ou Linux (UEFI)

Voici une configuration typique :

|Partition|Type|Usage|
|---|---|---|
|ESP|FAT32|Fichiers de boot EFI (`.efi`)|
|Microsoft Reserved (MSR)|Système|Réservée pour Windows|
|C: (ou `/`)|NTFS/ext4|Partition principale de l’OS|
|Recovery|NTFS|Restauration système|

---

## 🧩 En résumé

|Élément|Rôle|
|---|---|
|Disque dur|Stocke OS, fichiers, bootloader, etc.|
|Partition|Découpe logique du disque|
|MBR|Format de partition + mini bootloader (Legacy BIOS)|
|GPT|Format moderne, partitions multiples, fichier de boot `.efi` (UEFI)|
|ESP|Partition spéciale contenant les fichiers de démarrage UEFI|

## BONUS: Fonctionnement détaillé du bootloader
### 🧩 1. **Qu’est-ce que le bootloader ?**

Le **bootloader** est un petit programme **stocké sur le disque de démarrage**, qui prépare et lance le **système d’exploitation**. Il peut être très simple (quelques centaines d’octets), ou plus complexe (menu de démarrage, support multi-OS, sécurité...).

Exemples :

- **GRUB** (Linux)
    
- **LILO** (ancien Linux)
    
- **Windows Boot Manager** (`bootmgr`)
    
- **Syslinux**, **rEFInd**, etc.
    

---

### 💽 2. **Où est stocké physiquement le bootloader ?**

### Sur un disque utilisant MBR (ancien système de partition)

- Le bootloader est divisé en **deux parties** :
    
    - **1ère partie (boot sector)** : Stockée dans le **MBR** (Master Boot Record), tout en haut du disque (secteur 0, 512 octets).
        
    - **2e partie** : Stockée plus loin sur le disque (souvent dans une partition `/boot`).
        

> Le BIOS charge **seulement les 512 premiers octets** (MBR) dans la RAM. Ce petit code contient juste assez d'instructions pour **trouver et charger la deuxième partie du bootloader**.

### Sur un disque utilisant GPT (plus moderne, UEFI)

- Le bootloader est un **fichier exécutable** (souvent `.efi`) stocké dans une partition spéciale :
    
    - 📂 **EFI System Partition (ESP)** : une petite partition FAT32 (~100-300 Mo).
        
    - Exemple : `/EFI/Boot/bootx64.efi` ou `/EFI/Microsoft/Boot/bootmgfw.efi`
        

> L’UEFI explore cette partition comme un petit système de fichiers, repère le fichier EFI, le charge en mémoire et le lance.

---

## ⚙️ 3. **Comment le bootloader est trouvé et lancé ?**

### Cas BIOS + MBR (Legacy Boot)

1. Le BIOS regarde le **secteur 0** du disque.
    
2. Il y trouve les **512 octets du MBR** :
    
    - Les **446 premiers** : code exécutable (mini bootloader)
        
    - Ensuite : table des partitions
        
    - Fin : signature `0x55AA` (indique qu’il est bootable)
        
3. Ce mini-code est copié dans la **RAM** à l’adresse `0x7C00`, et le CPU saute à cette adresse pour exécuter le code.
    
4. Ce code charge le **vrai bootloader** (ex : GRUB stage 2) depuis une partition.
    
5. GRUB affiche un menu, puis charge le **noyau Linux** ou Windows.
    

### Cas UEFI + GPT (Modern Boot)

1. Le **firmware UEFI** monte la partition **ESP** comme un mini système de fichiers FAT32.
    
2. Il cherche le fichier `.efi` défini dans les **niveaux de priorité de boot** (NVRAM).
    
3. Il charge ce fichier `.efi` en mémoire.
    
4. Le CPU saute à son point d’entrée, et exécute le **bootloader UEFI** (GRUB, bootmgfw.efi…).
    
5. Le bootloader charge le noyau OS.
    

---

## 🧠 4. **Que fait exactement le bootloader ?**

Voici ses rôles principaux :

### 🔍 a. Localiser le noyau du système d’exploitation

- Exemples :
    
    - Linux : fichier `vmlinuz`, `initrd`, etc.
        
    - Windows : fichier `winload.efi`
        

### 📦 b. Charger le noyau en RAM

- Le bootloader **lit les fichiers du noyau** sur le disque (utilise un mini système de fichiers intégré, ex : ext4, FAT, NTFS…).
    
- Il copie le noyau dans une adresse mémoire haute (typiquement `0x100000` ou plus).
    
- Il prépare la mémoire (zone réservée, arguments de démarrage, initrd…).
    

### 🏁 c. Transférer le contrôle

- Une fois le noyau prêt, le bootloader **saute à l’entrée du noyau**.
    
- Le CPU exécute alors le noyau directement.
    
---
