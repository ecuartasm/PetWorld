import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Correo electronico invalido"),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres")
    .max(100, "La contrasena no puede tener mas de 100 caracteres"),
  displayName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede tener mas de 100 caracteres"),
  phone: z.string().optional(),
  consentAccepted: z.literal(true, "Debes aceptar la politica de privacidad"),
});

export const loginSchema = z.object({
  email: z.string().email("Correo electronico invalido"),
  password: z.string().min(1, "La contrasena es requerida"),
});

export const updateAccountSchema = z.object({
  displayName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede tener mas de 100 caracteres")
    .optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
});

export const requestPasswordResetSchema = z.object({
  email: z.string().email("Correo electronico invalido"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres")
    .max(100, "La contrasena no puede tener mas de 100 caracteres"),
});

export const petSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "El nombre no puede tener mas de 50 caracteres"),
  species: z.enum(["DOG", "CAT", "OTHER"], "Selecciona una especie valida"),
  breed: z.string().max(100).optional().nullable(),
  birthDate: z.string().optional().nullable(),
  sex: z.enum(["MALE", "FEMALE", "UNKNOWN"]).default("UNKNOWN"),
  weightKg: z.number().positive().max(200).optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  // PawTag fields
  ownerName: z.string().max(100).optional().nullable(),
  ownerPhone: z.string().max(30).optional().nullable(),
  altPhone: z.string().max(30).optional().nullable(),
  allergies: z.string().max(500).optional().nullable(),
  medications: z.string().max(500).optional().nullable(),
  conditions: z.string().max(500).optional().nullable(),
  vetName: z.string().max(100).optional().nullable(),
  vetPhone: z.string().max(30).optional().nullable(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
export type PetInput = z.infer<typeof petSchema>;
