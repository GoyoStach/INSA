---
title: "BIOS/UEFI"
description: "The PC's first impression - wakes up before coffee and judges your hardware choices"
---


# BIOS
Created : 📅1st September 2025 
Modified: 📅Sunday 21st September 2025 14:26 

![BIOS.png](/src/assets/BIOS.png)
# ⚡ BIOS - Le Sage Ancestral

## 📝 Description

Le BIOS est le doyen vénérable du groupe, gardien des secrets les plus profonds de l'ordinateur. Toujours le premier levé, il connaît chaque composant par cœur et sait exactement comment les faire fonctionner ensemble. Sage mais parfois têtu, il n'aime pas qu'on change ses habitudes sans le prévenir. Il parle peu mais chaque mot compte.

**Personnalité :** Sage, traditionaliste, protecteur, méthodique **Phrase fétiche :** "Depuis le premier jour, je veille sur vous tous..."

## 🤝 Interactions avec les autres composants

### Avec le CPU 🧠

- **Relation :** Mentor expérimenté
- **Interaction :** "Jeune CPU, voici tes instructions de démarrage"
- Guide le CPU dans ses premiers pas à chaque allumage

### Avec la RAM 💾

- **Relation :** Testeur bienveillant
- **Interaction :** "RAM, montre-moi que tu fonctionnes correctement"
- Vérifie l'état de la RAM au démarrage

### Avec la Carte Mère 🏠

- **Relation :** Colocataire de longue date
- **Interaction :** Fusion parfaite, ils ne font qu'un depuis toujours

### Avec le Hard Drive 💿

- **Relation :** Éclaireur patient
- **Interaction :** "Dis-moi où se trouve le système d'exploitation"
- Le guide pour trouver les fichiers de démarrage

## ⚙️ Utilité dans le groupe

- **Rôle principal :** Gardien du temple et initialisateur
    
- **Responsabilités :**
    
    - Réveiller tous les composants au démarrage
    - Vérifier que tout fonctionne correctement (POST)
    - Configurer les paramètres de base du système
    - Localiser et lancer le système d'exploitation
    - Garder les paramètres système en mémoire
- **Capacités spéciales :**
    
    - Mémoire permanente (même sans électricité)
    - Diagnostic automatique des pannes
    - Configuration hardware de base
    - Interface avec l'utilisateur (écrans de setup)
- **Faiblesses :**
    
    - Résistant au changement
    - Interface parfois austère
    - Peut être mystérieux pour les novices
    - Limité dans ses capacités modernes

## 🧠 1. **Le rôle du BIOS (ou UEFI)**

Le **BIOS** (Basic Input/Output System) ou **UEFI** (Unified Extensible Firmware Interface) est stocké dans une **puce ROM** ou **flash** sur la carte mère. Le BIOS n’est pas un processeur : c’est un **programme dans une puce**.

### 🎯 Objectifs principaux du BIOS :

#### 1.1 Initialiser le matériel

- Active le CPU, configure les horloges, initialise la RAM, configure les ports (USB, SATA…).
    
- Configure le **chipset** qui interconnecte CPU ↔ RAM ↔ périphériques.
    

#### 1.2 Effectuer un POST (Power-On Self Test)

- Vérifie que les composants minimums sont présents et fonctionnels :
    
    - RAM (écriture/lecture simple)
        
    - CPU (réponse à une instruction)
        
    - GPU (capacité à afficher un écran)
        
    - Clavier (présence/connexion)
        
- Si un problème est détecté, il émet des **bips** selon un code d’erreur.
    

#### 1.3 Offrir une interface de configuration (UEFI Setup)

- Permet à l'utilisateur de configurer :
    
    - L’ordre de boot
        
    - Le mode de démarrage (Legacy/UEFI)
        
    - L’activation de certaines fonctionnalités (virtualisation, secure boot, overclocking…)
        

#### 1.4 Localiser un périphérique de démarrage

- Le BIOS lit les **secteurs de boot** (MBR ou GPT) de chaque disque dans l’ordre défini.
    
- Si un secteur valide est trouvé, il charge le **bootloader** en mémoire RAM.