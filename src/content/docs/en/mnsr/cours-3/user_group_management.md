---
title: Users & Groups
description: "Users and groups in Unix/Linux"
---
# Users & Groups

## Users and Groups in Unix/Linux

### Fundamental Concepts

**Users**: Each person or service accessing the system has a unique user account, identified by a name (login) and number (UID - User ID).

**Groups**: Collections of users who share similar permissions, identified by a name and number (GID - Group ID).

### Setup and Management

**User Creation:**
- `useradd username` : creates a new user
- `passwd username` : sets the password
- `usermod` : modifies properties of an existing user
- `userdel` : deletes a user

**Group Management:**
- `groupadd groupname` : creates a new group
- `usermod -aG groupname username` : adds a user to a group
- `gpasswd -d username groupname` : removes a user from a group
- `groupdel` : deletes a group

### Important Configuration Files

- `/etc/passwd` : user information
- `/etc/group` : group information  
- `/etc/shadow` : encrypted passwords (restricted access)
- `/etc/gshadow` : group passwords

### Utility and Advantages

**Enhanced Security:** Each user can only access authorized resources, limiting damage in case of account compromise.

**Separation of Responsibilities:** Different users can have distinct roles (administrator, developer, end user) with appropriate permissions.

**Collaborative Management:** Groups allow easy sharing of files and resources between multiple users working on the same project.

**Audit and Traceability:** Each action can be associated with a specific user, facilitating tracking and problem resolution.

**Process Isolation:** Applications can run under dedicated accounts, limiting their impact on the system in case of malfunction.

### Best Practices

- Use the principle of least privilege: give only necessary permissions
- Create dedicated service accounts for applications
- Organize users into logical groups according to their function
- Regularly monitor active accounts and delete those no longer needed
- Use `sudo` rather than working directly as root

This architecture enables fine-grained and secure access management, essential in a multi-user environment.

## Numeric Values of chmod Permissions

### 1. Octal Notation System

Each permission has a numeric value:
- **r (read)** = 4
- **w (write)** = 2  
- **x (execute)** = 1
- **- (no permission)** = 0

### 2. Calculation by Addition

For each group (owner, group, others), we add the values:

```
r + w + x = 4 + 2 + 1 = 7  (all permissions)
r + w     = 4 + 2     = 6  (read + write)
r + x     = 4 + 1     = 5  (read + execute)
r         = 4         = 4  (read only)
w + x     = 2 + 1     = 3  (write + execute)
w         = 2         = 2  (write only - rare)
x         = 1         = 1  (execute only)
          = 0         = 0  (no permission)
```

### 3. 3-Digit Structure

**Format: `chmod ABC file`**
- **A** = owner permissions (user)
- **B** = group permissions (group)  
- **C** = others permissions (others)

### 4. Detailed Examples

#### `chmod 755`
- **7** (owner) = 4+2+1 = rwx (read, write, execute)
- **5** (group) = 4+1 = r-x (read, execute)
- **5** (others) = 4+1 = r-x (read, execute)
- **Result**: `rwxr-xr-x`

#### `chmod 644`  
- **6** (owner) = 4+2 = rw- (read, write)
- **4** (group) = 4 = r-- (read only)
- **4** (others) = 4 = r-- (read only)
- **Result**: `rw-r--r--`

#### `chmod 600`
- **6** (owner) = 4+2 = rw- (read, write)
- **0** (group) = 0 = --- (no permission)
- **0** (others) = 0 = --- (no permission)
- **Result**: `rw-------`

#### `chmod 777`
- **7** (owner) = 4+2+1 = rwx
- **7** (group) = 4+2+1 = rwx  
- **7** (others) = 4+2+1 = rwx
- **Result**: `rwxrwxrwx` (all rights for everyone)

### 5. Special Permissions (4th digit)

We can add a 4th prefix digit for special permissions:

```
4000 = SetUID (s on owner)
2000 = SetGID (s on group)  
1000 = Sticky bit (t on others)
```

#### Examples with 4 digits:

#### `chmod 4755` (SetUID)
- **4** = SetUID enabled
- **7** (owner) = rwx but displayed as `rws`
- **5** (group) = r-x
- **5** (others) = r-x
- **Result**: `rwsr-xr-x`

#### `chmod 2755` (SetGID)
- **2** = SetGID enabled
- **7** (owner) = rwx
- **5** (group) = r-x but displayed as `r-s`
- **5** (others) = r-x
- **Result**: `rwxr-sr-x`

#### `chmod 1755` (Sticky bit)
- **1** = Sticky bit enabled
- **7** (owner) = rwx
- **5** (group) = r-x
- **5** (others) = r-x but displayed as `r-t`
- **Result**: `rwxr-xr-t`

### 6. Special Permission Combinations

```bash
chmod 6755  # SetUID + SetGID = rwsr-sr-x
chmod 7755  # SetUID + SetGID + Sticky = rwsr-sr-t
```

### 7. Quick Reference Table

| Octal | Binary | Permissions | Description |
|-------|---------|-------------|-------------|
| 0 | 000 | --- | None |
| 1 | 001 | --x | Execute only |
| 2 | 010 | -w- | Write only |
| 3 | 011 | -wx | Write + Execute |
| 4 | 100 | r-- | Read only |
| 5 | 101 | r-x | Read + Execute |
| 6 | 110 | rw- | Read + Write |
| 7 | 111 | rwx | All permissions |

### 8. Common Use Cases

```bash
chmod 755  # Standard executable (rwxr-xr-x)
chmod 644  # Data file (rw-r--r--)
chmod 600  # Private file (rw-------)
chmod 700  # Private directory (rwx------)
chmod 666  # File modifiable by all (rw-rw-rw-)
chmod 777  # Full access (rwxrwxrwx) - DANGEROUS
chmod 000  # No access (---------)
```

The octal system allows compact and precise notation of permissions, very practical for system administration.