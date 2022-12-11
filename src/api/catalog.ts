import { supabase } from '~/lib/supabase';
import { isEmpty } from 'lodash';
import uuidv4 from 'uuidv4';

export const catalog = {
  getAll: async (search?: string, categoryId?: string, subCategoryId?: string) => {
    const query = supabase.from('catalog')
      .select('*')

    if(!isEmpty(search)) {
      query.like('name', `%${search}%`)
    }

    if (!isEmpty(subCategoryId)) {
      query.eq('categoryId', categoryId)
    }

    if (!isEmpty(subCategoryId)) {
      query.eq('subCategoryId', subCategoryId)
    }

    const { data, error } = await query;

    if (error) {
      throw Error();
    }
    return data;
  },
  create: async (name: string, picture: string, content, price, categoryId, subCategoryId) => {
    return supabase.from('catalog').insert({
      id: uuidv4(),
      name,
      picture,
      content,
      categoryId,
      subCategoryId,
      price,
    })
  },
  delete: async (id) => {
    return supabase.from('catalog').delete().eq('id', id)
  }
}
