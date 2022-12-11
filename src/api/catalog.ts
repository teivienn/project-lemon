import { supabase } from '~/lib/supabase';
import { isEmpty } from 'lodash';
import uuidv4 from 'uuidv4';

export const catalog = {
  getAll: async (search?: string, categoryId?: string, subCategoryId?: string, isDelete?: boolean) => {
    const query = supabase.from('catalog')
      .select('*')

    if(isDelete !== undefined) {
      query.eq('isDelete', isDelete)
    }

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
  update: async (name: string, picture: string, content, price, categoryId, subCategoryId, id: string) => {
    return supabase.from('catalog').update({
      name,
      picture,
      content,
      categoryId,
      subCategoryId,
      price,
    }).eq('id', id);
  },
  delete: async (id) => {
    return supabase.from('catalog').update({ isDelete: true }).eq('id', id)
  }
}
