import { Session } from '@supabase/supabase-js';
import { Dispatch, SetStateAction } from 'react';
import { Profile } from '../../types/profile';

export interface Store {
  session?: Session | null;
  profile?: Profile | null;
  setProfile: Dispatch<SetStateAction<Profile | null>>;
}
