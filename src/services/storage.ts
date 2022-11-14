import { supabase } from '../lib/supabase';

export const storage = {
  uploadImage: async (url: string, path: string) => {
    const { data, error } = await supabase.storage
      .from('lemone')
      .upload(`lemone/${url}`, path);

    if (error) throw error;

    return data;
  },
  deleteImage: async (url: string) => {
    const { data, error } = await supabase.storage.from('lemone').remove([url]);

    if (error) throw error;

    return data?.[0];
  },
};
