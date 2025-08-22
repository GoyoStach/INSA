---
title: "Motherboard"
description: "The PC's nervous system - connects everything and judges your cable management"
---

## 🧩 **Main Role of the Motherboard**

The motherboard (or **mainboard**) is a **printed circuit board** that:

1. **Connects** all components (CPU, RAM, GPU, SSD, etc.)
    
2. **Distributes electrical power**
    
3. **Enables communication between components** via different **buses**
    
4. Contains **control circuits**, **firmware**, and sometimes **integrated peripherals**
    

---

## ⚡ Does it Provide Electricity?

### ✅ **It Distributes Electricity**

- The **power supply unit (PSU)** is **external to the motherboard**.
    
- The **PSU** connects to the motherboard via **24-pin (ATX)** and **8-pin CPU** connectors.
    
- The motherboard **redirects this electricity** to components (CPU, RAM, fans, etc.) via **voltage regulators** called **VRM (Voltage Regulator Module)**.
    

### ⚠️ But:

> **It doesn't generate current itself**. It acts as a **distributor and regulator**.

---

## 🔧 Detailed Main Functions

### 1. **Power Distribution**

- Via copper traces + VRMs:
    
    - CPU: receives regulated voltage (e.g., 1.2V, 1.4V...)
        
    - RAM, chipset, PCIe ports, etc. receive what they need.
        
- Manages **electrical protections** (overvoltage, short circuit).
    

---

### 2. **Physical Component Connection**

- Sockets for:
    
    - **CPU** (e.g., LGA 1700)
        
    - **RAM** (DIMM slots)
        
    - **Expansion cards** (PCIe for GPU, sound cards, etc.)
        
    - **Storage** (SATA, NVMe)
        
    - **Power** (24-pin, 8-pin CPU, etc.)
        

---

### 3. **Communication via Buses**

- **Memory bus**: CPU ↔ RAM
    
- **PCI Express (PCIe) bus**: CPU ↔ GPU, SSD, expansion cards
    
- **SATA / NVMe**: CPU/chipset ↔ SSD/HDD
    
- **USB / Ethernet / Audio**: Peripherals ↔ chipset
    

> The motherboard acts as a **hub** that connects and synchronizes all of this.

## 🧬**Bonus: How the CPU Communicates with RAM and Peripherals at Low Level**

Here's the lowest level, the **core of computer operation**. At this stage, we're talking about **binary data transfers** between components through **physical buses**, **registers**, and **interrupts**.

---

### 🛣️ A. **Buses**

A **bus** is a communication line between components. It carries **bits** between the CPU and other elements.

|Bus|Role|
|---|---|
|**Data bus**|Transfers values (e.g., an instruction, a number)|
|**Address bus**|Indicates **where** to read or write in memory (address)|
|**Control bus**|Signals the type of operation (read, write, etc.)|

#### 🧠 Example: Reading a Value from RAM

1. The CPU places a **memory address** on the **address bus**.
    
2. It activates a control line to signal a **read**.
    
3. RAM places the requested data on the **data bus**.
    
4. The CPU reads the value from the bus and stores it in a **register**.
    

---

### 📦 B. **Registers**

These are **small internal memories** in the CPU. They serve to:

- **Stage data** for operations (calculations, reads, comparisons...)
    
- **Control execution flow** (e.g., instruction register, stack pointer...)
    

Register types:

- `AX`, `BX`, `CX`...: general purpose
    
- `IP`: instruction pointer
    
- `SP`: stack pointer
    
- `CR0`, `CR3`...: control registers for memory management, protection, etc.
    

---

### 🖥️ C. **Peripheral Access**

#### 1. By **I/O Mapped Memory** (Port-mapping)

- Each peripheral has a **special address range** in I/O space.
    
- The CPU uses instructions like `IN`, `OUT` to read/write to these addresses.
    

#### 2. By **Memory-Mapped I/O (MMIO)**

- The peripheral **responds like RAM** on a special address range.
    
- The CPU accesses these ranges with simple memory reads/writes.
    
- This is the most commonly used method today (PCIe, GPU, network cards...).
    

---

### 🚨 D. **Hardware Interrupts**

A peripheral can **send a signal to the CPU** to say:

> "I've finished a task, come handle this!"

For example:

- A disk has finished reading data
    
- A key has been pressed
    
- A network packet has arrived
    

The CPU **interrupts** its normal execution, jumps to an **interrupt service routine (ISR)**, handles the request, then returns.

These interrupts pass through the **interrupt controller** (e.g., **APIC**, **PIC**) integrated into the chipset.

---

### 📋 Visual Summary:

`[CPU] ⇄ [Data/Address/Control Bus] ⇄ [RAM] ⇄ [Peripherals via PCIe/MMIO] ⇄ [Interrupt Controller] ← [Keyboard, Disk, Network...]`

---

### 4. **Control and Configuration**

- Integrates a **chipset** (Intel PCH, AMD Fusion Controller Hub, etc.) that:
    
    - Manages USB ports, network, audio, disks...
        
    - Provides interfaces for BIOS/UEFI.
        
- Contains a **ROM** chip with **BIOS or UEFI**.
    
- May include an **RTC (Real Time Clock)** + CMOS battery for time and configuration.
    

---

### 5. **Integration of Additional Components**

- Integrated audio (Realtek chip, etc.)
    
- Ethernet or Wi-Fi network
    
- Additional controllers (fans, RGB LEDs, etc.)