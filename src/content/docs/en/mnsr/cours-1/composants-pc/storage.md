---
title: "Storage (SSD/HDD)"
description: "Your digital hoarder's paradise - holds everything you'll never delete"
---

## 💽 1. **Role of Hard Drive (HDD/SSD)**

A **hard drive** (or SSD) is a **permanent storage device**. Unlike RAM, it **retains data even without power**.

### 📂 What is it used for?

- Store the **operating system**
    
- Store **user data** (files, documents, apps)
    
- Contains the **bootloader** (in some cases, e.g., GRUB or bootmgr)
    
- Serves as space for **virtual memory** (swap/pagefile)
    

---

## 🧱 2. **What are partitions?**

The disk is seen by the system as a **large sequence of binary blocks**. **Partitions** are **logical zones** that divide this disk into independent pieces.

> A partition = a "compartment" of the disk that can contain a file system (ext4, NTFS...) and be used to boot or store data.

### Usage examples:

- A partition for the system (`/` or `C:`)
    
- One for swap
    
- One for `/home`
    
- One for factory recovery
    
- One for **ESP** in UEFI case (EFI System Partition)
    

---

## 🧭 3. **Partitioning Types: MBR vs GPT (UEFI)**

||**MBR (Master Boot Record)**|**GPT (GUID Partition Table)**|
|---|---|---|
|Max disk size|2 TB|9.4 Zettabytes (~infinite)|
|Max partitions|4 primary (or 3 + logical partitions)|128 (standard)|
|Table position|Sector 0 of disk (512 bytes)|Beginning + backup copy at end of disk|
|UEFI compatible?|❌ No (Legacy BIOS only)|✅ Yes (UEFI standard)|
|Redundancy|❌ No|✅ Yes (GPT table copied at end of disk)|
|Bootloader storage|MBR contains mini bootloader|Bootloader = `.efi` file in ESP|

---

### 🧮 Detail: MBR (Legacy BIOS)

- **Sector 0** (512 bytes) contains:
    
    - **First 446 bytes**: boot code (small program)
        
    - A **partition table** for **4 partitions maximum**
        
    - A **bootable signature** `0x55AA`
        
- BIOS reads this sector → launches bootloader
    

📌 **Limitations:**

- No redundancy (if MBR is corrupted, disk unusable)
    
- Maximum 4 primary partitions (or one extended containing logical ones)
    
- Obsolete for disks > 2 TB
    

---

### 🧬 Detail: GPT (UEFI)

- Uses a **special partition called ESP** (EFI System Partition)
    
    - Formatted as **FAT32**
        
    - Contains `.efi` files (UEFI bootloaders)
        
    - Example: `/EFI/Microsoft/Boot/bootmgfw.efi` or `/EFI/Boot/bootx64.efi`
        
- The rest of the disk contains classic partitions (OS, swap, etc.)
    

📌 **Advantages:**

- Built-in redundancy (copy at end of disk)
    
- Can contain **up to 128 partitions** without hacks
    
- Required for **Secure Boot** and **pure UEFI** mode boot
    
- Supports huge disks (4, 8, 16 TB or more)
    

---

## 🗂️ 4. Concrete Example: Hard Drive with Windows or Linux (UEFI)

Here's a typical configuration:

|Partition|Type|Usage|
|---|---|---|
|ESP|FAT32|EFI boot files (`.efi`)|
|Microsoft Reserved (MSR)|System|Reserved for Windows|
|C: (or `/`)|NTFS/ext4|Main OS partition|
|Recovery|NTFS|System recovery|

---

## 🧩 Summary

|Element|Role|
|---|---|
|Hard drive|Stores OS, files, bootloader, etc.|
|Partition|Logical division of disk|
|MBR|Partition format + mini bootloader (Legacy BIOS)|
|GPT|Modern format, multiple partitions, `.efi` boot file (UEFI)|
|ESP|Special partition containing UEFI boot files|

## BONUS: Detailed Bootloader Operation
### 🧩 1. **What is the bootloader?**

The **bootloader** is a small program **stored on the boot disk**, which prepares and launches the **operating system**. It can be very simple (a few hundred bytes), or more complex (boot menu, multi-OS support, security...).

Examples:

- **GRUB** (Linux)
    
- **LILO** (old Linux)
    
- **Windows Boot Manager** (`bootmgr`)
    
- **Syslinux**, **rEFInd**, etc.
    

---

### 💽 2. **Where is the bootloader physically stored?**

### On a disk using MBR (old partition system)

- The bootloader is divided into **two parts**:
    
    - **1st part (boot sector)**: Stored in the **MBR** (Master Boot Record), at the top of the disk (sector 0, 512 bytes).
        
    - **2nd part**: Stored further on the disk (often in a `/boot` partition).
        

> BIOS loads **only the first 512 bytes** (MBR) into RAM. This small code contains just enough instructions to **find and load the second part of the bootloader**.

### On a disk using GPT (more modern, UEFI)

- The bootloader is an **executable file** (often `.efi`) stored in a special partition:
    
    - 📂 **EFI System Partition (ESP)**: a small FAT32 partition (~100-300 MB).
        
    - Example: `/EFI/Boot/bootx64.efi` or `/EFI/Microsoft/Boot/bootmgfw.efi`
        

> UEFI explores this partition like a small file system, finds the EFI file, loads it into memory and launches it.

---

## ⚙️ 3. **How is the bootloader found and launched?**

### BIOS + MBR Case (Legacy Boot)

1. BIOS looks at **sector 0** of the disk.
    
2. It finds the **512 bytes of MBR**:
    
    - **First 446**: executable code (mini bootloader)
        
    - Then: partition table
        
    - End: `0x55AA` signature (indicates it's bootable)
        
3. This mini-code is copied to **RAM** at address `0x7C00`, and CPU jumps to this address to execute the code.
    
4. This code loads the **real bootloader** (e.g., GRUB stage 2) from a partition.
    
5. GRUB displays a menu, then loads the **Linux kernel** or Windows.
    

### UEFI + GPT Case (Modern Boot)

1. **UEFI firmware** mounts the **ESP** partition as a mini FAT32 file system.
    
2. It searches for the `.efi` file defined in **boot priority levels** (NVRAM).
    
3. It loads this `.efi` file into memory.
    
4. CPU jumps to its entry point, and executes the **UEFI bootloader** (GRUB, bootmgfw.efi...).
    
5. The bootloader loads the OS kernel.
    

---

## 🧠 4. **What exactly does the bootloader do?**

Here are its main roles:

### 🔍 a. Locate the operating system kernel

- Examples:
    
    - Linux: `vmlinuz`, `initrd`, etc. files
        
    - Windows: `winload.efi` file
        

### 📦 b. Load the kernel into RAM

- The bootloader **reads kernel files** from disk (uses an integrated mini file system, e.g., ext4, FAT, NTFS...).
    
- It copies the kernel to a high memory address (typically `0x100000` or higher).
    
- It prepares memory (reserved zone, boot arguments, initrd...).
    

### 🏁 c. Transfer control

- Once the kernel is ready, the bootloader **jumps to the kernel entry**.
    
- The CPU then executes the kernel directly.