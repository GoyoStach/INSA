---
title: Soluce Exercice Librairie 
description: "Exercice pour se familiariser avec les groupes et la création de user ainsi que les reponses"
---
# Exercice interactif : Système de gestion d'une Librairie

## 🎭 Mise en situation

Félicitations ! Vous venez d'être embauché(e) comme administrateur système d'une librairie numérique innovante. Votre mission : mettre en place un système de permissions sécurisé pour gérer les différents acteurs de la librairie.

**Votre équipe :**
- **Alice, Bob, Charlie** : lecteurs passionnés qui adorent découvrir de nouveaux livres
- **Victor Hugo, Jules Verne, George Sand** : auteurs prestigieux qui travaillent sur leurs manuscrits
- **Le bibliothécaire et le gestionnaire** : ils s'occupent de la gestion quotidienne

---

## Phase 1 : Préparation du système

### 🤔 Question de réflexion 1
*Avant de commencer, réfléchissez : Dans une vraie librairie, qui devrait avoir accès à quoi ? Listez 3 règles de sécurité importantes selon vous.*

**Votre réponse :**
```
1. ________________________________
2. ________________________________  
3. ________________________________
```

### Étape 1.1 : Création des groupes

```bash
# Créer les trois groupes principaux
sudo groupadd lecteurs
sudo groupadd auteurs  
sudo groupadd libraires

# Vérifier la création
getent group | grep -E "(lecteurs|auteurs|libraires)"
```

### ✅ Checkpoint 1
**Question :** Que fait la commande `getent group` ? Pourquoi utilise-t-on `grep` après ?

<details>
<summary>💡 Cliquez pour voir la réponse</summary>

`getent group` affiche tous les groupes du système. `grep -E` filtre uniquement les lignes contenant "lecteurs", "auteurs" ou "libraires" pour vérifier que nos groupes ont bien été créés.
</details>

### Étape 1.2 : Création des utilisateurs

#### 🎯 Mission : Créer les lecteurs
```bash
sudo useradd -m -s /bin/bash -G lecteurs alice
sudo useradd -m -s /bin/bash -G lecteurs bob  
sudo useradd -m -s /bin/bash -G lecteurs charlie

# Définir les mots de passe
sudo passwd alice
sudo passwd bob
sudo passwd charlie
```

### 🤔 Question pratique 2
*Regardez la commande `useradd`. Que signifient les options `-m`, `-s /bin/bash`, et `-G lecteurs` ?*

<details>
<summary>💡 Voir la réponse</summary>

- `-m` : crée le répertoire home de l'utilisateur
- `-s /bin/bash` : définit bash comme shell par défaut  
- `-G lecteurs` : ajoute l'utilisateur au groupe "lecteurs"
</details>

#### 🎯 Mission : Créer les auteurs (avec une particularité)
```bash
sudo useradd -m -s /bin/bash -G auteurs,lecteurs victor_hugo
sudo useradd -m -s /bin/bash -G auteurs,lecteurs jules_verne
sudo useradd -m -s /bin/bash -G auteurs,lecteurs george_sand

# Mots de passe
sudo passwd victor_hugo
sudo passwd jules_verne  
sudo passwd george_sand
```

### 🤔 Question de logique 3
*Pourquoi les auteurs sont-ils AUSSI dans le groupe "lecteurs" ? Donnez 2 raisons pratiques.*

**Votre réponse :**
```
Raison 1: ________________________________
Raison 2: ________________________________
```

<details>
<summary>💡 Voir la réponse suggérée</summary>

1. Les auteurs ont besoin de consulter le catalogue pour voir les autres livres
2. Ils doivent pouvoir lire les œuvres de leurs collègues pour s'inspirer ou collaborer
</details>

#### 🎯 Mission : Créer les libraires (super-utilisateurs)
```bash
sudo useradd -m -s /bin/bash -G libraires,auteurs,lecteurs bibliothecaire
sudo useradd -m -s /bin/bash -G libraires,auteurs,lecteurs gestionnaire

# Mots de passe
sudo passwd bibliothecaire
sudo passwd gestionnaire
```

### ✅ Checkpoint 2 - Test de vérification
**Exercice pratique :** Vérifiez que victor_hugo appartient bien à tous ses groupes :
```bash
groups victor_hugo
id victor_hugo
```

**Question :** Combien de groupes devez-vous voir ? Lesquels ?

### Étape 1.3 : Structure des dossiers

### 🏗️ Mini-défi
*Essayez de créer la structure suivante SANS regarder la solution. Utilisez la syntaxe avec les accolades `{}` :*

```
librairie/
├── catalogue/
│   ├── romans/
│   ├── poesie/
│   └── theatre/
├── auteurs/
│   ├── victor_hugo/
│   ├── jules_verne/
│   └── george_sand/
└── administration/
    ├── rapports/
    └── gestion/
```

**Votre tentative :**
```bash
# Écrivez votre commande ici :

```

<details>
<summary>💡 Solution</summary>

```bash
mkdir -p librairie/{catalogue,auteurs,administration}
mkdir -p librairie/catalogue/{romans,poesie,theatre}
mkdir -p librairie/auteurs/{victor_hugo,jules_verne,george_sand}
mkdir -p librairie/administration/{rapports,gestion}
```
</details>

---

## Phase 2 : Configuration des permissions de base

### 🤔 Question théorique 4
*Avant de configurer, réfléchissez : quelle devrait être la permission numérique (ex: 755) pour :*
- *Un dossier personnel d'auteur ?*
- *Le dossier administration ?*
- *Le catalogue public ?*

**Vos prédictions :**
```
Dossier auteur: _____ (justification: _________________)
Administration: _____ (justification: _________________)  
Catalogue: _____ (justification: ___________________)
```

### Étape 2.1 : Propriétés des dossiers principaux

```bash
# Dossier racine librairie
sudo chown root:libraires librairie
sudo chmod 755 librairie
```

### 🤔 Question d'analyse 5
*Analysez la ligne `sudo chown root:libraires librairie`. Qui devient propriétaire ? Qui devient groupe propriétaire ? Pourquoi ce choix ?*

### 📚 Continuons la configuration
```bash
# Catalogue (lecture publique)
sudo chown root:lecteurs librairie/catalogue
sudo chmod 755 librairie/catalogue

# Dossiers auteurs (spécifiques à chaque auteur)
sudo chown victor_hugo:auteurs librairie/auteurs/victor_hugo
sudo chown jules_verne:auteurs librairie/auteurs/jules_verne  
sudo chown george_sand:auteurs librairie/auteurs/george_sand
sudo chmod 750 librairie/auteurs/*
```

### ✅ Checkpoint 3 - Décryptage
**Exercice :** Décryptez `chmod 750` pour un dossier d'auteur :
- Propriétaire (l'auteur) peut : ________________
- Groupe (auteurs) peut : ____________________
- Autres peuvent : ___________________________

### 🎭 Simulation réaliste
*Imaginez : Victor Hugo veut créer un nouveau chapitre dans son dossier, tandis que Jules Verne souhaite juste consulter le travail de Victor. Avec les permissions actuelles (750), que peut faire chacun ?*

```bash
# Administration (libraires seulement)
sudo chown root:libraires librairie/administration
sudo chmod 770 librairie/administration
```

### 🤔 Question de sécurité 6
*Pourquoi 770 pour l'administration et non 755 ? Quel est le risque avec 755 ?*

---

## Phase 3 : Création du contenu

### 🎨 Activité créative
*Nous allons créer du contenu pour tester nos permissions. Vous allez jouer le rôle d'un libraire et remplir le catalogue !*

### Étape 3.1 : Livres dans le catalogue

```bash
# Romans - Créons Les Misérables
sudo tee librairie/catalogue/romans/les_miserables.txt << 'EOF'
Les Misérables - Victor Hugo
Tome I : Fantine

Tant qu'il existera, par le fait des lois et des mœurs, 
une damnation sociale créant artificiellement, en pleine civilisation, 
des enfers, et compliquant d'une fatalité humaine la destinée qui est divine...
EOF
```

### 🎯 Mini-mission 1
*À vous ! Créez le fichier "Vingt mille lieues sous les mers" dans le dossier romans. Inventez un petit extrait du chapitre 1.*

**Votre commande :**
```bash
# Écrivez votre commande tee ici :

```

### 🎭 Continuons avec le théâtre et la poésie
```bash
# Théâtre
sudo tee librairie/catalogue/theatre/hernani.txt << 'EOF'
Hernani - Victor Hugo
Acte I, Scène I

Serait-ce déjà lui ? C'est bien à l'escalier
Dérobé... Vite, ouvrons !
EOF

# Poésie
sudo tee librairie/catalogue/poesie/contemplations.txt << 'EOF'
Les Contemplations - Victor Hugo

Elle était déchaussée, elle était décoiffée,
Assise, les pieds nus, parmi les joncs penchants...
EOF
```

### Étape 3.2 : Manuscrits des auteurs

### 🎯 Mission d'infiltration
*Maintenant, incarnez Victor Hugo ! Connectez-vous en tant que lui et créez son manuscrit personnel.*

```bash
# Devenez Victor Hugo
su - victor_hugo

# Créez votre œuvre en cours
tee librairie/auteurs/victor_hugo/nouveau_roman.txt << 'EOF'
Nouveau projet de roman - Brouillon
Titre provisoire : "L'Homme qui rit"

Notes d'écriture :
- Personnage principal : Gwynplaine
- Époque : Angleterre, fin XVIIe siècle
EOF

# Revenez à votre session normale
exit
```

### 🤔 Question pratique 7
*Que remarquez-vous de différent entre la commande pour Victor Hugo et celles d'avant ? Pourquoi ne met-on plus `sudo` ?*

<details>
<summary>💡 Suggestion de réponse</summary>

- On s'est connecté en tant que Victor Hugo avec su - victor_hugo
- On opère maintenant depuis son compte, pas depuis le compte administrateur
- Victor Hugo a les droits nécessaires dans son propre dossier

</details>

### 🎯 Mission collaborative
*Créez maintenant les manuscrits des autres auteurs. Attention : chacun doit créer SON fichier dans SON dossier !*

<details>
<summary>💡 Commandes pour Jules Verne</summary>

```bash
sudo -u jules_verne tee librairie/auteurs/jules_verne/projet_scientifique.txt << 'EOF'
Nouveau projet - Roman d'aventures scientifiques
Titre : "De la Terre à la Lune"

Concept : Voyage spatial grâce à un canon géant
Lieu : Baltimore, États-Unis
EOF
```
</details>

---





## Phase 4 : Permissions avancées avec ACL

### 🎓 Cours express ACL
*Les permissions Unix classiques (rwx pour user/group/other) ne suffisent plus ! Nous avons 3 groupes différents qui ont besoin de permissions spécifiques sur les mêmes fichiers.*

### 🤔 Question de réflexion 8
*Avec les permissions Unix classiques seulement, quel problème rencontrerait-on pour donner :*
- *Lecture seule aux lecteurs sur le catalogue*
- *Lecture seule aux auteurs sur le catalogue*  
- *Accès total aux libraires sur le catalogue*

*Indice : pensez au fait qu'il n'y a qu'UN seul "groupe propriétaire" possible...*

### Étape 4.1 : Catalogue (lecture pour tous, gestion pour libraires)

```bash
# Tous les groupes peuvent lire le catalogue, mais seuls les libraires modifient
sudo setfacl -R -m g:lecteurs:r-x librairie/catalogue
sudo setfacl -R -m g:auteurs:r-x librairie/catalogue  
sudo setfacl -R -m g:libraires:rwx librairie/catalogue
```

### ✅ Checkpoint 4 - Décryptage ACL
**Exercice :** Que signifie `setfacl -R -m g:lecteurs:r-x` ?
- `setfacl` : ___________________________
- `-R` : ________________________________
- `-m` : ________________________________
- `g:lecteurs:r-x` : ____________________

<details>
<summary>Réponse</summary>
🔧 Décomposition complète

- setfacl :
Set File Access Control Lists = Définir/modifier les listes de contrôle d'accès (permissions étendues)
- R :
Récursif = Appliquer la commande à tous les sous-dossiers et fichiers contenus dans le répertoire cible
- m :
Modify = Modifier/ajouter une règle ACL sans supprimer les permissions existantes
- g:lecteurs:r-x :
    - g: = concerne un groupe (group)
    - lecteurs = nom du groupe cible
    - r-x = permissions accordées :
        - r = read (lecture)
        - = pas de write (écriture interdite)
        - x = execute (exécution/navigation pour dossiers)
</details>

### 🔍 Investigation
*Vérifiez l'effet de vos ACL :*
```bash
ls -la librairie/catalogue/romans/
# Que remarquez-vous après "les_miserables.txt" ? 

getfacl librairie/catalogue/romans/les_miserables.txt
# Combien de lignes group: voyez-vous ? 
```

### 🎯 Mission importante : Permissions par défaut
```bash
# Pour que les NOUVEAUX fichiers héritent automatiquement des bonnes permissions
sudo setfacl -d -m g:lecteurs:r-x librairie/catalogue
sudo setfacl -d -m g:auteurs:r-x librairie/catalogue
sudo setfacl -d -m g:libraires:rwx librairie/catalogue
```

### 🤔 Question pratique 9
*Quelle est la différence entre `setfacl -m` et `setfacl -d -m` ? Pourquoi a-t-on besoin des deux ?*

<details>
<summary>Réponse</summary>

🔧 Fonctionnement de chaque commande
- setfacl -m :
Applique les ACL aux fichiers et dossiers EXISTANTS uniquement
- setfacl -d -m :
Définit les ACL par DÉFAUT pour les NOUVEAUX fichiers/dossiers qui seront créés dans ce dossier
</details>

### Étape 4.2 : Dossiers auteurs (accès restreint et personnel)

```bash
# Victor Hugo : accès total à son dossier, lecture pour collègues auteurs, interdit aux lecteurs
sudo setfacl -R -m u:victor_hugo:rwx librairie/auteurs/victor_hugo
sudo setfacl -R -m g:libraires:rwx librairie/auteurs/victor_hugo
sudo setfacl -R -m g:auteurs:r-x librairie/auteurs/victor_hugo
sudo setfacl -R -m g:lecteurs:--- librairie/auteurs/victor_hugo
```

### 🎭 Scénario de test
*Imaginez cette situation : Alice (lectrice) tente d'espionner le manuscrit de Victor Hugo, tandis que Jules Verne (auteur) veut juste s'inspirer de son travail. Que va-t-il se passer ?*

**Prédiction pour Alice :** _________________________
**Prédiction pour Jules Verne :** ___________________

### 🎯 Mission répétitive intelligente
*Au lieu de réécrire 3 fois les mêmes commandes, utilisez une boucle !*

```bash
# Boucle pour tous les auteurs
for auteur in jules_verne george_sand; do
    sudo setfacl -R -m u:$auteur:rwx librairie/auteurs/$auteur
    sudo setfacl -R -m g:libraires:rwx librairie/auteurs/$auteur
    sudo setfacl -R -m g:auteurs:r-x librairie/auteurs/$auteur
    sudo setfacl -R -m g:lecteurs:--- librairie/auteurs/$auteur
done

# Bloquer l'accès au dossier parent pour les lecteurs
sudo setfacl -m g:lecteurs:--- librairie/auteurs
```

### Étape 4.3 : Administration (zone ultra-secrète)

```bash
sudo setfacl -R -m g:libraires:rwx librairie/administration
sudo setfacl -R -m g:auteurs:--- librairie/administration
sudo setfacl -R -m g:lecteurs:--- librairie/administration
```

---

## Phase 5 : Tests et validation (La phase fun !)

### 🎮 Jeu de rôle : Testez vos permissions !

### Test 1 : Alice la lectrice curieuse
```bash
# Devenez Alice
su - alice

# Mission d'Alice : Explorer la librairie
echo "=== Je suis Alice, une lectrice passionnée ==="
cd librairie/catalogue                     # Essai 1
echo "✅ J'accède au catalogue !"

ls romans/                                # Essai 2  
echo "✅ Je vois la liste des romans !"

cat romans/les_miserables.txt             # Essai 3
echo "✅ Je peux lire Les Misérables !"

# Maintenant Alice devient curieuse...
echo "=== Voyons ce que font les auteurs... ==="
cd ../auteurs                             # Essai 4 - Que va-t-il se passer ?
```

### 🤔 Question prédictive 10
*Avant d'exécuter le test d'Alice, que pensez-vous qu'il va se passer à l'étape "Essai 4" ? Pourquoi ?*

**Votre prédiction :** ______________________________

### 🎭 Continuons le test d'Alice
```bash
# Alice essaie de tricher...
echo "test" > ../catalogue/romans/alice_etait_la.txt  # Essai 5
ls ../administration                      # Essai 6

# Retour au mode normal
exit
```

### Test 2 : Victor Hugo, l'auteur créatif

```bash
# Devenez Victor Hugo
su - victor_hugo

echo "=== Je suis Victor Hugo, auteur prestigieux ==="
cd librairie/auteurs/victor_hugo          # Navigation dans son royaume
echo "✅ J'accède à mon atelier d'écriture !"

echo "Nouveau chapitre génial !" >> nouveau_roman.txt  # Écriture créative
echo "✅ J'enrichis mon œuvre !"

# Victor veut voir le travail de ses collègues
cd ../jules_verne                         # Visite chez un collègue
cat projet_scientifique.txt               # Lecture du travail d'autrui
echo "✅ Je m'inspire du travail de Jules !"

# Victor essaie d'être vilain...  
echo "Victor était là" > sabotage.txt     # Tentative de sabotage
```

### 🤔 Question d'observation 11
*Qu'est-ce qui devrait empêcher Victor de créer le fichier "sabotage.txt" chez Jules Verne ?*

**Votre analyse :**
```
Mécanisme de protection : _______________________
Permission manquante : __________________________
Principe de sécurité appliqué : __________________
```

<details>
<summary>💡 Analyse de sécurité</summary>

**Mécanisme de protection :** ACL sur le dossier `/librairie/auteurs/jules_verne`

**Permission manquante :** **Permission d'écriture (w)** sur le dossier de Jules Verne
- Victor a `g:auteurs:r-x` (lecture + navigation) mais PAS `w` (écriture)
- Pour créer un fichier, il faut la permission `w` sur le dossier parent

**Principe de sécurité appliqué :** 
- **Propriété exclusive :** Chaque auteur contrôle totalement son espace de travail
- **Collaboration en lecture seule :** Les auteurs peuvent s'inspirer mutuellement sans risque de sabotage
- **Séparation des responsabilités :** Consultation ≠ Modification

**Résultat :** Message "Permission denied" quand Victor essaie de créer sabotage.txt
</details>

### Test 3 : Le bibliothécaire tout-puissant

```bash
# Devenez le bibliothécaire
su - bibliothecaire

echo "=== Je suis le bibliothécaire, maître de la librairie ==="
cd librairie/administration              
echo "Rapport mensuel - Janvier 2025" > rapports/janvier.txt
echo "✅ Je gère l'administration !"

echo "Nouveau livre ajouté au catalogue" > catalogue/romans/acquisition.txt
echo "✅ J'enrichis le catalogue !"

cd auteurs/victor_hugo
echo "Note de l'éditeur" >> nouveau_roman.txt
echo "✅ Je supervise le travail des auteurs !"

exit
```
---

## 🚀 Extensions pour aller plus loin

### 🌟 Niveau Expert : Intégrations avancées
- Ajouter des **quotas de stockage** par auteur avec `setquota`
- Configurer des **logs d'audit** avec `auditd` pour tracer les accès
- Intégrer avec un serveur web Apache pour publier le catalogue
- Mettre en place des **sauvegardes automatiques** avec conservation des ACL

### 🔒 Niveau Sécurité : Durcissement
- Implémenter **SELinux** ou **AppArmor** pour un contrôle d'accès obligatoire  
- Configurer des **sessions temporaires** pour les comptes auteurs
- Ajouter une **authentification à deux facteurs**
- Mettre en place un **chiffrement** des manuscrits sensibles

### 📊 Niveau Architecture : Évolutivité
- Concevoir une structure pour **1000+ auteurs** avec sous-groupes par genre
- Intégrer avec un **annuaire LDAP** pour la gestion centralisée
- Automatiser avec **Ansible** ou **Puppet** pour le déploiement multi-serveurs
- Monitoring avec **Nagios** pour surveiller les permissions

**Bravo ! Vous maîtrisez maintenant les permissions Linux comme un vrai administrateur système ! 🎉**