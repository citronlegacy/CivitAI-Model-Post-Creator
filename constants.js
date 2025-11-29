// UI Constants - All user-facing strings in one place for easy editing

export const UI_STRINGS = {
  // Extension Title
  TITLE: '🍋 CivitAI Model Creator',
  
  // Tab Names
  TAB_FORM: 'Form',
  TAB_JSON: 'JSON',
  
  // Form Labels
  LABEL_MODEL_NAME: 'Model Name *',
  LABEL_DESCRIPTION: 'Description',
  LABEL_TYPE: 'Type *',
  LABEL_ALLOW_NO_CREDIT: 'Use without crediting me',
  LABEL_ALLOW_DERIVATIVES: 'Share merges of this model',
  LABEL_ALLOW_DIFFERENT_LICENSE: 'Use different permissions on merges',
  LABEL_NSFW: 'Is intended to produce mature themes',
  LABEL_REQUIRE_AUTH: 'Require Auth',
  LABEL_COMMERCIAL_USE: 'Commercial Use',
  LABEL_COMMERCIAL_IMAGE: 'Sell generated images',
  LABEL_COMMERCIAL_RENT_CIVIT: 'Use on Civitai generation service',
  LABEL_COMMERCIAL_RENT: 'Use on other generation services',
  LABEL_TAGS: 'Tags (comma-separated)',
  LABEL_TEMPLATE_ID: 'Template ID',
  LABEL_SHOWCASE_COLLECTION_ID: 'Showcase Collection ID',
  LABEL_USER_ID: 'User ID (auto-detected)',
  
  // Placeholders
  PLACEHOLDER_TAGS: 'anime, pokemon, nintendo',
  PLACEHOLDER_JSON: 'Paste your model payload JSON here...',
  
  // Buttons
  BUTTON_CREATE_MODEL: 'Create Model on CivitAI',
  BUTTON_LOAD_FROM_JSON: 'Load to Form',
  BUTTON_CREATE_FROM_JSON: 'Create Model from JSON',
  
  // Help Text
  HELP_TEXT_JSON: 'Paste your JSON payload below, then click "Load to Form" to populate the form fields.',
  HELP_TEXT_TAGS: 'Enter tag names separated by commas',
  HELP_TEXT_TEMPLATE_ID: 'Use a template ID to auto populate base model field on the step 2 page.',
  
  // Status Messages
  STATUS_CREATING: 'Creating model on CivitAI...',
  STATUS_SUCCESS: '✅ Success! Model created with ID: {modelId}. Opening in new window...',
  STATUS_SUCCESS_GENERIC: '✅ Request completed!',
  STATUS_ERROR: '❌ Error: {error}. Make sure you\'re logged into CivitAI.',
  STATUS_INVALID_JSON: 'Invalid JSON: {error}',
  STATUS_EMPTY_PAYLOAD: 'Please paste your JSON payload first!',
  STATUS_EMPTY_JSON: 'Please paste your JSON payload first!',
  STATUS_LOADED_TO_FORM: 'Payload loaded into form! You can now edit the fields.',
  
  // Model Types
  TYPE_LORA: 'LORA',
  TYPE_CHECKPOINT: 'Checkpoint',
  TYPE_TEXTUAL_INVERSION: 'Textual Inversion',
  TYPE_HYPERNETWORK: 'Hypernetwork',
  TYPE_AESTHETIC_GRADIENT: 'Aesthetic Gradient',
  TYPE_CONTROLNET: 'ControlNet',
  TYPE_POSES: 'Poses',
};

// Default Values
export const DEFAULTS = {
  UPLOAD_TYPE: 'Created',
  STATUS: 'Draft',
  TYPE: 'LORA',
};

// API Configuration
export const API = {
  CIVITAI_API_URL: 'https://civitai.com/api/trpc/model.upsert',
  CIVITAI_ME_URL: 'https://civitai.com/api/v1/me',
  MODEL_WIZARD_URL: 'https://civitai.com/models/{modelId}/wizard?templateId={templateId}&step=2',
};

// Client Headers
export const HEADERS = {
  CLIENT: 'web',
  CLIENT_VERSION: '5.0.1279',
};
