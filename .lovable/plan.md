

# WhatsApp Business API Integration

This plan covers creating a backend function to send WhatsApp messages to patients, along with UI integration for real-time messaging capabilities.

## Overview

The integration will use the WhatsApp Business API (Cloud API) to send messages. This requires:
1. Setting up API credentials (Phone Number ID and Access Token)
2. Creating a backend function to handle the API calls securely
3. Adding a database table to log message history
4. Updating the WhatsApp page UI to send real messages

## Architecture

```text
+------------------+       +---------------------+       +------------------+
|   WhatsApp Page  | ----> |  Backend Function   | ----> |  WhatsApp Cloud  |
|   (React UI)     |       |  send-whatsapp-msg  |       |      API         |
+------------------+       +---------------------+       +------------------+
         |                          |
         |                          v
         |                 +------------------+
         +---------------> |  message_logs    |
                           |  (Database)      |
                           +------------------+
```

## Implementation Steps

### Step 1: Add WhatsApp API Credentials

You'll need to provide two secret values from your Meta/WhatsApp Business account:
- **WHATSAPP_PHONE_NUMBER_ID** - Your WhatsApp Business phone number ID
- **WHATSAPP_ACCESS_TOKEN** - Your access token from Meta Developer Console

### Step 2: Create Message Logs Table

A new database table to track all sent messages:
- `id` - Unique identifier
- `user_id` - References the authenticated user
- `recipient_phone` - Patient phone number
- `message_content` - Text sent
- `template_used` - Which template was used (optional)
- `status` - sent/delivered/failed
- `sent_at` - Timestamp
- `whatsapp_message_id` - ID returned by WhatsApp API

### Step 3: Create Backend Function

A new function at `supabase/functions/send-whatsapp-message/index.ts` that:
- Validates the request (recipient phone, message content)
- Calls the WhatsApp Cloud API
- Logs the result to the database
- Returns success/failure status

### Step 4: Update WhatsApp Page

Enhance the existing page with:
- A "Send Message" dialog for composing messages
- Phone number input with validation
- Template selection with variable substitution
- Real-time feedback on message status
- Display of message history from the database

### Step 5: Create React Hook

A custom hook `useWhatsAppMessages` to:
- Send messages via the backend function
- Fetch message history
- Handle loading/error states

---

## Technical Details

### Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/send-whatsapp-message/index.ts` | Backend function for WhatsApp API |
| `src/hooks/useWhatsAppMessages.ts` | React hook for messaging operations |
| `src/components/clinicvoice/SendMessageDialog.tsx` | UI dialog for composing messages |

### Files to Modify

| File | Changes |
|------|---------|
| `supabase/config.toml` | Add function configuration |
| `src/pages/WhatsApp.tsx` | Integrate send dialog and real message history |

### Database Migration

```sql
-- Create message_logs table for tracking WhatsApp messages
CREATE TABLE public.message_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipient_phone TEXT NOT NULL,
  recipient_name TEXT,
  message_content TEXT NOT NULL,
  template_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  whatsapp_message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.message_logs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own message logs
CREATE POLICY "Users can view own message logs"
  ON public.message_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own message logs"
  ON public.message_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Backend Function Structure

The function will:
1. Parse the incoming request for phone number and message
2. Validate the phone number format (Indian mobile numbers)
3. Call WhatsApp Cloud API at `https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages`
4. Store the result in `message_logs` table
5. Return appropriate success/error response

### Prerequisites

Before implementation, you'll need to:
1. Create a Meta Developer account at developers.facebook.com
2. Set up a WhatsApp Business account
3. Get your Phone Number ID from the WhatsApp Business settings
4. Generate a permanent access token

### Security Considerations

- All API credentials stored as backend secrets (never exposed to frontend)
- RLS policies ensure users only see their own message logs
- Phone number validation prevents invalid API calls
- Rate limiting can be added to prevent abuse

