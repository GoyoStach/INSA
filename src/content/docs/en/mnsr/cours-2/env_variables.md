---
title: Environment Variables
description: "Interest and use of environment variables"
---

Environment variables are named values stored by the operating system and accessible to running programs. They constitute a fundamental mechanism for configuring application and system behavior.

## Main Interests and Utilities

**Centralized Configuration**: Environment variables allow centralizing configuration without modifying application code. A program can adapt its behavior according to these values (language, working directories, debug options).

**Portability**: They facilitate application deployment across different environments (development, test, production) by simply changing variable values rather than source code.

**Security**: Sensitive information like API keys or passwords can be stored in environment variables rather than directly in code, reducing exposure risks.

**Inter-process Communication**: Child processes inherit variables from their parent process, enabling configuration information transmission.

**User Customization**: Each user can have their own environment variables to customize their system experience.

## Differences between Unix/Linux and Windows

### Syntax and Access

**Unix/Linux** uses `$VARIABLE` or `${VARIABLE}` notation:
- Display: `echo $HOME` or `printenv HOME`
- Temporary definition: `export EDITOR=vim`
- Definition in script: `MY_VAR="value"`

**Windows** uses `%VARIABLE%` notation:
- Display: `echo %USERPROFILE%` or `set VARIABLE`
- Temporary definition: `set EDITOR=notepad`
- Permanent definition: via GUI or `setx`

### Storage and Persistence

**Unix/Linux**:
- Temporary variables: defined in current session
- Persistent variables: stored in files like `.bashrc`, `.profile`, `/etc/environment`
- Scope: shell session, user, or system depending on configuration file

**Windows**:
- User variables: stored in registry (HKEY_CURRENT_USER)
- System variables: stored in registry (HKEY_LOCAL_MACHINE)
- Integrated GUI for management via "Environment Variables"

### Case Sensitivity

**Unix/Linux**: Variable names are case-sensitive (`PATH` ≠ `path`)
**Windows**: Case-insensitive (`PATH` = `Path` = `path`)

## Common Variables

### System Variables
- **PATH**: Executable search directories
- **HOME** (Unix) / **USERPROFILE** (Windows): User home directory
- **TEMP** / **TMP**: Temporary directory
- **USER** (Unix) / **USERNAME** (Windows): Current user name

### Application Variables
- **EDITOR**: Default text editor
- **BROWSER**: Default web browser
- **LANG**: System language
- **HTTP_PROXY**: Proxy server configuration

## Best Practices

1. **Use descriptive names** for custom variables
2. **Document variable usage** in applications
3. **Validate variable values** before using them
4. **Use secure storage** for sensitive information
5. **Avoid hardcoding** paths and configurations
6. **Test across environments** to ensure consistency