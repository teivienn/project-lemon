/* eslint-disable no-alert */
import uuidv4 from 'uuidv4';
import { supabase } from '../lib/supabase';

export const categories = {
  getAll: async () => {
    const { data, error } = await supabase.from('categories').select('*');

    if (error) {
      throw Error();
    }
    return data;
  },
  create: (name: string, picture: string) => {
    return supabase.from('categories').insert({
      name,
      picture,
      id: uuidv4(),
    });
  },
  delete: async (id: string) => {
    const { error, data } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      if (error.code === '23503') {
        alert('категория используется в подкатегории');
      }
      throw Error();
    }

    return data;
  },
};
