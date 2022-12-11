import { supabase } from '~/lib/supabase';
import uuidv4 from 'uuidv4';

export const orders = {
  create: async (userId: string, producrId: string[]) => {
    return supabase.from('orders').insert({
      producrId,
      userId,
      id: uuidv4(),
    })
  },
  getAll: async () => {
    const { data } = await supabase.from('orders').select('*')

    const orders: { userId: string, id: string, producrId: string[] }[] = data || [];

    const res: any = [];

    for (let it of orders) {
      const profile = await supabase
        .from('profiles')
        .select('*')
        .eq('id', it.userId)
        .single();

      let products: any = null;
      for (let pr of it.producrId) {
        const query = await supabase.from('catalog')
          .select('*').eq('id', pr)

        const itrm = query.data || [];

        products = itrm;

      }

      res.push({
        id: it.id,
        username: profile.data.username,
        avatar: profile.data.avatar_url,
        full_name: profile.data.full_name,
        products,
      })
    }

    return res;
  },
}
