---
title: Lancement d'un PC
description: "Séquence de démarrage d'un PC : Du BIOS à l'OS"
---
# Cours complet : Binaire, Assembleur et Systèmes

## Table des matières

1. [Fonctionnement du binaire](#1-fonctionnement-du-binaire)
2. [Opérations en binaire](#2-opérations-en-binaire)
3. [Complément à 2 - Nombres négatifs](#3-complément-à-2---nombres-négatifs)
4. [Système hexadécimal](#4-système-hexadécimal)
5. [Les octets](#5-les-octets)
6. [Table ASCII](#6-table-ascii)
7. [Assembleur et code machine](#7-assembleur-et-code-machine)
8. [Exemple pratique assembleur](#8-exemple-pratique-assembleur)
9. [Compilation des langages](#9-compilation-des-langages)

---

## 1. Fonctionnement du binaire

### Qu'est-ce que le binaire ?
- Système de numération en base 2 (seulement 0 et 1)
- Chaque position représente une puissance de 2
- De droite à gauche : 2⁰, 2¹, 2², 2³, etc.

### Conversion décimal → binaire
**Exemple : 13 en binaire**
- 13 ÷ 2 = 6 reste 1
- 6 ÷ 2 = 3 reste 0  
- 3 ÷ 2 = 1 reste 1
- 1 ÷ 2 = 0 reste 1

**Résultat : 1101₂**

### Conversion binaire → décimal
**1101₂ = ?**
- 1×2³ + 1×2² + 0×2¹ + 1×2⁰
- 8 + 4 + 0 + 1 = 13

### Exemple détaillé : 236 en binaire
```
236 ÷ 2 = 118  reste 0
118 ÷ 2 = 59   reste 0
59  ÷ 2 = 29   reste 1
29  ÷ 2 = 14   reste 1
14  ÷ 2 = 7    reste 0
7   ÷ 2 = 3    reste 1
3   ÷ 2 = 1    reste 1
1   ÷ 2 = 0    reste 1
```

**On lit les restes de bas en haut :** 236₁₀ = **11101100₂**

---

## 2. Opérations en binaire

### Addition binaire
```
  1011  (11 en décimal)
+ 0110  (6 en décimal)
------
 10001  (17 en décimal)
```

**Règles :**
- 0 + 0 = 0
- 0 + 1 = 1  
- 1 + 0 = 1
- 1 + 1 = 10 (0 avec retenue de 1)

### Soustraction binaire

#### Règles de base :
- **0 - 0 = 0**
- **1 - 0 = 1** 
- **1 - 1 = 0**
- **0 - 1 = ?** → Il faut emprunter !

#### Règle d'emprunt :
Quand on fait **0 - 1**, on emprunte 1 au chiffre de gauche :
- **10 - 1 = 1** (comme 2 - 1 = 1 en décimal)

#### Exemple détaillé : 1011 - 0110
```
   1011  (11 en décimal)
-  0110  (6 en décimal)
   ----
   0101  (5 en décimal)
```

### Multiplication binaire

#### Règles de base :
- **0 × 0 = 0**
- **0 × 1 = 0**
- **1 × 0 = 0** 
- **1 × 1 = 1**

#### Exemple : 101 × 11
```
     101  (5 en décimal)
×     11  (3 en décimal)  
     ---
     101  (101 × 1)
+   1010  (101 × 1, décalé)
    ----
    1111  (15 en décimal)
```

---

## 3. Complément à 2 - Nombres négatifs

### Principe de base
Le **complément à 2** est la méthode standard pour représenter les nombres négatifs en binaire.

#### Règle du bit de signe
- **Premier bit = 0** → nombre positif
- **Premier bit = 1** → nombre négatif

### Méthode de calcul du complément à 2

#### Pour obtenir -X à partir de X :
**Étape 1 :** Inverser tous les bits (complément à 1)
**Étape 2 :** Ajouter 1 au résultat

#### Exemple : Calculer -5 en 8 bits
**5 en binaire (8 bits) :** `00000101`

**Étape 1 - Inverser tous les bits :**
```
00000101 → 11111010
```

**Étape 2 - Ajouter 1 :**
```
  11111010
+ 00000001
  --------
  11111011
```

**Résultat : -5 = 11111011**

### Plage de valeurs (8 bits)
- **Positifs :** 0 à +127 (00000000 à 01111111)
- **Négatifs :** -1 à -128 (11111111 à 10000000)
- **Total :** 256 valeurs (-128 à +127)

### Calculer la valeur d'un nombre négatif
#### Exemple : 11111011 = ?
**Étape 1 :** Je vois que ça commence par 1 → c'est négatif

**Étape 2a - Inverser tous les bits :**
```
11111011 → 00000100
```

**Étape 2b - Ajouter 1 :**
```
  00000100
+ 00000001
  --------
  00000101 = 5 en décimal
```

**Résultat :** 11111011 = **-5**

---

## 4. Système hexadécimal

### Tableau de correspondance de base (0-15)

| Décimal | Binaire | Hexadécimal | Mnémotechnique |
|---------|---------|-------------|----------------|
| 0       | 0000    | 0           | Zero |
| 1       | 0001    | 1           | Un |
| 2       | 0010    | 2           | Deux |
| 3       | 0011    | 3           | Trois |
| 4       | 0100    | 4           | Quatre |
| 5       | 0101    | 5           | Cinq |
| 6       | 0110    | 6           | Six |
| 7       | 0111    | 7           | Sept |
| 8       | 1000    | 8           | Huit |
| 9       | 1001    | 9           | Neuf |
| 10      | 1010    | **A**       | **A**près 9 |
| 11      | 1011    | **B**       | **B**eaucoup |
| 12      | 1100    | **C**       | **C**inq+sept |
| 13      | 1101    | **D**       | **D**ouze+un |
| 14      | 1110    | **E**       | **E**ncore plus |
| 15      | 1111    | **F**       | **F**ini (max sur 4 bits) |

### Règle d'or : 1 chiffre hexa = 4 bits binaires

#### Exemple de conversion Binaire → Hexadécimal
```
11010110₂ = ?

Étape 1: Grouper par 4 bits (de droite à gauche)
1101 0110

Étape 2: Convertir chaque groupe
1101 = D
0110 = 6

Résultat: D6₁₆
```

### Conversions hexa → décimal

| Hexadécimal | Calcul | Décimal |
|-------------|--------|---------|
| A₁₆         | 10×1 = 10 | 10 |
| FF₁₆        | 15×16 + 15×1 = 240 + 15 | 255 |
| 100₁₆       | 1×256 + 0×16 + 0×1 | 256 |

---

## 5. Les octets

### Qu'est-ce qu'un octet ?
**Un octet = 8 bits = 8 chiffres binaires**

### 1. Octet non signé (unsigned)
- **Tous les bits représentent une valeur positive**
- **Plage : 0 à 255** (2⁸ = 256 valeurs)

#### Exemple : 10110101
```
Position: 7  6  5  4  3  2  1  0
Bit:      1  0  1  1  0  1  0  1
Valeur:  128 0  32 16  0  4  0  1

Calcul: 128 + 32 + 16 + 4 + 1 = 181
```

### 2. Octet signé (complément à 2)
- **Le bit 7 (le plus à gauche) = bit de signe**
- **Plage : -128 à +127** (256 valeurs au total)

#### Même exemple : 10110101
**Calcul direct :**
```
Position: 7   6  5  4  3  2  1  0
Bit:      1   0  1  1  0  1  0  1
Valeur:  -128 0  32 16  0  4  0  1

Calcul: -128 + 32 + 16 + 4 + 1 = -75
```

### Comparaison des deux interprétations

| Binaire  | Non signé | Signé | Explication |
|----------|-----------|-------|-------------|
| 00000000 | 0         | 0     | Même valeur |
| 01111111 | 127       | 127   | Plus grand positif signé |
| 10000000 | 128       | -128  | **Différence !** |
| 11111111 | 255       | -1    | **Différence !** |

### Points clés
- **256 valeurs possibles** dans un octet
- **Valeur maximale non signée :** 255
- **Le programmeur choisit** l'interprétation (signé/non signé)

---

## 6. Table ASCII

### ASCII Standard - Caractères imprimables principaux

| Déc | Hex | Caractère | | Déc | Hex | Caractère |
|-----|-----|-----------|---|-----|-----|-----------|
| 32  | 20  | [espace]  | | 64  | 40  | @         |
| 33  | 21  | !         | | 65  | 41  | A         |
| 48  | 30  | 0         | | 66  | 42  | B         |
| 49  | 31  | 1         | | ...  | ... | ...       |
| 57  | 39  | 9         | | 90  | 5A  | Z         |
| 65  | 41  | A         | | 97  | 61  | a         |
| 80  | 50  | P         | | 112 | 70  | p         |

### Exemple : Lettre P
**P majuscule :**
- **Décimal :** 80
- **Hexadécimal :** 50
- **Binaire :** 01010000

**p minuscule :**
- **Décimal :** 112  
- **Hexadécimal :** 70
- **Binaire :** 01110000

**Astuce :** Différence majuscule/minuscule = toujours 32

---

## 7. Assembleur et code machine

### Principe de base
**Chaque instruction assembleur = une séquence de bits (code machine)**

### Opérations de base x86

#### 1. MOV (Déplacer/Copier des données)
```assembly
MOV EAX, 5      ; Charger la valeur 5 dans le registre EAX
```
**Code machine :** `B8 05 00 00 00`
- `B8` = Code opération pour "MOV EAX, valeur immédiate"
- `05 00 00 00` = Valeur 5 en little-endian (32 bits)

#### 2. ADD (Addition)
```assembly
ADD EAX, EBX    ; EAX = EAX + EBX
```
**Code machine :** `01 D8`

#### 3. SUB (Soustraction)
```assembly
SUB EAX, 3      ; EAX = EAX - 3
```
**Code machine :** `2D 03 00 00 00`

### Registres principaux (32 bits)

| Registre | Code binaire | Usage principal |
|----------|--------------|-----------------|
| EAX      | 000          | Accumulateur |
| EBX      | 011          | Base |
| ECX      | 001          | Compteur |
| EDX      | 010          | Données |

---

## 8. Exemple pratique assembleur

### Programme : Calculer la moyenne de 20 et 30

```assembly
section .text
global _start

_start:
    ; Charger les deux nombres
    MOV EAX, 20         ; EAX = 20
    MOV EBX, 30         ; EBX = 30
    
    ; Additionner
    ADD EAX, EBX        ; EAX = EAX + EBX = 50
    
    ; Diviser par 2 (décaler d'1 bit à droite)
    SHR EAX, 1          ; EAX = EAX / 2 = 25
    
    ; Terminer le programme
    MOV EBX, EAX        ; Code de sortie = résultat
    MOV EAX, 1          ; Numéro de l'appel système 'exit'
    INT 0x80            ; Appel système
```

### Traduction en code machine

| Instruction | Code machine (hexa) | Taille |
|-------------|---------------------|--------|
| `MOV EAX, 20` | `B8 14 00 00 00` | 5 octets |
| `MOV EBX, 30` | `BB 1E 00 00 00` | 5 octets |
| `ADD EAX, EBX` | `01 D8` | 2 octets |
| `SHR EAX, 1` | `D1 E8` | 2 octets |
| `MOV EBX, EAX` | `89 C3` | 2 octets |
| `MOV EAX, 1` | `B8 01 00 00 00` | 5 octets |
| `INT 0x80` | `CD 80` | 2 octets |

**Total : 23 octets**

### Exécution pas à pas

1. **MOV EAX, 20** : EAX = 00000014 (20)
2. **MOV EBX, 30** : EBX = 0000001E (30)
3. **ADD EAX, EBX** : EAX = 00000032 (50)
4. **SHR EAX, 1** : EAX = 00000019 (25)

---

## 9. Compilation des langages

### Le processus de compilation

#### Tous les programmes C sont convertis en assembleur !

**1. Code C :**
```c
#include <stdio.h>

int main() {
    printf("Hello World\n");
    return 0;
}
```

**2. Compilation → Assembleur :**
```assembly
.section .rodata
.LC0:
    .string "Hello World"

.text
.globl main
main:
    push    rbp
    mov     rbp, rsp
    mov     edi, OFFSET FLAT:.LC0
    call    puts
    mov     eax, 0
    pop     rbp
    ret
```

**3. Assemblage → Code machine :**
```
55 48 89 e5 bf 00 20 40 00 e8 f5 fe ff ff b8 00 00 00 00 5d c3
```

### Pourquoi cette conversion est obligatoire ?

#### Le processeur ne comprend QUE le code machine
- Il n'a aucune notion de "variables", "fonctions", "if", etc.
- Il ne connaît que des instructions comme `MOV`, `ADD`, `JMP`

### Voir la conversion
```bash
gcc -S hello.c        # Crée hello.s (assembleur)
gcc hello.c -o hello  # Compiler normalement
objdump -d hello      # Désassembler pour voir l'assembleur
```

### Sous Windows aussi !

#### Compilateurs Windows :
```bash
cl /Fa hello.c    # Visual Studio - génère hello.asm
gcc -S hello.c    # MinGW - génère hello.s
```

#### Différences Windows/Linux :
**Le code assembleur de base est identique :**
```assembly
mov eax, 5        # Identique sur Windows et Linux
add eax, ebx      # Identique sur Windows et Linux
```

**Différences dans :**
- Convention d'appel des fonctions
- Appels système
- Format des fichiers

### Langages concernés

#### Compilés vers assembleur :
- **C/C++** → assembleur → code machine
- **Rust** → assembleur → code machine  
- **Go** → assembleur → code machine

#### Cas particulier .NET :
```
C# → Bytecode .NET (IL) → JIT → Assembleur x86-64
```

---

## Points clés à retenir

1. **Le binaire est la base** de tout en informatique
2. **L'hexadécimal simplifie** la lecture du binaire
3. **Le complément à 2** permet les nombres négatifs
4. **Un octet = 256 valeurs possibles**, max = 255
5. **L'assembleur est un langage intermédiaire** entre le code et le processeur
6. **Tous les langages compilés** passent par l'assembleur
7. **Le processeur ne comprend que le code machine** (binaire)
8. **Windows, Linux, Mac** : même principe de compilation

L'informatique repose entièrement sur ces concepts fondamentaux, du plus petit bit au programme le plus complexe !