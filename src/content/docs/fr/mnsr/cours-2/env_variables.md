
---
title: Env variables
description: "Interet et utilisation des variables d'environnement"
---

Les variables d'environnement sont des valeurs nommées stockées par le système d'exploitation et accessibles aux programmes en cours d'exécution. Elles constituent un mécanisme fondamental pour configurer le comportement des applications et du système.

## Intérêts et utilités principales

**Configuration centralisée** : Les variables d'environnement permettent de centraliser la configuration sans modifier le code des applications. Un programme peut adapter son comportement selon ces valeurs (langue, répertoires de travail, options de débogage).

**Portabilité** : Elles facilitent le déploiement d'applications sur différents environnements (développement, test, production) en changeant simplement les valeurs des variables plutôt que le code source.

**Sécurité** : Les informations sensibles comme les clés d'API ou mots de passe peuvent être stockées dans des variables d'environnement plutôt que directement dans le code, réduisant les risques d'exposition.

**Communication inter-processus** : Les processus enfants héritent des variables de leur processus parent, permettant la transmission d'informations de configuration.

**Personnalisation utilisateur** : Chaque utilisateur peut avoir ses propres variables d'environnement pour personnaliser son expérience système.

## Différences entre Unix/Linux et Windows

### Syntaxe et accès

**Unix/Linux** utilise la notation `$VARIABLE` ou `${VARIABLE}` :
- Affichage : `echo $HOME` ou `printenv HOME`
- Définition temporaire : `export EDITOR=vim`
- Définition dans un script : `MY_VAR="valeur"`

**Windows** utilise la notation `%VARIABLE%` :
- Affichage : `echo %USERPROFILE%` ou `set VARIABLE`
- Définition temporaire : `set EDITOR=notepad`
- Définition permanente : via l'interface graphique ou `setx`

### Stockage et persistance

**Unix/Linux** :
- Variables temporaires : définies dans la session courante
- Variables persistantes : stockées dans des fichiers comme `.bashrc`, `.profile`, `/etc/environment`
- Portée : session shell, utilisateur, ou système selon le fichier de configuration

**Windows** :
- Variables utilisateur : stockées dans le registre (HKEY_CURRENT_USER)
- Variables système : stockées dans le registre (HKEY_LOCAL_MACHINE)
- Interface graphique intégrée pour la gestion via "Variables d'environnement"

### Sensibilité à la casse

**Unix/Linux** : Les noms de variables sont sensibles à la casse (`PATH` ≠ `path`)
**Windows** : Insensible à la casse (`PATH` = `Path` = `path`)

### Variables système courantes

**Unix/Linux** :
- `HOME` : répertoire personnel de l'utilisateur
- `PATH` : chemins de recherche des exécutables
- `SHELL` : interpréteur de commandes par défaut
- `USER` : nom de l'utilisateur actuel

**Windows** :
- `USERPROFILE` : répertoire personnel (équivalent de HOME)
- `PATH` : chemins de recherche des exécutables
- `USERNAME` : nom de l'utilisateur actuel
- `TEMP` : répertoire des fichiers temporaires

Cette architecture permet aux deux systèmes de fournir un mécanisme flexible pour la configuration des applications, tout en conservant leurs spécificités propres en matière de syntaxe et de gestion.