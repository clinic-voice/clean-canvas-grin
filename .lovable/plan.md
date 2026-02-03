

# WhatsApp Integration Page

This plan outlines the implementation of a WhatsApp integration page for patient communication and automated reminders, following the existing design patterns and component architecture.

## Overview

The WhatsApp page will serve as a communication hub for clinics to manage patient messages, send appointment reminders, and automate follow-up communications. It will integrate seamlessly with the existing dashboard design system.

## Page Structure

```text
+------------------------------------------------------------------+
|  WhatsApp Integration                                             |
|  Manage patient communications and automated reminders            |
+------------------------------------------------------------------+
|                                                                   |
|  [Stats Grid - 4 columns]                                        |
|  +------------+ +------------+ +------------+ +------------+      |
|  | Messages   | | Delivered  | | Response   | | Templates  |      |
|  | Today: 156 | | Rate: 98%  | | Rate: 78%  | | Active: 12 |      |
|  +------------+ +------------+ +------------+ +------------+      |
|                                                                   |
|  +---------------------------+  +---------------------------+     |
|  | Recent Conversations      |  | Quick Actions             |     |
|  | - Patient chat list       |  | - Send Reminder           |     |
|  | - Message preview         |  | - Broadcast Message       |     |
|  | - Status indicators       |  | - Schedule Campaign       |     |
|  +---------------------------+  +---------------------------+     |
|                                                                   |
|  +---------------------------+  +---------------------------+     |
|  | Automated Reminders       |  | Message Templates         |     |
|  | - Appointment reminders   |  | - Predefined templates    |     |
|  | - Follow-up messages      |  | - Multi-language support  |     |
|  | - Payment reminders       |  | - Quick send actions      |     |
|  +---------------------------+  +---------------------------+     |
|                                                                   |
+------------------------------------------------------------------+
```

## Features

### 1. Stats Overview
- Messages sent today with trend indicator
- Delivery rate percentage
- Response rate from patients
- Active message templates count

### 2. Recent Conversations
- List of recent patient chats with avatars
- Last message preview
- Read/unread status indicators
- Quick reply action buttons

### 3. Quick Actions Panel
- Send appointment reminders button
- Broadcast message to patient groups
- Schedule campaign for later
- View analytics link

### 4. Automated Reminders Section
- Toggle switches for reminder types (appointment, follow-up, payment)
- Time configuration (24h, 48h, 1 week before)
- Enable/disable automation

### 5. Message Templates
- Pre-built templates in Tamil and English
- Categories: Appointments, Payments, Follow-ups, General
- Quick send functionality
- Template preview

## Mock Data

The page will include realistic mock data for:
- 6 recent patient conversations
- 4 message templates (bilingual Tamil/English)
- Reminder automation settings
- Stats metrics

---

## Technical Details

### Files to Create
1. `src/pages/WhatsApp.tsx` - Main page component

### Files to Modify
1. `src/App.tsx` - Add lazy import and route for `/whatsapp`

### Component Dependencies
- `DashboardLayout` for consistent page structure
- `Button` from UI components
- `Switch` from Radix UI for toggles
- `cn` utility for conditional styling
- Lucide icons: `MessageSquare`, `Send`, `Bell`, `Clock`, `CheckCircle2`, `Users`, `FileText`, `Settings`, `TrendingUp`, `MoreVertical`

### Design System
- Uses existing ClinicVoice color variables (`cv-primary`, `cv-success`, `cv-warning`, etc.)
- Consistent card styling with `rounded-xl bg-card border border-border`
- Responsive grid: `grid-cols-2 lg:grid-cols-4` for stats
- Status badges with semantic colors

### Routing
- Path: `/whatsapp`
- Protected route (requires authentication)
- Lazy-loaded for performance

