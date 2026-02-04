

# Message Template Editor Implementation Plan

## Overview
Create a full-featured message template editor with variable support for patient communications. The editor will allow clinic staff to create, edit, and preview bilingual (Tamil/English) message templates with dynamic variables like patient name, appointment time, and doctor name.

## Features

### Core Functionality
- **Create new templates** with name, category, and bilingual content
- **Edit existing templates** with a user-friendly modal interface
- **Variable insertion** via clickable chips for easy placeholder addition
- **Live preview** showing how the message will look with sample data
- **Category management** for organizing templates (Appointments, Billing, Follow-up, General)

### Supported Variables
| Variable | Description | Example Value |
|----------|-------------|---------------|
| `{patient_name}` | Patient's full name | Priya Lakshmi |
| `{appointment_date}` | Appointment date | 15th January 2026 |
| `{appointment_time}` | Appointment time | 10:30 AM |
| `{doctor_name}` | Doctor's name | Dr. Ramesh Kumar |
| `{clinic_name}` | Clinic name | ClinicVoice Healthcare |
| `{amount}` | Payment amount | ₹1,500 |
| `{phone}` | Clinic phone | +91 98765 43210 |

---

## Technical Approach

### New Component
**`src/components/clinicvoice/TemplateEditor.tsx`**

A modal-based editor component with:
- Template name and category inputs
- Dual textarea for Tamil and English content
- Variable insertion toolbar with clickable chips
- Live preview panel with sample data substitution
- Form validation before saving

### WhatsApp Page Updates
**`src/pages/WhatsApp.tsx`**

- Add state management for templates (create, edit, delete)
- Connect "Create Template" and "Edit" buttons to the editor modal
- Add delete confirmation dialog
- Implement template persistence (local state initially, can extend to database)

### UI Components Used
- `Dialog` - Modal container
- `Input` - Template name field
- `Textarea` - Message content fields
- `Select` - Category dropdown
- `Badge` - Variable chips
- `Tabs` - Switch between Edit and Preview modes
- `Button` - Actions and variable insertion

---

## Component Structure

```text
TemplateEditor (Dialog Modal)
├── DialogHeader
│   └── Title: "Create Template" / "Edit Template"
├── DialogContent
│   ├── Template Details Section
│   │   ├── Name Input
│   │   └── Category Select
│   ├── Variables Toolbar
│   │   └── Clickable Badge chips for each variable
│   ├── Tabs (Edit / Preview)
│   │   ├── Edit Tab
│   │   │   ├── Tamil Textarea
│   │   │   └── English Textarea
│   │   └── Preview Tab
│   │       ├── Tamil Preview (with substituted values)
│   │       └── English Preview (with substituted values)
│   └── DialogFooter
│       ├── Cancel Button
│       └── Save Button
```

---

## User Flow

1. **Create New Template**
   - Click "Create Template" button
   - Modal opens with empty fields
   - Enter template name and select category
   - Click variable chips to insert placeholders at cursor
   - Write Tamil and English messages
   - Switch to Preview tab to see sample output
   - Click Save to add template

2. **Edit Existing Template**
   - Click "Edit" button on any template card
   - Modal opens with pre-filled data
   - Make changes and preview
   - Save updates

3. **Variable Insertion**
   - Position cursor in Tamil or English textarea
   - Click a variable chip (e.g., "Patient Name")
   - Variable placeholder `{patient_name}` inserted at cursor position

---

## Implementation Steps

1. **Create TemplateEditor component**
   - Build the modal structure with form fields
   - Implement variable insertion logic with cursor tracking
   - Add preview mode with sample data substitution
   - Include form validation

2. **Update WhatsApp page**
   - Convert static templates array to React state
   - Add modal trigger states (open/close, selected template)
   - Wire up Create/Edit buttons to open the editor
   - Handle save/update callbacks

3. **Add delete functionality**
   - Add delete option in template card menu
   - Confirm deletion with alert dialog

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/clinicvoice/TemplateEditor.tsx` | Create | New template editor modal component |
| `src/pages/WhatsApp.tsx` | Modify | Add state management and connect editor |

