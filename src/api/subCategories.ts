import uuidv4 from 'uuidv4';
import { supabase } from '../lib/supabase';
/* eslint-disable no-alert */

export const subCategories = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('sub_categories')
      .select('*, categories ( name )');

    if (error) {
      throw Error();
    }
    return data;
  },
  create: (name: string, category_id: string) => {
    return supabase.from('sub_categories').insert({
      name,
      category_id,
      id: uuidv4(),
    });
  },
  delete: async (id: string) => {
    const { error, data } = await supabase.from('sub_categories').delete().eq('id', id);
    if (error) {
      if (error.code === '23503') {
        alert('категория используется в подкатегории');
      }
      throw Error();
    }

    return data;
  },
};
