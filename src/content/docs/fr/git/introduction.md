---
title: Introduction à Git
description: Découverte des concepts de base de Git
---

## Partie 1 : L'Histoire et les Concepts de Git 🚀

### L'Épopée de Git : De la Catastrophe au Génie

**"Il était une fois... en 2005"**

Imaginez Linus Torvalds (oui, le papa de Linux) en train de gérer le code source de Linux avec un système propriétaire appelé BitKeeper. Puis BOUM ! 💥 Conflit avec la société qui développe BitKeeper, et du jour au lendemain, plus d'accès gratuit !

Linus, plutôt que de pleurer dans son café ☕, se dit : "Allez, je vais créer mon propre système de gestion de versions... en quelques semaines !" Et c'est exactement ce qu'il fait. Git naît en avril 2005, avec l'objectif fou de gérer le développement du noyau Linux.

**Le nom "Git" ?** 
En argot britannique, ça signifie "idiot" ou "crétin". Linus, avec son humour légendaire, a dit : "Je suis un sale égoïste, alors j'appelle tous mes projets d'après moi. D'abord Linux, maintenant Git." Charmant, non ? 😄

### Pourquoi Git a Révolutionné le Monde du Code

**Avant Git : L'Âge Sombre**
- Système centralisé (un seul serveur = point de défaillance unique)
- Conflits de versions ? Bonne chance ! 
- Travail hors ligne ? Impossible !
- Branches ? Compliqué et lent

**Avec Git : L'Illumination**
- **Distribué** : Chaque développeur a l'historique COMPLET
- **Rapide** : Créé pour gérer Linux (des millions de lignes de code)
- **Branches légères** : Créer une branche = 0,1 seconde
- **Intégrité** : Chaque commit a son empreinte cryptographique

### Les Super-Pouvoirs de Git

**1. La Machine à Remonter le Temps** ⏰
Git garde TOUT. Chaque modification, chaque version, chaque expérience ratée. Vous pouvez littéralement revenir à n'importe quel moment de l'histoire de votre projet.

**2. L'Univers Parallèle (les Branches)** 🌌
Vous voulez tester une fonctionnalité folle sans risquer de tout casser ? Créez une branche ! C'est comme créer un univers parallèle où vous pouvez expérimenter. Si ça marche, vous fusionnez. Sinon, vous supprimez et personne n'en saura rien !

**3. Le Travail d'Équipe Sans Drama** 👥
Plusieurs personnes sur le même code ? Pas de panique ! Git gère les conflits comme un chef d'orchestre dirige sa symphonie.

### Comment Git Pense (ou : "Git a une Personnalité Unique")

**Git ne stocke pas les différences, il stocke des instantanés**
Contrairement à d'autres systèmes qui stockent "j'ai modifié la ligne 42", Git dit : "Voici à quoi ressemble TOUT le projet à ce moment-là". C'est comme prendre une photo complète à chaque commit.

**Les Trois États de Git** (le Triangle des Bermudes du Code) :
1. **Working Directory** : Votre bac à sable, là où vous modifiez
2. **Staging Area** : La zone de préparation, vous choisissez quoi commiter
3. **Repository** : L'historique officiel et sacré

**Git est paresseux (et c'est génial !)**
Il ne fait que le minimum nécessaire. Deux fichiers identiques ? Il ne les stocke qu'une fois. Un déplacement de fichier ? Il le détecte automatiquement.

### Pourquoi Tous les Pros Utilisent Git Aujourd'hui

- **GitHub, GitLab, Bitbucket** : Les réseaux sociaux pour développeurs
- **Open Source** : 99% des projets open source utilisent Git
- **Industrie** : De la startup à Google, tout le monde s'y est mis
- **Portfolio** : Votre historique Git raconte votre histoire de développeur

---

## Partie 2 : Exercice Interactif - "Git Quest" 🎮

### Mission : Sauver le Projet "CaféCode" ☕

**Contexte** : Vous travaillez sur une application de gestion de café. Le projet est dans le chaos, et vous devez utiliser Git pour remettre de l'ordre !

### Étape 1 : Initialisation du Projet
```bash
# Mission : Créer votre première base Git
# Qu'est-ce que cette commande fait ?
git init

# Vérifiez l'état de votre repo
git status
```
**Question** : Que voyez-vous ? Que signifie "On branch main" ?

### Étape 2 : Votre Premier Commit
```bash
# Créez le fichier menu.txt avec quelques cafés
echo "Espresso - 2€
Latte - 3€
Cappuccino - 3.5€" > menu.txt

# Ajoutez le fichier à la staging area
git add menu.txt

# Votre premier commit historique !
git commit -m "Ajout du menu initial"
```
**Défi** : Modifiez le menu.txt, ajoutez un "Americano - 2.5€", puis commitez cette modification.

### Étape 3 : L'Art de la Branche
```bash
# Créez une branche pour une nouvelle fonctionnalité
git branch nouvelle-boissons

# Basculez sur cette branche
git checkout nouvelle-boissons
# (ou en une seule commande : git checkout -b nouvelle-boissons)

# Où êtes-vous maintenant ?
git branch
```
**Mission** : Ajoutez des thés à votre menu dans cette branche !

### Étape 4 : Le Grand Merge
```bash
# Retournez sur main
git checkout main

# Fusionnez votre branche
git merge nouvelle-boissons

# Admirez votre travail
git log --oneline --graph
```

### Étape 5 : Oups ! Le Retour en Arrière
```bash
# Simulons une catastrophe : supprimez tout votre menu
echo "" > menu.txt

# Panique ! Mais Git est là...
git checkout HEAD -- menu.txt
```
**Question** : Que s'est-il passé ? Votre menu est-il revenu ?

### Étape 6 : L'Enquête Historique
```bash
# Qui a fait quoi et quand ?
git log

# Version plus compacte
git log --oneline

# Voir les modifications
git show [hash-du-commit]
```

### DÉFI FINAL : Le Scénario du Chaos 🔥

Voici la situation : votre collègue a travaillé sur les prix (branch "nouveaux-prix") et vous sur les descriptions (branch "descriptions"). Vous devez :

1. Créer et basculer sur la branche "nouveaux-prix"
2. Modifier les prix dans menu.txt
3. Commiter
4. Créer la branche "descriptions" depuis main
5. Ajouter des descriptions aux boissons
6. Commiter
7. Fusionner les deux branches dans main
8. Résoudre les conflits s'il y en a !

**Questions de débriefing :**
- Qu'avez-vous appris sur les branches ?
- Pourquoi la staging area est-elle utile ?
- Comment Git gère-t-il les conflits ?
- Quelle est la différence entre `git add` et `git commit` ?

### Commandes de Survie à Retenir 🆘
- `git status` : "Dis-moi où j'en suis !"
- `git add .` : "Prépare tout pour le commit"
- `git commit -m "message"` : "Sauvegarde officielle"
- `git log --oneline` : "Montre-moi l'histoire"
- `git checkout -b nouvelle-branche` : "Créer et basculer"
- `git merge autre-branche` : "Fusionner les univers"

