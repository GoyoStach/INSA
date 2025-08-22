---
title: Library Exercise
description: "Exercise to get familiar with groups and user creation"
---
# Exercise: Library Management System

## Phase 1: System Preparation

### Step 1.1: Group Creation
```bash
# Create the three main groups
sudo groupadd readers
sudo groupadd authors  
sudo groupadd librarians
```

```bash
# Verify creation
getent group | grep -E "(readers|authors|librarians)"
```

### Step 1.2: User Creation

#### Readers

Create your own user, put your name and choose a password (you can use an easy, non-secure password)

```bash
sudo useradd -m -s /bin/bash -G readers <username>
```

```bash
# Set passwords
sudo passwd <username>
```

#### Authors (with multiple groups)

Here you'll also need to add a password (mandatory), you can use the same one for all 3 authors
```bash
sudo useradd -m -s /bin/bash -G authors,readers victor_hugo
sudo useradd -m -s /bin/bash -G authors,readers jules_verne
sudo useradd -m -s /bin/bash -G authors,readers george_sand

# Passwords
sudo passwd victor_hugo
sudo passwd jules_verne  
sudo passwd george_sand
```

#### Librarians (administrative access)
```bash
sudo useradd -m -s /bin/bash -G librarians,authors,readers librarian

# Password
sudo passwd librarian
```

### Step 1.3: Directory Structure
We will now populate the directories for permissions.

```bash
# Create the library structure
sudo mkdir -p /library/{catalog,authors,administration}
sudo mkdir -p /library/catalog/{novels,poetry,theater}
sudo mkdir -p /library/authors/{victor_hugo,jules_verne,george_sand}
sudo mkdir -p /library/administration/{reports,management}
```

## Phase 2: Basic Permissions Configuration

### Step 2.1: Main Directory Properties
```bash
# Library root directory
sudo chown root:librarians /library
sudo chmod 755 /library

# Catalog (public reading)
sudo chown root:readers /library/catalog
sudo chmod 755 /library/catalog

# Author directories (specific to each author)
sudo chown victor_hugo:authors /library/authors/victor_hugo
sudo chown jules_verne:authors /library/authors/jules_verne  
sudo chown george_sand:authors /library/authors/george_sand
sudo chmod 755 /library/authors
sudo chmod 750 /library/authors/*
sudo chown root:authors /library/authors

# Administration (librarians only)
sudo chown root:librarians /library/administration
sudo chmod 770 /library/administration
```

### Step 2.2: Catalog Subdirectory Permissions
```bash
sudo chown root:readers /library/catalog/*
sudo chmod 755 /library/catalog/*
```

## Phase 3: Content Creation

### Step 3.1: Books in the Catalog
```bash
# Novels
sudo tee /library/catalog/novels/les_miserables.txt << 'EOF'
Les Misérables - Victor Hugo
Volume I: Fantine

As long as there shall exist, by virtue of law and custom, 
a social condemnation creating artificial hells in the midst of civilization, 
and complicating with human fatality a destiny that is divine...
EOF

sudo tee /library/catalog/novels/twenty_thousand_leagues.txt << 'EOF'
Twenty Thousand Leagues Under the Sea - Jules Verne
Chapter I: A Shifting Reef

The year 1866 was signalised by a remarkable incident, 
a mysterious and puzzling phenomenon, which doubtless no one has yet forgotten...
EOF

# Theater
sudo tee /library/catalog/theater/hernani.txt << 'EOF'
Hernani - Victor Hugo
Act I, Scene I

Could it be him already? Yes, it's at the hidden
Staircase... Quickly, let's open!
EOF

# Poetry
sudo tee /library/catalog/poetry/contemplations.txt << 'EOF'
Contemplations - Victor Hugo

She was barefoot, her hair was loose,
Sitting, feet bare, among the bending rushes...
EOF
```

### Step 3.2: Authors' Manuscripts (in their personal directories)
```bash
# Victor Hugo
sudo -u victor_hugo tee /library/authors/victor_hugo/new_novel.txt << 'EOF'
New novel project - Draft
Working title: "The Man Who Laughs"

Writing notes:
- Main character: Gwynplaine
- Period: England, late 17th century
EOF

# Jules Verne  
sudo -u jules_verne tee /library/authors/jules_verne/scientific_project.txt << 'EOF'
New project - Scientific adventure novel
Title: "From the Earth to the Moon"

Concept: Space travel using a giant cannon
Location: Baltimore, United States
EOF

# George Sand
sudo -u george_sand tee /library/authors/george_sand/pastoral_novel.txt << 'EOF'
New pastoral novel - George Sand
Title: "The Devil's Pool"

Characters:
- Germain, widowed plowman
- Marie, young shepherdess
EOF
```

**PROBLEM: All authors have the same rights and could therefore modify other authors' manuscripts. To remedy this, ACL provides more granularity**

## Phase 4: Advanced Permissions with ACL

### Step 4.1: Catalog (read access for all)
```bash
# All groups can read the catalog
sudo setfacl -R -m g:readers:r-x /library/catalog
sudo setfacl -R -m g:authors:r-x /library/catalog  
sudo setfacl -R -m g:librarians:rwx /library/catalog

# Default permissions for new files
sudo setfacl -d -m g:readers:r-x /library/catalog
sudo setfacl -d -m g:authors:r-x /library/catalog
sudo setfacl -d -m g:librarians:rwx /library/catalog
```

**Verification:**
```bash
ls -la /library/catalog
# Shows: drwxr-xr-x+ root root catalog
#        ↑ The "+" indicates ACL presence

getfacl /library/catalog
# user::rwx
# group::r-x  
# group:readers:r-x    ← New ACL rule
# mask::rwx
# other::r-x
```

### Step 4.2: Author Directories (personal access)
```bash
# Victor Hugo: full access to his directory, librarians and other authors only
sudo setfacl -R -m u:victor_hugo:rwx /library/authors/victor_hugo
sudo setfacl -R -m g:librarians:rwx /library/authors/victor_hugo
sudo setfacl -R -m g:authors:r-x /library/authors/victor_hugo
sudo setfacl -R -m g:readers:--- /library/authors/victor_hugo

# Jules Verne
sudo setfacl -R -m u:jules_verne:rwx /library/authors/jules_verne
sudo setfacl -R -m g:librarians:rwx /library/authors/jules_verne  
sudo setfacl -R -m g:authors:r-x /library/authors/jules_verne
sudo setfacl -R -m g:readers:--- /library/authors/jules_verne

# George Sand
sudo setfacl -R -m u:george_sand:rwx /library/authors/george_sand
sudo setfacl -R -m g:librarians:rwx /library/authors/george_sand
sudo setfacl -R -m g:authors:r-x /library/authors/george_sand
sudo setfacl -R -m g:readers:--- /library/authors/george_sand

# Parent authors directory - block access for readers
sudo setfacl -m g:readers:--- /library/authors
```

### Step 4.3: Administration (librarians only)
```bash
sudo setfacl -R -m g:librarians:rwx /library/administration
sudo setfacl -R -m g:authors:--- /library/administration
sudo setfacl -R -m g:readers:--- /library/administration
```

## Phase 5: Testing and Verification

### Test 1: Reader (That's you!)
```bash
# Log in as yourself!
su - <username>

# Tests to perform:
cd /library/catalog                    # ✓ Should work
cat novels/les_miserables.txt         # ✓ Should work  
cd /library/authors                    # ✗ Should fail (Permission denied)
ls /library/authors                    # ✗ Should fail (Permission denied)
cd /library/administration            # ✗ Should fail (Permission denied)
```

### Test 2: Author (victor_hugo)
```bash
# Log in as victor_hugo
su - victor_hugo

# Tests to perform:
cd /library/authors/victor_hugo          # ✓ Should work
echo "New chapter..." >> new_novel.txt  # ✓ Should work
cd /library/authors/jules_verne          # ✓ Read access (other authors)
cat scientific_project.txt              # ✓ Should work
echo "test" > /library/authors/jules_verne/test.txt  # ✗ Should fail
cd /library/administration              # ✗ Should fail
```

### Test 3: Librarian
```bash
# Log in as librarian
su - librarian

# Tests to perform:
cd /library/administration              # ✓ Should work
echo "Monthly report" > administration/reports/january.txt  # ✓ Should work
echo "New book" > catalog/novels/new_book.txt     # ✓ Should work
```

## Phase 6: Helper Scripts

### Permissions Verification Script
```bash
#!/bin/bash
# permission_check.sh

echo "=== Library Permissions Verification ==="
echo

echo "1. Directory structure:"
tree /library -d

echo -e "\n2. Detailed permissions:"
echo "Catalog:"
ls -la /library/catalog
getfacl /library/catalog/novels

echo -e "\nAuthor directories:"
ls -la /library/authors/
getfacl /library/authors/victor_hugo

echo -e "\nAdministration:"
ls -la /library/administration
getfacl /library/administration
```

## Bonus: Go Further!

- **Understanding**: Explain why authors are also in the readers group.
- **Analysis**: What happens if a reader tries to modify a file in the catalog?
- **Problem**: A new author emile_zola arrives. List all steps to integrate them.
- **Security**: Propose an improvement so each author can only see their own manuscripts.
- **Practice**: Create an archives directory accessible read-only to all, but modifiable only by librarians.

## Danger Zone

### Cleanup Script (to restart the exercise)
```bash
#!/bin/bash
# library_cleanup.sh

echo "Removing users and groups..."
for user in <username> victor_hugo jules_verne george_sand librarian; do
    sudo userdel -r $user 2>/dev/null
done

for group in readers authors librarians; do
    sudo groupdel $group 2>/dev/null  
done

echo "Removing directories..."
sudo rm -rf /library

echo "Cleanup complete. You can restart the exercise."
```