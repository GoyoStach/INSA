
---
title: Lancement d'un PC
description: "Séquence de démarrage d'un PC : Du BIOS à l'OS"
---

# Séquence de démarrage d'un PC : Du BIOS à l'OS

## Vue d'ensemble

Le démarrage d'un PC suit une séquence bien orchestrée d'instructions et de programmes qui se passent le relais pour transformer une machine inerte en un environnement informatique complet.

## Processus traditionnel BIOS/MBR

### Phase 1 : Initialisation matérielle (BIOS)

Au démarrage, le processeur exécute sa première instruction à une adresse fixe en ROM où se trouve le **BIOS** (Basic Input/Output System). Le BIOS effectue le **POST** (Power-On Self Test) pour vérifier l'intégrité du matériel : RAM, processeur, cartes d'extension. Il initialise ensuite les contrôleurs essentiels et configure les paramètres matériels de base.

### Phase 2 : Recherche du périphérique de démarrage

Le BIOS consulte sa configuration pour déterminer l'ordre de démarrage (disque dur, CD-ROM, USB, réseau). Il lit le **MBR** (Master Boot Record) situé dans les 512 premiers octets du périphérique de démarrage choisi.

### Structure du MBR (512 octets)

Le MBR complet fait 512 octets, structuré ainsi :

- **446 octets** : code de démarrage (bootcode)
- **64 octets** : table des partitions (4 entrées de 16 octets chacune)
- **2 octets** : signature de fin (0x55AA)

#### Table des partitions (64 octets)

Chaque entrée de partition (16 octets) contient :
- **Octet 0** : Flag de boot (0x80 = partition active, 0x00 = inactive)
- **Octets 1-3** : Adresse CHS de début (format obsolète)
- **Octet 4** : Type de partition (0x83 = Linux, 0x07 = NTFS, etc.)
- **Octets 5-7** : Adresse CHS de fin
- **Octets 8-11** : LBA de début (32 bits)
- **Octets 12-15** : Taille en secteurs (32 bits)

#### Signature de fin (2 octets)

Les 2 derniers octets contiennent **0x55AA** (little-endian), indiquant au BIOS que le secteur est un MBR valide.

### Phase 3 : Chargement du bootloader

Le code du MBR, limité à 446 octets, charge un **bootloader** plus sophistiqué situé ailleurs sur le disque. Ce bootloader présente souvent un menu permettant de choisir entre plusieurs systèmes d'exploitation.

## Processus moderne UEFI/GPT

### Différences principales avec BIOS/MBR

**UEFI** (Unified Extensible Firmware Interface) remplace le BIOS traditionnel et utilise **GPT** (GUID Partition Table) au lieu du MBR.

### Structure GPT

- **Secteur 0** : MBR protecteur (compatibilité)
- **Secteur 1** : En-tête GPT principal
- **Secteurs 2-33** : Table des partitions (128 entrées de 128 octets)
- **Fin du disque** : Sauvegarde de l'en-tête et table GPT

### Partition système EFI (ESP)

Au lieu du code dans le MBR, UEFI utilise une **partition FAT32 spéciale** (ESP) qui contient :
- `/EFI/BOOT/BOOTX64.EFI` (bootloader par défaut)
- `/EFI/Microsoft/Boot/bootmgfw.efi` (Windows)
- `/EFI/ubuntu/grubx64.efi` (Linux)
- Variables UEFI stockées en NVRAM

### Processus de démarrage UEFI

1. **Firmware UEFI** s'initialise
2. **Lecture GPT** au lieu du MBR
3. **Montage ESP** comme système de fichiers
4. **Lecture NVRAM** pour connaître l'ordre de boot
5. **Exécution directe** du fichier .efi choisi
6. Le bootloader .efi charge l'OS

### Avantages d'UEFI/GPT

- **Disques > 2TB** (adressage 64 bits)
- **128 partitions** au lieu de 4 primaires
- **Secure Boot** (vérification cryptographique)
- **Démarrage réseau** intégré
- **Interface graphique** pendant le boot
- **Pilotes UEFI** pour accès matériel avancé

## Phases communes : Chargement de l'OS

### Phase 4 : Chargement du noyau/kernel

Le bootloader lit la configuration, localise les fichiers du noyau du système d'exploitation sur le disque, et les charge en mémoire.

**Fichiers du kernel :**
- **Linux** : `vmlinuz` (kernel compressé), `initramfs`
- **Windows** : `ntoskrnl.exe` (kernel NT), `hal.dll`

### Phase 5 : Initialisation du système d'exploitation

Le kernel/noyau prend le contrôle et effectue :
- Initialisation des structures de données internes
- Activation de la gestion mémoire virtuelle
- Détection et configuration matérielle
- Chargement des pilotes nécessaires
- Montage du système de fichiers racine
- Lancement du premier processus utilisateur (init/systemd)

### Rôles du kernel

- **Gestion mémoire** : allocation, pagination, mémoire virtuelle
- **Ordonnancement** : gestion des processus et threads
- **Pilotes matériels** : communication avec périphériques
- **Système de fichiers** : accès disques, permissions
- **Appels système** : interface pour les programmes utilisateur
- **Sécurité** : contrôle d'accès, isolation des processus

### Phase 6 : Démarrage des services

Le système d'init lit ses fichiers de configuration et lance séquentiellement les services système : gestionnaire de réseau, serveurs, interface graphique. Chaque service peut dépendre d'autres services, créant un graphe de dépendances.

## Conclusion

Cette séquence transforme progressivement une machine inerte en un environnement informatique complet, chaque étape préparant et lançant la suivante dans une chaîne de confiance et de responsabilités bien définie. Le passage du BIOS/MBR traditionnel vers UEFI/GPT représente une modernisation importante qui élimine les contraintes archaïques tout en apportant flexibilité et sécurité.