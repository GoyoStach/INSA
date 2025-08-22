---
title: "Linux Main Directory Guide"
description: "Complete guide to Linux filesystem architecture with detailed description of each main directory and its purpose."
---

# 📁 Linux Main Directory Guide

This guide presents the main directories of the Linux filesystem and their detailed purpose according to the FHS (Filesystem Hierarchy Standard).

## 🏠 Essential root directories

### 🔧 `/bin`
**Essential system binaries**
Contains essential binary commands necessary for the system, even in single-user mode. Found here are commands like `ls`, `cp`, `mv`, `bash`, `cat`. These programs are indispensable for basic system operation.

### 🚀 `/boot`
**Boot files**
Stores all files necessary for system boot: Linux kernel (`vmlinuz`), initial RAM disk image (`initrd` or `initramfs`), boot loader configuration files (GRUB), and sometimes System.map.

### 🖥️ `/dev`
**Device files**
Contains device files that represent hardware components as special files. For example `/dev/sda` for the first hard drive, `/dev/tty` for terminals, `/dev/null` for the null device, `/dev/random` for random generation.

### ⚙️ `/etc`
**System configuration**
System configuration directory containing all global system and service configuration files. Found here are `passwd`, `fstab`, `hosts`, `crontab`, and service configurations in subdirectories like `/etc/apache2/` or `/etc/ssh/`.

### 🏡 `/home`
**User home directories**
Personal directories for standard users. Each user has a subdirectory here (e.g., `/home/john/`) containing their personal files, application configurations, documents, and environment settings.

### 📚 `/lib` and `/lib64`
**Shared libraries**
Essential shared libraries necessary for programs in `/bin` and `/sbin`. `/lib64` specifically contains 64-bit libraries on multi-architecture systems.

### 💿 `/media`
**Removable media**
Temporary mount point for automatically detected removable media (USB drives, CD-ROMs, external disks). The system automatically creates subdirectories here when devices are connected.

### 🔗 `/mnt`
**Temporary mounts**
Temporary mount point for filesystems mounted manually by the administrator. Used for temporary mounting of devices or network filesystems.

### 🚫 `/opt`
**Optional software**
Software packages that are not part of the standard distribution. Commercial software or large software packages often install here.

### 🔧 `/proc`
**Process information**
Virtual filesystem providing information about running processes and kernel parameters. Files here are generated dynamically by the kernel.

### 👑 `/root`
**Root user home**
Home directory for the root (administrator) user. Separate from `/home` to ensure availability even if `/home` is on a separate partition.

### 🔨 `/sbin`
**System binaries**
System administration binaries typically used by the root user for system maintenance and configuration tasks.

### 🌐 `/sys`
**System information**
Virtual filesystem exposing kernel and device information. Modern replacement for some `/proc` functionality.

### 📂 `/tmp`
**Temporary files**
Temporary files directory. Files here are typically deleted on system restart.

### 📦 `/usr`
**User programs**
Secondary hierarchy containing most user programs, libraries, and documentation. Contains subdirectories like `/usr/bin`, `/usr/lib`, `/usr/share`.

### 📝 `/var`
**Variable data**
Variable data files including logs, databases, cache files, and other data that changes frequently during system operation.

## Key Principles

- **Everything is a file** in Linux
- **Hierarchical structure** from root (/)
- **Standard locations** for different types of files
- **Separation of system and user data**
- **Mount points** for additional filesystems