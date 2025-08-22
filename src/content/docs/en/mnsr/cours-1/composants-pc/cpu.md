---
title: "CPU (Processor)"
description: "The brain of your PC - thinks faster than you, complains less"
---

### 🧱 **Power-on: the CPU Wakes Up**
    
- The **CPU receives the RESET signal** → it enters **real mode** (16 bits, like an 8086).
    
- It automatically starts executing code located at **memory address `0xFFFF0`** (at the top of the 1 MB range).
    

📍 This address is **mapped to the BIOS ROM** (physically connected to the motherboard).

---

⚠️ It's **always the CPU** that executes all code, **instruction by instruction**.

---

### ⚙️  **The CPU Executes the Operating System Kernel**

- The kernel takes complete control.
    
- The CPU switches to **protected mode (32 bits)** then often **long mode (64 bits)**.
    
- The operating system starts up.
    

---

## 🧠 Summary

- **The CPU executes everything**, from power-on.
    
- **Transitions happen via simple assembly instructions** (`JMP`, `CALL`) that redirect execution.
    
- Different chips just "pass control" → always executed by **the same CPU**, which simply reads **a new program in memory**.