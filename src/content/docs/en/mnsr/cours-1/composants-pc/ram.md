---
title: "RAM (Memory)"
description: "The PC's short-term memory - forgets everything when you turn it off"
---

## 🧠 1. What is RAM?

**RAM** stands for **Random Access Memory**.  
It's a **fast**, **volatile** memory used to **temporarily** store data needed for computer operation while it's powered on.

- **Volatile** = its contents are erased as soon as the computer shuts down.
    
- **Random access** = you can directly access any memory address without having to traverse memory sequentially.
    

---

## 🎯 2. What is RAM used for?

RAM is used to store:

- the **operating system** currently running
    
- **open programs** (browser, text editor...)
    
- **temporary data** manipulated by these programs
    
- **buffers** for peripherals (graphics card, disk, etc.)
    

> **Analogy:**  
> Hard drive = entire library (slow but huge)  
> RAM = work desk (fast, but limited)  
> You copy books to your desk to read them quickly, but you can't put everything there.

---

## ⚙️ 3. How does it work technically?

### a) Data Storage

RAM is composed of **cells** (transistors + capacitors) organized in **rows** and **columns**. Each cell contains a **bit** (`0` or `1`).

### b) Data Access

- The **memory controller** (often integrated into the CPU) sends an **address** to RAM via the **address bus**.
    
- RAM returns the **value** stored at that address via the **data bus**.
    
- All this happens in **a few nanoseconds**.
    

### c) Refresh (DRAM)

Most RAM is **DRAM** type (Dynamic RAM), which must be **refreshed** thousands of times per second because cells lose their charge (and thus information).

---

## 🧩 4. RAM's Role in Program Execution

Here's the **typical path** of a program:

1. You open an application → the program is read from **hard drive** (slow)
    
2. It's **copied to RAM**
    
3. The **CPU reads instructions and data directly from RAM**
    
4. Intermediate results are also stored in RAM
    
5. When you close the program → RAM is freed
    

> Any executed program must be **loaded into RAM**, because the CPU **cannot directly execute** code from the hard drive.

## 📏 5. Important RAM Characteristics

|Element|Description|
|---|---|
|**Capacity**|Total amount (e.g., 8 GB, 16 GB, 32 GB...)|
|**Frequency**|Access speed (e.g., 3200 MHz, 5600 MHz...)|
|**Latency (CL)**|Delay to access data|
|**Type**|DDR4, DDR5 (generations)|
|**Channels**|Single / Dual / Quad Channel (parallelism)|

---

## 💡 6. What happens if you don't have enough RAM

- The system then uses **swap** (file or partition on hard drive).
    
- The disk is **thousands of times slower** than RAM.
    
- Result: your computer **lags** or **freezes** because it "swaps" too much.