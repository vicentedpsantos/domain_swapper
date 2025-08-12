# Domain Swapper Chrome Extension

A powerful Chrome extension that automatically redirects URLs from one domain to another based on your custom rules. Perfect for developers who need to seamlessly switch between production, staging, and local development environments without manually editing URLs.

![Domain Swapper Screenshot](./domain-swapper-screenshot.png)

## How It Works

Domain Swapper operates as a Chrome extension that monitors your browser navigation and automatically redirects URLs based on your configured rules. Here's the technical flow:

1. **Background Service Worker**: A persistent background script monitors all tab updates in your browser
2. **URL Matching**: When you navigate to any URL, the extension checks if it matches any of your configured "from" domains
3. **Automatic Redirection**: If a match is found and the swap is enabled, it instantly redirects to your specified "to" domain
4. **Smart Matching Modes**:
   - **Partial Match** (default): Redirects any URL containing your "from" domain (e.g., `example.com/path` → `localhost:3000/path`)
   - **Exact Match**: Only redirects if the URL exactly matches your "from" domain

### Example Use Cases

- **Development**: Redirect `https://production.com/api` → `http://localhost:3000/api`
- **Testing**: Redirect `https://app.example.com` → `https://staging.example.com`
- **Debugging**: Redirect `https://cdn.example.com/assets` → `http://localhost:8080/assets`

## Features

- ✅ Automatic domain swapping with instant redirection
- ✅ Master toggle to enable/disable all swapping
- ✅ Individual toggle for each swap rule
- ✅ Named swaps for easy organization
- ✅ Partial and exact URL matching modes
- ✅ Persistent storage synced across devices (Chrome Sync)
- ✅ Clean, modern interface
- ✅ No external dependencies or tracking

## Installation Guide

### Load as Unpacked Extension

1. **Download the Extension**
You can either download the extension from [here](https://github.com/vicentedpsantos/domain_swapper/archive/refs/heads/main.zip), or run the following command.
   ```bash
   # Clone via Git
   git clone https://github.com/your-username/domain_swapper.git
   ```

3. **Open Chrome Extension Management**
   - Open Google Chrome
   - Type `chrome://extensions/` in the address bar and press Enter
   - Alternatively: Menu (⋮) → More tools → Extensions

4. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner of the extensions page

5. **Load the Extension**
   - Click the "Load unpacked" button that appears
   - Navigate to and select the `domain_swapper` folder (the one containing `manifest.json`)
   - The extension should now appear in your extensions list

6. **Pin the Extension** (Optional but recommended)
   - Click the puzzle piece icon (🧩) in Chrome's toolbar
   - Find "Domain Swapper" and click the pin icon (📌)
   - The extension icon will now be visible in your toolbar

## Usage Guide

### Basic Setup

1. **Access the Extension**
   - Click the Domain Swapper icon in your Chrome toolbar
   - A popup window will appear with the extension interface

2. **Enable/Disable All Swapping**
   - Use the master "Enable Swapping" toggle at the top
   - When OFF: No redirections will occur
   - When ON: Active swap rules will be applied

### Managing Swap Rules

#### Adding a New Swap

1. Fill in the swap details:
   - **Swap name**: A descriptive name (e.g., "API to Local", "Prod to Dev")
   - **From domain**: The URL you want to redirect FROM
   - **To domain**: The URL you want to redirect TO
   - **Exact match**: Check for exact URL matching (unchecked = partial match)

2. Click "Add Swap" to save the rule

#### Example Configurations

| Name | From | To | Exact Match | Use Case |
|------|------|-----|-------------|----------|
| API to Local | https://api.prod.com | http://localhost:3001 | ❌ | Redirect all API calls to local server |
| Prod to Staging | https://app.example.com | https://staging.example.com | ✅ | Redirect only the exact homepage |
| CDN to Local | https://cdn.example.com/static | http://localhost:8080/static | ❌ | Serve static files locally |

#### Editing Swaps

1. Click "Edit" next to any swap
2. The swap details will populate in the form fields
3. Modify as needed and click "Add Swap" to save changes

#### Deleting Swaps

- Click "Delete" next to any swap to remove it permanently

#### Toggling Individual Swaps

- Use the checkbox next to each swap name to enable/disable it without deleting

### Advanced Usage

#### Partial vs Exact Matching

**Partial Match** (Default):
- From: `example.com`
- URL visited: `https://example.com/dashboard/users`
- Redirects to: `https://localhost:3000/dashboard/users`

**Exact Match**:
- From: `https://example.com`
- URL visited: `https://example.com` ✅ (redirects)
- URL visited: `https://example.com/page` ❌ (doesn't redirect)

## Troubleshooting

### Extension Not Working?

1. **Check Master Toggle**: Ensure "Enable Swapping" is ON
2. **Check Individual Toggles**: Verify the specific swap rule is enabled (checkbox checked)
3. **Verify URL Format**: Ensure your "from" domain matches the URL you're visiting
4. **Reload Extension**: 
   - Go to `chrome://extensions/`
   - Find Domain Swapper and click the refresh icon (🔄)
5. **Check Permissions**: The extension needs permissions for tabs and storage

### Common Issues

| Issue | Solution |
|-------|----------|
| Swaps not persisting | Check Chrome sync is enabled; try reloading the extension |
| Partial match not working | Don't include `https://` in partial match rules unless needed |
| Infinite redirect loop | Ensure your "to" domain doesn't match another "from" domain |
| Extension icon missing | Click the puzzle piece (🧩) icon and pin Domain Swapper |

### Debug Mode

To debug issues:
1. Right-click the extension icon and select "Inspect popup" for UI issues
2. Go to `chrome://extensions/` → Domain Swapper → "Service worker" link for background script logs

## Privacy & Security

- ✅ **No tracking**: This extension doesn't collect any user data
- ✅ **Local storage only**: All settings are stored locally in Chrome's sync storage
- ✅ **Open source**: Review the code to verify security
- ✅ **Minimal permissions**: Only requests necessary Chrome APIs (tabs, storage, activeTab)
