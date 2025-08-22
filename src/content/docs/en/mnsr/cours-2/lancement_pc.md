---
title: PC Boot Process
description: "PC boot sequence: From BIOS to OS"
---

# PC Boot Sequence: From BIOS to OS

## Overview

The boot process of a PC follows a well-orchestrated sequence of instructions and programs that hand off control to transform an inert machine into a complete computing environment.

## Traditional BIOS/MBR Process

### Phase 1: Hardware Initialization (BIOS)

At startup, the processor executes its first instruction at a fixed address in ROM where the **BIOS** (Basic Input/Output System) is located. The BIOS performs **POST** (Power-On Self Test) to verify hardware integrity: RAM, processor, expansion cards. It then initializes essential controllers and configures basic hardware settings.

### Phase 2: Boot Device Search

The BIOS consults its configuration to determine boot order (hard drive, CD-ROM, USB, network). It reads the **MBR** (Master Boot Record) located in the first 512 bytes of the chosen boot device.

### MBR Structure (512 bytes)

The complete MBR is 512 bytes, structured as follows:

- **446 bytes**: boot code (bootcode)
- **64 bytes**: partition table (4 entries of 16 bytes each)
- **2 bytes**: end signature (0x55AA)

#### Partition Table (64 bytes)

Each partition entry (16 bytes) contains:
- **Byte 0**: Boot flag (0x80 = active partition, 0x00 = inactive)
- **Bytes 1-3**: Start CHS address (obsolete format)
- **Byte 4**: Partition type (0x83 = Linux, 0x07 = NTFS, etc.)
- **Bytes 5-7**: End CHS address
- **Bytes 8-11**: Start LBA (32 bits)
- **Bytes 12-15**: Size in sectors (32 bits)

#### End Signature (2 bytes)

The last 2 bytes contain **0x55AA** (little-endian), indicating to the BIOS that the sector is a valid MBR.

### Phase 3: Bootloader Loading

The MBR code, limited to 446 bytes, loads a more sophisticated **bootloader** located elsewhere on the disk. This bootloader often presents a menu allowing choice between multiple operating systems.

## Modern UEFI/GPT Process

### Main Differences from BIOS/MBR

**UEFI** (Unified Extensible Firmware Interface) replaces traditional BIOS and uses **GPT** (GUID Partition Table) instead of MBR.

### GPT Structure

- **Sector 0**: Protective MBR (compatibility)
- **Sector 1**: Primary GPT header
- **Sectors 2-33**: Partition table (128 entries of 128 bytes)
- **End of disk**: Backup header and GPT table

### EFI System Partition (ESP)

Instead of code in the MBR, UEFI uses a **special FAT32 partition** (ESP) that contains:
- `/EFI/BOOT/BOOTX64.EFI` (default bootloader)
- `/EFI/Microsoft/Boot/bootmgfw.efi` (Windows)
- `/EFI/ubuntu/grubx64.efi` (Linux)
- UEFI variables stored in NVRAM

### UEFI Boot Process

1. **UEFI firmware** initializes
2. **GPT reading** instead of MBR
3. **ESP mounting** as file system
4. **NVRAM reading** to know boot order
5. **Direct execution** of chosen .efi file
6. The .efi bootloader loads the OS

### UEFI/GPT Advantages

- **Disks > 2TB** (64-bit addressing)
- **128 partitions** instead of 4 primary
- **Secure Boot** (cryptographic verification)
- **Integrated network boot**
- **Graphical interface** during boot
- **UEFI drivers** for advanced hardware access

## Common Phases: OS Loading

### Phase 4: Kernel Loading

The bootloader reads configuration, locates OS kernel files on disk, and loads them into memory.

**Kernel files:**
- **Linux**: `vmlinuz` (compressed kernel), `initramfs`
- **Windows**: `ntoskrnl.exe` (NT kernel), `hal.dll`

### Phase 5: Operating System Initialization

The kernel takes control and performs:
- Internal data structure initialization
- Virtual memory management activation
- Hardware detection and configuration
- Loading necessary drivers
- Root file system mounting
- First user process launch (init/systemd)

### Kernel Roles

- **Memory management**: allocation, paging, virtual memory
- **Scheduling**: process and thread management
- **Hardware drivers**: peripheral communication
- **File system**: disk access, permissions
- **System calls**: interface for user programs
- **Security**: access control, process isolation

### Phase 6: Service Startup

The init system reads its configuration files and sequentially launches system services: network manager, servers, graphical interface. Each service may depend on other services, creating a dependency graph.

## Conclusion

This sequence progressively transforms an inert machine into a complete computing environment, each step preparing and launching the next in a well-defined chain of trust and responsibilities. The transition from traditional BIOS/MBR to UEFI/GPT represents an important modernization that eliminates archaic constraints while bringing flexibility and security.