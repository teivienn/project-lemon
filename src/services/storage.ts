import Resizer from 'react-image-file-resizer';
import { supabase } from '../lib/supabase';

export const storage = {
  uploadImage: async (url: string, path: any) => {
    const data = Resizer.imageFileResizer(path, 300, 300, 'JPEG', 80, 0, (res) =>
      console.log(res),
    );
    // const { data, error } = await supabase.storage.from('lemone').upload(`${url}.jpeg`, path);

    // if (error) throw error;

    return {};
  },
  deleteImage: async (url: string) => {
    const { data, error } = await supabase.storage.from('lemone').remove([url]);

    if (error) throw error;

    return data?.[0];
  },
};
