# CivitAI Model Creator - Chrome Extension

A Chrome extension that allows you to create CivitAI models directly from your browser using your authenticated session.

## Features

- ✅ **Two modes**: Form-based or JSON-based model creation
- ✅ **Auto-authentication**: Uses your existing CivitAI browser session (no API key needed)
- ✅ **Auto-detection**: Automatically detects your user ID from your session
- ✅ **Opens in new tab**: Automatically opens the model wizard in a new tab after creation
- ✅ **Responsive layout**: Adapts to larger windows without unnecessary scrollbars
- ✅ **Form validation**: Helps you fill in all required fields correctly
- ✅ **JSON import**: Paste existing payloads and edit them easily

---

## Installation

1. **Download/Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable "Developer mode"** (toggle in the top right corner)
4. **Click "Load unpacked"**
5. **Select** the `chrome-extension` folder
6. **Done!** The extension icon will appear in your Chrome toolbar

---

## Usage

### Quick Start

1. **Click the extension icon** - Opens the extension popup
2. **Choose your mode**:
   - **Form Tab**: Fill in the form fields
   - **JSON Tab**: Paste a JSON payload
3. **Click "Create Model"**
4. **New tab opens** with your model wizard at step 2

---

## Form Tab - Field Reference

All form fields map directly to the CivitAI API payload structure. Here's how each field maps:

### Basic Information

| Form Field | Payload Path | Description | Example |
|------------|--------------|-------------|---------|
| **Model Name** | `json.name` | The name of your model | `"pokedex lora (Pokedex #001) [Illustrious]"` |
| **Description** | `json.description` | HTML description of your model | `"<p>Follow me on X/Twitter...</p>"` |
| **Type** | `json.type` | Model type | `"LORA"`, `"Checkpoint"`, etc. |

### Permissions & Settings

| Form Field | Payload Path | Description |
|------------|--------------|-------------|
| **Allow No Credit** | `json.allowNoCredit` | Users can use without crediting you |
| **Allow Derivatives** | `json.allowDerivatives` | Users can create derivative works |
| **Allow Different License** | `json.allowDifferentLicense` | Derivatives can have different licenses |
| **NSFW** | `json.nsfw` | Model contains mature content |
| **Require Auth** | `json.version.requireAuth` | Users must be logged in to download |

### Commercial Use

Checkboxes that map to `json.allowCommercialUse` array:

| Form Field | Array Value | Description |
|------------|-------------|-------------|
| **Image** | `"Image"` | Can be used commercially for image generation |
| **Rent on CivitAI** | `"RentCivit"` | Can be rented on CivitAI |
| **Rent** | `"Rent"` | Can be rented elsewhere |

**Example payload:**
```json
"allowCommercialUse": ["Image", "RentCivit", "Rent"]
```

### Tags

| Form Field | Payload Path | Description | Example |
|------------|--------------|-------------|---------|
| **Tags (comma-separated)** | `json.tagsOnModels` | Model tags/keywords | `"anime, pokemon, nintendo"` |

**Converts to:**
```json
"tagsOnModels": [
  {"name": "anime", "isCategory": false},
  {"name": "pokemon", "isCategory": false},
  {"name": "nintendo", "isCategory": false}
]
```

### Advanced IDs

| Form Field | Payload Path | Description | Notes |
|------------|--------------|-------------|-------|
| **Template ID** | `json.templateId` | Model template | Optional - Auto-populates base model on step 2 |
| **Showcase Collection ID** | `json.meta.showcaseCollectionId` | Collection to showcase in | Optional |

**Note:** User ID is hidden and automatically detected from your session.

### Hidden Fields (Hardcoded)

These fields are set automatically and cannot be changed:

| Payload Path | Value | Description |
|--------------|-------|-------------|
| `json.uploadType` | `"Created"` | Type of upload |
| `json.status` | `"Draft"` | Initial status (always draft) |
| `json.checkpointType` | `null` | Not used for LORA models |
| `json.minor` | `false` | Not a minor/child |
| `json.sfwOnly` | `false` | Not SFW-only restricted |
| `json.poi` | `false` | Not a person of interest |
| `json.authed` | `true` | Authenticated request |
| `json.version.baseModelType` | `"Standard"` | Model variant type |
| `json.version.settings` | `{}` | Custom settings |
| `json.version.monetization` | `null` | No monetization |
| `json.version.clipSkip` | `null` | Default clip skip |
| `json.meta.commentsLocked` | `false` | Comments enabled |
| `json.bountyId` | `null` | Not linked to bounty |
| `meta.values.bountyId` | `["undefined"]` | Bounty metadata |

---

## JSON Tab - Direct Payload Mode

### Using Existing Payloads

1. **Switch to JSON Tab**
2. **Paste your complete payload** (like the one in `notes/payload.json`)
3. **Choose an action**:
   - **Load to Form**: Populates form fields (except User ID which stays auto-detected)
   - **Create Model from JSON**: Creates model directly from JSON

### Important: User ID Override

⚠️ **The extension automatically replaces `json.userId` with your session user ID**, regardless of what's in the JSON payload. This ensures you always create models under your own account.

### Example Payload Structure

```json
{
  "json": {
    "allowNoCredit": true,
    "allowCommercialUse": ["Image", "RentCivit", "Rent"],
    "allowDerivatives": false,
    "allowDifferentLicense": false,
    "name": "My Awesome LORA [Illustrious]",
    "description": "<p>Model description with HTML</p>",
    "type": "LORA",
    "uploadType": "Created",
    "status": "Draft",
    "checkpointType": null,
    "nsfw": false,
    "minor": false,
    "sfwOnly": false,
    "meta": {
      "showcaseCollectionId": 23688,
      "commentsLocked": false
    },
    "userId": 131273,
    "version": {
      "baseModel": "Illustrious",
      "baseModelType": "Standard",
      "settings": {},
      "monetization": null,
      "requireAuth": true,
      "clipSkip": null
    },
    "tagsOnModels": [
      {"id": 4, "name": "anime", "isCategory": false}
    ],
    "templateId": 2176219,
    "bountyId": null,
    "poi": false,
    "authed": true
  },
  "meta": {
    "values": {
      "bountyId": ["undefined"]
    }
  }
}
```

---

## Workflow Examples

### Example 1: Create from Form

1. Click extension icon
2. Fill in fields:
   - Model Name: `"bulbasaur lora [Illustrious]"`
   - Description: `"<p>A LORA for generating Bulbasaur</p>"`
   - Type: `LORA`
   - Tags: `"pokemon, grass type, bulbasaur"`
   - Check: Allow No Credit, Image, RentCivit, Rent
   - Template ID: `2176219` (optional, auto-populates base model on step 2)
3. Click "Create Model on CivitAI"
4. New tab opens with model wizard at step 2
5. Continue adding version files and images in the wizard

### Example 2: Import and Edit

1. Click extension icon
2. Switch to JSON Tab
3. Paste your existing payload from `notes/payload.json`
3. Click "Load to Form"
4. Switch to Form Tab
5. Edit any fields (name, tags, permissions, etc.)
6. Click "Create Model on CivitAI"
7. Model wizard opens in new tab

### Example 3: Quick JSON Creation

1. Click extension icon
2. Switch to JSON Tab
3. Paste complete payload
4. Click "Create Model from JSON" (skips form entirely)
5. Model wizard opens in new tab

---

## After Model Creation

When you click "Create Model", the extension:

1. ✅ Validates your input
2. ✅ Sends API request to CivitAI
3. ✅ Receives model ID in response
4. ✅ Opens new tab to: `https://civitai.com/models/{model_id}/wizard?templateId={template_id}&step=2`

You'll land on **Step 2 of the wizard** where you can:
- Add model version files
- Upload showcase images
- Set version-specific settings

---

## Troubleshooting

### Extension doesn't open
- Make sure you're on Chrome (not Firefox/Safari)
- Reload the extension at `chrome://extensions/`

### "User ID" shows default value
- Make sure you're logged into civitai.com
- Refresh the extension popup
- Check if you have cookie permissions

### Model creation fails
- Verify you're logged into CivitAI in the same browser
- Check browser console (Right-click popup → Inspect → Console)
- Ensure all required fields are filled
- Try reloading CivitAI and the extension

### Wrong user ID detected
- Log out and log back in to CivitAI
- Clear cookies for civitai.com
- Reload the extension

---

## Field Validation Rules

### Required Fields
- **Model Name**: Cannot be empty
- **Type**: Must select a valid type

### Optional Fields
- **Description**: Can be empty (HTML allowed)
- **Tags**: Can be empty
- **All checkboxes**: Default to unchecked/false

### Auto-Populated Data
- **User ID**: Fetched from `/api/v1/me` endpoint

---

## Technical Details

### API Endpoints Used

1. **Model Creation**: `POST https://civitai.com/api/trpc/model.upsert`
2. **User Info**: `GET https://civitai.com/api/v1/me`

### Authentication

Uses browser cookies (`credentials: 'include'` in fetch) - specifically the `__Secure-civitai-token` cookie from your authenticated session.

### Headers Sent

```javascript
{
  'Content-Type': 'application/json',
  'x-client': 'web',
  'x-client-date': timestamp.toString(),
  'x-client-version': '5.0.1279'
}
```

---

## File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── background.js          # Opens extension as popup
├── popup.html             # Extension UI (form + JSON tabs)
├── popup.css              # Extension styles
├── popup.js               # Extension logic
├── constants.js           # UI strings and configuration
├── icon16.png             # Extension icon (16x16)
├── icon48.png             # Extension icon (48x48)
├── icon128.png            # Extension icon (128x128)
├── INSTALL.md             # Installation guide
└── README.md              # This file
```

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the browser console for errors
3. Verify your CivitAI session is active
4. Test with the JSON payload in `notes/payload.json`

---

## Version History

- **v1.0.0** - Initial release
  - Form and JSON modes
  - Auto user ID detection
  - Opens model wizard in new tab
  - Responsive layout that adapts to window size
  - Template and collection ID support
  - Separated CSS for maintainability

---

Happy model creating! 🎨✨
