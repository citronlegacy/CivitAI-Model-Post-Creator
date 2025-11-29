// CivitAI Model Creator Extension
import { UI_STRINGS, DEFAULTS, API, HEADERS } from './constants.js';

// Fetch current user ID from session
let currentUserId = null;

async function getCurrentUser() {
  if (currentUserId) return currentUserId;
  
  try {
    const response = await fetch(API.CIVITAI_ME_URL, {
      credentials: 'include'
    });
    
    if (response.ok) {
      const data = await response.json();
      currentUserId = data.id;
      // Auto-populate userId field
      document.getElementById('userId').value = currentUserId;
      return currentUserId;
    }
  } catch (error) {
    console.error('Failed to fetch current user:', error);
  }
  
  return null;
}

// Initialize UI with strings from constants
function initializeUI() {
  document.getElementById('appTitle').textContent = UI_STRINGS.TITLE;
  document.getElementById('tabForm').textContent = UI_STRINGS.TAB_FORM;
  document.getElementById('tabJson').textContent = UI_STRINGS.TAB_JSON;
  document.getElementById('jsonHelpText').textContent = UI_STRINGS.HELP_TEXT_JSON;
  document.getElementById('jsonPayload').placeholder = UI_STRINGS.PLACEHOLDER_JSON;
  document.getElementById('loadFromJson').textContent = UI_STRINGS.BUTTON_LOAD_FROM_JSON;
  document.getElementById('createFromJson').textContent = UI_STRINGS.BUTTON_CREATE_FROM_JSON;
  document.getElementById('createFromForm').textContent = UI_STRINGS.BUTTON_CREATE_MODEL;
  
  // Set checkbox labels
  document.getElementById('labelAllowNoCredit').textContent = UI_STRINGS.LABEL_ALLOW_NO_CREDIT;
  document.getElementById('labelAllowDerivatives').textContent = UI_STRINGS.LABEL_ALLOW_DERIVATIVES;
  document.getElementById('labelAllowDifferentLicense').textContent = UI_STRINGS.LABEL_ALLOW_DIFFERENT_LICENSE;
  document.getElementById('labelNsfw').textContent = UI_STRINGS.LABEL_NSFW;
  document.getElementById('labelRequireAuth').textContent = UI_STRINGS.LABEL_REQUIRE_AUTH;
  document.getElementById('labelCommercialUse').textContent = UI_STRINGS.LABEL_COMMERCIAL_USE;
  document.getElementById('labelCommercialImage').textContent = UI_STRINGS.LABEL_COMMERCIAL_IMAGE;
  document.getElementById('labelCommercialRentCivit').textContent = UI_STRINGS.LABEL_COMMERCIAL_RENT_CIVIT;
  document.getElementById('labelCommercialRent').textContent = UI_STRINGS.LABEL_COMMERCIAL_RENT;
  
  // Set help text
  document.getElementById('helpTemplateId').textContent = UI_STRINGS.HELP_TEXT_TEMPLATE_ID;
}

// Initialize on load
initializeUI();
getCurrentUser();

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.getAttribute('data-tab');
    
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${targetTab}-tab`).classList.add('active');
  });
});

// Form submission
document.getElementById('modelForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const payload = buildPayloadFromForm();
  await createModel(payload, 'formStatus');
});

// JSON tab: Create from JSON
document.getElementById('createFromJson').addEventListener('click', async () => {
  const jsonText = document.getElementById('jsonPayload').value.trim();
  
  if (!jsonText) {
    showStatus('jsonStatus', UI_STRINGS.STATUS_EMPTY_JSON, 'error');
    return;
  }
  
  try {
    const payload = JSON.parse(jsonText);
    
    // Replace userId with auto-detected one
    if (currentUserId) {
      payload.json.userId = currentUserId;
    }
    
    await createModel(payload, 'jsonStatus');
  } catch (e) {
    showStatus('jsonStatus', UI_STRINGS.STATUS_INVALID_JSON.replace('{error}', e.message), 'error');
  }
});

// JSON tab: Load to Form
document.getElementById('loadFromJson').addEventListener('click', () => {
  const jsonText = document.getElementById('jsonPayload').value.trim();
  
  if (!jsonText) {
    showStatus('jsonStatus', UI_STRINGS.STATUS_EMPTY_PAYLOAD, 'error');
    return;
  }
  
  try {
    const payload = JSON.parse(jsonText);
    populateFormFromPayload(payload);
    
    // Switch to form tab
    document.querySelector('.tab[data-tab="form"]').click();
    showStatus('formStatus', UI_STRINGS.STATUS_LOADED_TO_FORM, 'info');
  } catch (e) {
    showStatus('jsonStatus', UI_STRINGS.STATUS_INVALID_JSON.replace('{error}', e.message), 'error');
  }
});

// Build payload from form fields
function buildPayloadFromForm() {
  const commercialUse = [];
  if (document.getElementById('commercialImage').checked) commercialUse.push('Image');
  if (document.getElementById('commercialRentCivit').checked) commercialUse.push('RentCivit');
  if (document.getElementById('commercialRent').checked) commercialUse.push('Rent');
  
  // Parse tags
  const tagsText = document.getElementById('tags').value.trim();
  const tagsOnModels = tagsText ? tagsText.split(',').map(tag => ({
    name: tag.trim(),
    isCategory: false
  })) : [];
  
  const payload = {
    json: {
      allowNoCredit: document.getElementById('allowNoCredit').checked,
      allowCommercialUse: commercialUse,
      allowDerivatives: document.getElementById('allowDerivatives').checked,
      allowDifferentLicense: document.getElementById('allowDifferentLicense').checked,
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      type: document.getElementById('type').value,
      uploadType: document.getElementById('uploadType').value,
      status: document.getElementById('status').value,
      checkpointType: null,
      nsfw: document.getElementById('nsfw').checked,
      minor: false,
      sfwOnly: false,
      meta: {
        showcaseCollectionId: parseInt(document.getElementById('showcaseCollectionId').value) || null,
        commentsLocked: false
      },
      userId: parseInt(document.getElementById('userId').value),
      version: {
        baseModelType: 'Standard',
        settings: {},
        monetization: null,
        requireAuth: document.getElementById('requireAuth').checked,
        clipSkip: null
      },
      tagsOnModels: tagsOnModels,
      templateId: parseInt(document.getElementById('templateId').value) || null,
      bountyId: null,
      poi: false,
      authed: true
    },
    meta: {
      values: {
        bountyId: ['undefined']
      }
    }
  };
  
  return payload;
}

// Populate form from payload
function populateFormFromPayload(payload) {
  const data = payload.json;
  
  document.getElementById('name').value = data.name || '';
  document.getElementById('description').value = data.description || '';
  document.getElementById('type').value = data.type || DEFAULTS.TYPE;
  document.getElementById('uploadType').value = data.uploadType || DEFAULTS.UPLOAD_TYPE;
  document.getElementById('status').value = data.status || DEFAULTS.STATUS;
  
  document.getElementById('allowNoCredit').checked = data.allowNoCredit || false;
  document.getElementById('allowDerivatives').checked = data.allowDerivatives || false;
  document.getElementById('allowDifferentLicense').checked = data.allowDifferentLicense || false;
  document.getElementById('nsfw').checked = data.nsfw || false;
  
  // Commercial use
  if (data.allowCommercialUse) {
    document.getElementById('commercialImage').checked = data.allowCommercialUse.includes('Image');
    document.getElementById('commercialRentCivit').checked = data.allowCommercialUse.includes('RentCivit');
    document.getElementById('commercialRent').checked = data.allowCommercialUse.includes('Rent');
  }
  
  // Version fields
  if (data.version) {
    document.getElementById('requireAuth').checked = data.version.requireAuth || false;
  }
  
  // Tags
  if (data.tagsOnModels && data.tagsOnModels.length > 0) {
    const tagNames = data.tagsOnModels.map(tag => tag.name).join(', ');
    document.getElementById('tags').value = tagNames;
  }
  
  // IDs
  document.getElementById('templateId').value = data.templateId || '';
  document.getElementById('showcaseCollectionId').value = data.meta?.showcaseCollectionId || '';
  // DO NOT override userId - keep the auto-detected one
}

// Create model on CivitAI
async function createModel(payload, statusId) {
  const statusDiv = document.getElementById(statusId);
  const createBtn = document.getElementById('createFromJson');
  const formBtn = document.querySelector('#modelForm button[type="submit"]');
  
  // Disable buttons
  if (createBtn) createBtn.disabled = true;
  if (formBtn) formBtn.disabled = true;
  
  showStatus(statusId, UI_STRINGS.STATUS_CREATING, 'info');
  
  try {
    const timestamp = Date.now();
    
    const response = await fetch(API.CIVITAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client': HEADERS.CLIENT,
        'x-client-date': timestamp.toString(),
        'x-client-version': HEADERS.CLIENT_VERSION
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(responseData)}`);
    }
    
    const modelId = responseData?.result?.data?.json?.id;
    
    if (modelId) {
      const templateId = payload.json.templateId || '';
      const modelUrl = API.MODEL_WIZARD_URL
        .replace('{modelId}', modelId)
        .replace('{templateId}', templateId);
      
      // Open in new tab
      chrome.tabs.create({ url: modelUrl });
      
      showStatus(
        statusId,
        UI_STRINGS.STATUS_SUCCESS.replace('{modelId}', modelId),
        'success'
      );
    } else {
      showStatus(statusId, UI_STRINGS.STATUS_SUCCESS_GENERIC, 'success');
    }
    
  } catch (error) {
    console.error('Error creating model:', error);
    showStatus(
      statusId,
      UI_STRINGS.STATUS_ERROR.replace('{error}', error.message),
      'error'
    );
  } finally {
    // Re-enable buttons
    if (createBtn) createBtn.disabled = false;
    if (formBtn) formBtn.disabled = false;
  }
}

// Show status message
function showStatus(statusId, message, type) {
  const statusDiv = document.getElementById(statusId);
  statusDiv.className = `status ${type}`;
  statusDiv.textContent = message;
  statusDiv.style.display = 'block';
  
  if (type === 'info') {
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }
}

// Load saved JSON on startup
chrome.storage.local.get(['savedPayload'], (result) => {
  if (result.savedPayload) {
    document.getElementById('jsonPayload').value = result.savedPayload;
  }
});

// Save JSON when user types
document.getElementById('jsonPayload').addEventListener('input', () => {
  chrome.storage.local.set({ savedPayload: document.getElementById('jsonPayload').value });
});
