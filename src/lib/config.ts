import * as Yup from 'yup';

const env = process.env as Required<{ [key: string]: string }>;

const schema = Yup.object({
  SUPABASE_URL: Yup.string().required(),
  SUPABASE_TOKEN: Yup.string().required(),
  TILEMAP: Yup.string().required(),
  STORAGE_URL: Yup.string().required(),
});

export const config = {
  SUPABASE_URL: env.REACT_APP_SUPABASE_URL,
  SUPABASE_TOKEN: env.REACT_APP_SUPABASE_TOKEN,
  TILEMAP: env.REACT_APP_TILEMAP,
  STORAGE_URL: env.REACT_APP_SUPABASE_STORAGE_URL,
};

const schemaValid = schema.validateSync(config);

if (!schemaValid) {
  Error('schemaValid error');
}
