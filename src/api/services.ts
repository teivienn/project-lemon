import uuidv4 from 'uuidv4';
import { supabase } from '../lib/supabase';

export const services = {
  getAll: async () => {
    const { data, error } = await supabase.from('services').select('*');

    if (error) {
      throw Error();
    }
    return data;
  },
  create: async (name: string, picture: string, content: string) => {
    return supabase.from('services').insert({
      name,
      picture,
      content,
      id: uuidv4(),
    });
  },
  delete: async (id: string) => {
    return supabase.from('services').delete().eq('id', id);
  },
};
