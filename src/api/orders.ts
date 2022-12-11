import { supabase } from '~/lib/supabase';
import uuidv4 from 'uuidv4';

export const orders = {
  create: async (userId: string, producrId: string[]) => {
    return supabase.from('orders').insert({
      producrId,
      userId,
      id: uuidv4(),
    })
  }
}
