import { Session } from '@supabase/supabase-js';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { api } from '../../api';
import { Profile } from '../../types/profile';
import { supabase } from '../supabase';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const updateProfile = useCallback((id?: string) => {
    if (id) {
      api.profile.getProfile(id).then(setProfile);
    } else {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      updateProfile(session?.user.id);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      updateProfile(session?.user.id);
    });
  }, [updateProfile]);

  return useMemo(() => ({ session, profile, setProfile }), [profile, session]);
};
