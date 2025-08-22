---
title: "BIOS/UEFI"
description: "The PC's first impression - wakes up before coffee and judges your hardware choices"
---

## 🧠 1. **The Role of BIOS (or UEFI)**

The **BIOS** (Basic Input/Output System) or **UEFI** (Unified Extensible Firmware Interface) is stored in a **ROM** or **flash** chip on the motherboard. BIOS is not a processor: it's a **program in a chip**.

### 🎯 Main BIOS Objectives:

#### 1.1 Initialize Hardware

- Activates CPU, configures clocks, initializes RAM, configures ports (USB, SATA...).
    
- Configures the **chipset** that interconnects CPU ↔ RAM ↔ peripherals.
    

#### 1.2 Perform POST (Power-On Self Test)

- Verifies that minimum components are present and functional:
    
    - RAM (simple write/read)
        
    - CPU (response to an instruction)
        
    - GPU (ability to display a screen)
        
    - Keyboard (presence/connection)
        
- If a problem is detected, it emits **beeps** according to an error code.
    

#### 1.3 Provide Configuration Interface (UEFI Setup)

- Allows user to configure:
    
    - Boot order
        
    - Boot mode (Legacy/UEFI)
        
    - Activation of certain features (virtualization, secure boot, overclocking...)
        

#### 1.4 Locate Boot Device

- BIOS reads **boot sectors** (MBR or GPT) from each disk in the defined order.
    
- If a valid sector is found, it loads the **bootloader** into RAM memory.