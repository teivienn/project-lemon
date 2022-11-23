export interface Profile {
  id: string;
  updated_at: Date;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  admin: boolean;
}
