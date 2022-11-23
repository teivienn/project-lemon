import { supabase } from '../lib/supabase';
import { Profile } from '../types/profile';

export const profile = {
  getProfile: async (id: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw Error();
    }

    return data as Profile;
  },
  logout: async () => {
    return supabase.auth.signOut();
  },
  update: async ({
    avatar_url,
    username,
    full_name,
    id,
  }: Required<Omit<Profile, 'admin'>>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        avatar_url,
        username,
        full_name,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw Error();
    }

    return data as Profile;
  },
};
