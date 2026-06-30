# Mexboard

<p align="center">
  <img width="395" alt="Mexboard UI in dark mode" src="https://github.com/user-attachments/assets/f6b9f0f2-8c25-4e06-a3a5-2cd4f13e131f" />
  <img width="395" alt="Mexboard UI in light mode" src="https://github.com/user-attachments/assets/900b5163-8d3a-4b50-b400-fae882ee2f8c" />
  <img width="376" alt="Gifs from KLIPY in Mexboard UI" src="https://github.com/user-attachments/assets/ccb6aaea-b20d-4cc1-85cb-c6e4f89b898e" />
</p>


**Mexboard** is a Clipboard Manager app built with **[Tauri](https://v2.tauri.app/)** for creators and developers. It works on **Linux** and **Windows**.

## Motivation
Many clipboard managers I used on Linux don't have features that I need i.e **keyboard shortcuts**, emojis and symbols selection, **sync clipboard across device**, and they don't have **nice UI**.

Mexboard is fast, have most features that I need, and have nice UI.

## Quick start
Download the latest version from [Releases](https://github.com/skuong/mexboard/releases) and install.

## 📖 Usage
### Linux
Run `mexboard show` or `mexboard show --tab=clipboards` to show clipboard list.

You can add the command to your system keymap.

Example:

- Super + v: mexboard show --tab=clipboards. Then you can open Mexboard window using Super + v.

Details for **Pop OS 24.04**:
Navigate to `Settings` > `Input devices` > `Keyboard` > `Keyboard shortcuts` > `Custom`, then click `Add shortcut`:

- Shortcut name: `Mexboard` (or whatever you like)
- Command: `mexboard show --tab=clipboards`
- Shortcut: `Super + v` (make sure there's no conflict)

### Windows
Run `C:\Users\[YOUR_USERNAME]\AppData\Local\Mexboard\mexboard.exe show` or `C:\Users\[YOUR_USERNAME]\AppData\Local\Mexboard\mexboard.exe show --tab=clipboards` in your Terminal or PowerShell to show clipboard list.

You can add the command to your system keymap. You can use [PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/).

Example:

- Win + Alt + V: C:\Users\sokhuong\AppData\Local\Mexboard\mexboard.exe show

or 

- Win + Alt + V: C:\Users\sokhuong\AppData\Local\Mexboard\mexboard.exe show --tab=clipboards

Details for **PowerToys**:
- Action: `Run Program`
- App: `C:\Users\[YOUR_USERNAME]\AppData\Local\Mexboard\mexboard.exe`
- Args: `show --tab=clipboards`
- Start in: `C:\Users\sokhuong\AppData\Local\Mexboard`
- Elevation: `Normal`
- If running: `Start another` (Mexboard will handle single instance so don't need to worry whether multiple app will be opened)
- Visibility: `Normal`

## Development

**Requirements:**

- [Pnpm](https://pnpm.io/) package manager
- [Tauri](https://tauri.app/) toolchain
- System dependencies for Tauri (see [Tauri documentation](https://tauri.app/v1/guides/getting-started/prerequisites))


### Install dependencies

```bash
pnpm i
```

### Run in development mode
```bash
pnpm tauri dev
```

### Build for production
```bash
pnpm tauri build
```
