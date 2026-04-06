

## Premium Healthcare Redesign -- Full Application

This plan covers a complete visual redesign of the entire ClinicVoice AI application with a polished, professional healthcare SaaS aesthetic. No functionality changes -- purely visual.

### Design Direction
- **Color palette**: Shift from teal/blue to a refined healthcare palette -- deep navy primary, soft sage/mint accents, warm neutral backgrounds
- **Typography**: Tighter letter-spacing, larger headings, more whitespace between sections
- **Cards & surfaces**: Softer shadows, 1px borders with subtle tints, rounded-2xl corners
- **Spacing**: More generous padding, better visual hierarchy with clear content zones
- **Professional touches**: Refined status badges, polished avatars, clean data presentation

### Files to Update

**1. Theme & CSS (`src/index.css`)**
- New color palette: navy primary (#1e3a5f), sage accent (#4a9e7e), warm backgrounds (#fafbfc light, #0f1724 dark)
- Refined shadow system with warmer tones
- Updated gradient utilities (professional navy-to-sage instead of teal-to-blue)
- Improved selection colors and glass effects

**2. Landing Page (`src/pages/LandingPage.tsx`)**
- Cleaner hero with larger typography and more breathing room
- Professional feature cards with consistent icon styling
- Refined pricing section with better visual hierarchy
- Polished navigation bar with premium feel

**3. Auth Page (`src/pages/Auth.tsx`)**
- Left panel: refined branding with navy background, subtle geometric pattern
- Right panel: cleaner form layout, refined input styling, better spacing
- Professional trust indicators and social proof

**4. Dashboard Layout Components**
- `DashboardSidebar.tsx`: Refined nav items with smoother hover states, updated brand colors, polished section headers
- `DashboardHeader.tsx`: Cleaner header with refined search, updated avatar and button styling
- `DashboardLayout.tsx`: Updated background and spacing

**5. Dashboard Page (`src/pages/Dashboard.tsx`)**
- Welcome section with refined gradient and typography
- Stats cards with updated color accents matching new palette
- Cleaner appointment list with better spacing
- AI insights section with refined card styling

**6. Shared Components**
- `StatsCard.tsx`: Updated icon color scheme (navy, sage, slate, amber)
- `AppointmentRow.tsx`: Refined status badges and row styling
- `VoiceAIWidget.tsx`: Updated pulse colors and card styling
- `QuickActions.tsx`: Polished action buttons
- `PatientDetailSheet.tsx`: Updated tab and content styling

**7. Feature Pages**
- `Appointments.tsx`: Refined filters, calendar, and appointment cards
- `Patients.tsx`: Updated patient cards with cleaner layout
- `Analytics.tsx`, `Billing.tsx`, `Medications.tsx`, `WhatsApp.tsx`, `VoiceAI.tsx`: Consistent styling updates

### Technical Notes
- All changes use CSS custom properties and Tailwind classes -- no structural/logic changes
- Dark mode tokens updated in parallel
- Maintains all responsive breakpoints and mobile behavior
- Estimated ~12 files modified

