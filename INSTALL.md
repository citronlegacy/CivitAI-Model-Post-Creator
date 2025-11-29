# Chrome Extension Installation Guide

## 🚀 Quick Install (3 Steps)

### Step 1: Open Chrome Extensions Page
1. Open Chrome/Brave browser
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right)

### Step 2: Load the Extension
1. Click **"Load unpacked"** button
2. Navigate to: `/home/silver/code/civtiai_model_post/chrome-extension`
3. Click **"Select"**

### Step 3: You're Done!
- Extension icon will appear in your toolbar
- Click it to open the popup
- You're ready to create models!

---

## 📝 How to Use

### 1. Make Sure You're Logged In
- Go to https://civitai.com
- Log in to your account
- Keep CivitAI open in a tab

### 2. Open the Extension
- Click the extension icon in your toolbar
- Or go to `chrome://extensions/` and click "Details" → "Extension options"

### 3. Paste Your Payload
```json
{
  "json": {
    "name": "My Model",
    "description": "<p>Description</p>",
    "type": "LORA",
    "status": "Draft",
    ...
  }
}
```

### 4. Click "Create Model"
- Extension will use your browser session cookies
- No API key needed!
- Model will be created immediately

---

## ✅ How to Know It Worked

### Success Message
```
✅ Success! Model created with ID: 2176380
[View your model →]

Response: {
  "result": {
    "data": {
      "json": {
        "id": 2176380,
        ...
      }
    }
  }
}
```

### You'll See:
1. ✅ Green success message
2. 🔗 Clickable link to your model
3. 📊 Full response data
4. Model appears in your CivitAI dashboard

---

## ❌ Common Issues

### "Invalid JSON"
- Check your JSON syntax
- Use the example payload first to test
- Make sure all quotes are correct

### "Error: HTTP 401"
- You're not logged into CivitAI
- Open https://civitai.com and log in
- Try again

### "Error: HTTP 403"
- Your account may be restricted
- Check your CivitAI account status

### Extension Not Loading
- Make sure Developer mode is enabled
- Check that you selected the correct folder
- Reload the extension from `chrome://extensions/`

---

## 🎯 Full Workflow Example

```bash
# 1. Prepare your payload
cd /home/silver/code/civtiai_model_post
cat notes/payload.json

# 2. Install extension (one-time)
# - Open chrome://extensions/
# - Enable Developer mode
# - Load unpacked → select chrome-extension folder

# 3. Use the extension
# - Click extension icon
# - Paste payload JSON
# - Click "Create Model"
# - Done! ✅
```

---

## 📁 Extension Files

```
chrome-extension/
├── manifest.json    # Extension configuration
├── popup.html       # User interface
├── popup.js         # Main logic
├── icon16.png       # Small icon
├── icon48.png       # Medium icon
└── icon128.png      # Large icon
```

---

## 🔧 Development Tips

### Edit the Extension
1. Make changes to files in `chrome-extension/`
2. Go to `chrome://extensions/`
3. Click the reload icon (↻) on your extension
4. Changes take effect immediately

### View Console Logs
1. Right-click extension icon → "Inspect popup"
2. Or check the popup's DevTools for errors
3. `console.log()` statements will appear there

### Test with Example Payload
- Click "Load example from notes/payload.json" link
- This loads a test payload
- Edit it as needed
- Click "Create Model"

---

## 🎨 How It Works

1. **Extension popup opens** → Displays form
2. **User pastes JSON** → Saved to Chrome storage
3. **User clicks button** → Validates JSON
4. **Makes POST request** → To CivitAI API endpoint
5. **Uses browser cookies** → No API key needed!
6. **Displays result** → Success or error message

### Key Advantages
- ✅ Uses your existing browser session
- ✅ No API key configuration needed
- ✅ Same authentication as the website
- ✅ Works with any CivitAI account
- ✅ Simple copy/paste interface

---

## 🔒 Security Notes

- Extension only has access to civitai.com
- Uses your existing session cookies
- No data is sent anywhere except CivitAI
- Payload is stored locally in Chrome
- All code is visible and can be audited

---

## 📚 API Endpoint Details

The extension makes a POST request to:
```
https://civitai.com/api/trpc/model.upsert
```

With headers:
```
Content-Type: application/json
x-client: web
x-client-date: {timestamp}
x-client-version: 5.0.1279
credentials: include  (includes cookies)
```

---

## 🎉 Quick Test

1. Load extension
2. Click extension icon
3. Click "Load example from notes/payload.json"
4. Click "Create Model on CivitAI"
5. Check for success message!

---

## 🆘 Need Help?

- Check browser console for errors (F12)
- Make sure you're on civitai.com domain
- Verify you're logged in
- Try the example payload first
- Check `chrome://extensions/` for errors

---

## 🔄 Update the Extension

If you make changes to the code:

```bash
# Edit files
nano chrome-extension/popup.js

# Then in Chrome:
# 1. Go to chrome://extensions/
# 2. Click reload icon on the extension
# 3. Test your changes
```

No need to remove and re-add!
