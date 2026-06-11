import type { Pet, PublicPet, User } from '../types';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error((body as { error?: string }).error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export const api = {
  getMe: () => request<User>('/api/auth/me'),
  login: (email: string, password: string) =>
    request<User>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  signup: (email: string, password: string) =>
    request<User>('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),

  getPets: () => request<Pet[]>('/api/pets'),
  getPet: (id: string) => request<Pet>(`/api/pets/${id}`),
  createPet: (name: string) =>
    request<Pet>('/api/pets', { method: 'POST', body: JSON.stringify({ name }) }),
  updatePet: (id: string, data: Partial<Pet>) =>
    request<Pet>(`/api/pets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePet: (id: string) =>
    request<{ ok: boolean }>(`/api/pets/${id}`, { method: 'DELETE' }),

  getPublicPet: (id: string) => request<PublicPet>(`/api/public/${id}`),

  uploadPhoto: async (file: File): Promise<string> => {
    const res = await fetch('/api/upload', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error((body as { error?: string }).error ?? 'Upload failed');
    }
    const data = await res.json() as { url: string };
    return data.url;
  },
};
