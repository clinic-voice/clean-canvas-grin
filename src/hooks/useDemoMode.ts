import { useMemo } from 'react';

const DEMO_USER_ID = 'demo-user-00000000-0000-0000-0000-000000000000';

export function useDemoMode() {
  const isDemoMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('demo') === 'true';
  }, []);

  return { isDemoMode, demoUserId: DEMO_USER_ID };
}

export function isDemoModeEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('demo') === 'true';
}

export const DEMO_USER = {
  id: DEMO_USER_ID,
  email: 'demo@clinicvoice.app',
  app_metadata: {},
  user_metadata: { clinic_name: 'Demo Clinic' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as const;
