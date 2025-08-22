---
title: Complete Binary Course
description: "Complete course: Binary, Assembly and Systems"
---

# Complete Course: Binary, Assembly and Systems

## Table of Contents

1. [Binary Operation](#1-binary-operation)
2. [Binary Operations](#2-binary-operations)
3. [Two's Complement - Negative Numbers](#3-twos-complement---negative-numbers)
4. [Hexadecimal System](#4-hexadecimal-system)
5. [Bytes](#5-bytes)
6. [ASCII Table](#6-ascii-table)
7. [Assembly and Machine Code](#7-assembly-and-machine-code)
8. [Practical Assembly Example](#8-practical-assembly-example)
9. [Language Compilation](#9-language-compilation)

---

## 1. Binary Operation

### What is binary?
- Base-2 numeration system (only 0 and 1)
- Each position represents a power of 2
- From right to left: 2⁰, 2¹, 2², 2³, etc.

### Decimal → Binary conversion
**Example: 13 in binary**
- 13 ÷ 2 = 6 remainder 1
- 6 ÷ 2 = 3 remainder 0
- 3 ÷ 2 = 1 remainder 1
- 1 ÷ 2 = 0 remainder 1

Reading remainders from bottom to top: **1101**

### Binary → Decimal conversion
**Example: 1101 in decimal**
- 1×2³ + 1×2² + 0×2¹ + 1×2⁰
- 1×8 + 1×4 + 0×2 + 1×1
- 8 + 4 + 0 + 1 = **13**

---

## 2. Binary Operations

### Addition
```
  1010  (10)
+  110  (6)
------
 10000  (16)
```

### Subtraction
```
  1010  (10)
-  110  (6)
------
   100  (4)
```

---

## 3. Two's Complement - Negative Numbers

### Representation of negative numbers
- Most significant bit indicates sign (0 = positive, 1 = negative)
- Two's complement method for negative numbers

### Two's complement process
1. Invert all bits (1→0, 0→1)
2. Add 1 to the result

**Example: -5 in 8-bit two's complement**
- 5 in binary: 00000101
- Invert bits: 11111010
- Add 1: 11111011
- Result: -5 = 11111011

---

## 4. Hexadecimal System

### Base-16 system
- Uses digits 0-9 and letters A-F
- A=10, B=11, C=12, D=13, E=14, F=15
- Each hex digit represents 4 binary bits

### Binary ↔ Hexadecimal conversion
```
Binary:  1010 1100
Hex:     A    C
Result:  AC
```

---

## 5. Bytes

### Definition
- 1 byte = 8 bits
- Can represent values from 0 to 255 (unsigned)
- Or from -128 to 127 (signed)

### Common sizes
- 1 byte = 8 bits
- 1 kilobyte (KB) = 1,024 bytes
- 1 megabyte (MB) = 1,024 KB
- 1 gigabyte (GB) = 1,024 MB

---

## 6. ASCII Table

### Character encoding
- ASCII uses 7 bits (128 characters)
- Extended ASCII uses 8 bits (256 characters)

### Common ASCII values
- 'A' = 65 (01000001)
- 'a' = 97 (01100001)
- '0' = 48 (00110000)
- Space = 32 (00100000)

---

## 7. Assembly and Machine Code

### What is assembly?
- Low-level programming language
- Human-readable representation of machine code
- Each instruction corresponds to processor operations

### Basic instructions
```assembly
MOV AX, 5    ; Move value 5 to register AX
ADD AX, 3    ; Add 3 to AX
INT 21h      ; Software interrupt
```

---

## 8. Practical Assembly Example

### Simple "Hello World" program
```assembly
.model small
.stack 100h
.data
    msg db 'Hello, World!$'
.code
main:
    mov ax, @data
    mov ds, ax
    mov dx, offset msg
    mov ah, 09h
    int 21h
    mov ah, 4Ch
    int 21h
end main
```

---

## 9. Language Compilation

### Compilation process
1. **Source code** (C, C++, etc.)
2. **Preprocessor** (includes, macros)
3. **Compiler** (assembly code)
4. **Assembler** (machine code)
5. **Linker** (executable file)

### High-level to machine code
- High-level languages are translated to assembly
- Assembly is converted to machine code
- Machine code is executed directly by processor