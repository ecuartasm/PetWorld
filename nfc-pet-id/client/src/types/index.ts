export interface User {
  id: number;
  email: string;
}

export interface Pet {
  id: string;
  user_id: number;
  name: string;
  species: string | null;
  breed: string | null;
  photo_url: string | null;
  created_at: string;
  owner_name: string | null;
  owner_phone: string | null;
  alt_phone: string | null;
  allergies: string | null;
  medications: string | null;
  conditions: string | null;
  vet_name: string | null;
  vet_phone: string | null;
}

export interface PublicPet {
  id: string;
  name: string;
  species: string | null;
  breed: string | null;
  photo_url: string | null;
  owner_name: string | null;
  owner_phone: string | null;
  alt_phone: string | null;
  allergies: string | null;
  medications: string | null;
  conditions: string | null;
  vet_name: string | null;
  vet_phone: string | null;
}
