---
title: "CPU (Processor)"
description: "The brain of your PC - thinks faster than you, complains less"
---
# CPU
Created : 📅1st September 2025 
Modified: 📅Sunday 21st September 2025 14:23 

![CPU](/src/assets/CPU.png)
# 🧠 CPU - Le Cerveau Surmené

## 📝 Description

Le CPU est le leader incontesté de l'équipe PC, mais c'est aussi le plus stressé ! Toujours en train de calculer, analyser et prendre des décisions à la vitesse de l'éclair. Il a tendance à s'échauffer rapidement quand la pression monte et déteste qu'on lui demande trop de choses en même temps. Perfectionniste de nature, il refuse de laisser passer la moindre erreur.

**Personnalité :** Méticuleux, rapide, perfectionniste, mais facilement débordé **Phrase fétiche :** "Laissez-moi réfléchir... en 0,0001 seconde !"

## 🤝 Interactions avec les autres composants

### Avec la RAM 💾

- **Relation :** Meilleurs amis de travail
- **Interaction :** "RAM, j'ai besoin de ces données MAINTENANT !"
- Le CPU compte entièrement sur la RAM pour stocker ses calculs temporaires

### Avec la Carte Mère 🏠

- **Relation :** Fils respectueux envers sa mère
- **Interaction :** Communique via les pins et socket, toujours poli mais direct

### Avec le BIOS ⚡

- **Relation :** Élève discipliné
- **Interaction :** "Dites-moi quoi faire au démarrage, maître BIOS !"

### Avec le Hard Drive 💿

- **Relation :** Collègue impatient
- **Interaction :** "Plus vite ! J'attends tes données depuis une éternité !" (0,01 seconde)

## ⚙️ Utilité dans le groupe

- **Rôle principal :** Chef d'orchestre et calculateur en chef
    
- **Responsabilités :**
    
    - Exécuter toutes les instructions des programmes
    - Coordonner le travail des autres composants
    - Gérer les calculs mathématiques et logiques
    - Prendre les décisions critiques du système
- **Capacités spéciales :**
    
    - Super vitesse de calcul
    - Multitâche (avec quelques grognements)
    - Optimisation automatique des performances
- **Faiblesses :**
    
    - Surchauffe sous pression
    - Dépendant des autres composants
    - Consomme beaucoup d'énergie quand il est stressé


### 🧱 **Allumage électrique : le CPU se réveille**
    
- Le **CPU reçoit le signal RESET** → il entre en **mode réel** (16 bits, comme un 8086).
    
- Il commence automatiquement à exécuter le code situé à **l’adresse mémoire `0xFFFF0`** (tout en haut des 1 Mo).
    

📍 Cette adresse est **mappée vers la ROM du BIOS** (physiquement connectée à la carte mère).

---

⚠️ C’est **toujours le CPU** qui exécute tout le code, **instruction par instruction**.

---

### ⚙️  **Le CPU exécute le noyau du système d’exploitation**

- Le noyau prend totalement le contrôle.
    
- Le CPU passe en **mode protégé (32 bits)** puis souvent **long mode (64 bits)**.
    
- Le système d’exploitation démarre.
    


---

## 🧠 En résumé

- **Le CPU exécute tout**, depuis l’allumage.
    
- La **transition se fait via des instructions assembleur simples** (`JMP`, `CALL`) qui redirigent l'exécution.
    
- Les différentes puces ne font que se "passer la main"→ toujours exécuté par **le même CPU**, qui lit simplement **un nouveau programme en mémoire**.