export interface Athlete {
  id: number;
  email?: string;
  first_name: string;
  identity_number: string;
  belt_id?: string[];
  gender: string;
  organization_id?: string[];
  category_id?: string[];
  date_of_bird: string;
  phone?: string;
  disability: string;
  address: string;
  last_name: string;
  belt?: string[];
  categories?: string[];
  "name (from organization_id)"?: string[];
  created_at: string;
}
