import { z } from 'zod';
import type { ContactReason } from '../types';

// Base validation schema for all contact forms
const baseContactSchema = z.object({
  contactReason: z.enum([
    'Soy cliente',
    'Quiero ser cliente',
    'Exportaciones',
    'Quiero ser proveedor',
    'Enviar Hoja de vida',
    'Soy Estudiante Universitario',
    'Soy Periodista/ Medio de comunicación',
    'Línea Ética YUMMIES',
    'Soy un ganador',
    'Otros'
  ]),
  country: z.enum([
    'Guatemala',
    'El Salvador',
    'Honduras',
    'Nicaragua',
    'Costa Rica',
    'República Dominicana'
  ]),
  city: z.string().min(1, 'La ciudad/departamento es requerido'),
  name: z.string().min(1, 'El nombre completo es requerido'),
  email: z.string().email('Debe ser un email válido'),
  phone: z.number().optional()
});

// File validation helper
const fileSchema = z.instanceof(File)
  .refine((file) => file.size <= 10 * 1024 * 1024, 'El archivo debe ser menor a 10MB')
  .refine(
    (file) => ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
    'Solo se permiten archivos PDF, JPG y PNG'
  )
  .optional();

// Specific validation schemas for each contact reason
const clientSchema = baseContactSchema.extend({
  contactReason: z.literal('Soy cliente'),
  clientCode: z.string().optional(),
  areaOfInterest: z.enum(['Sugerencias', 'Consultas', 'Reclamo']),
  message: z.string().optional(),
  file: fileSchema
});

const prospectiveClientSchema = baseContactSchema.extend({
  contactReason: z.literal('Quiero ser cliente'),
  requestType: z.enum(['Para consumo propio', 'Pulpería', 'Mini Mercado', 'Abastecedor', 'Otros']),
  file: fileSchema
});

const exportsSchema = baseContactSchema.extend({
  contactReason: z.literal('Exportaciones'),
  interest: z.enum(['Quiero ser distribuidor', 'Deseo producto para consumo personal'])
});

const supplierSchema = baseContactSchema.extend({
  contactReason: z.literal('Quiero ser proveedor'),
  areaOfInterest: z.string().min(1, 'El área de interés es requerida'),
  file: fileSchema
});

const studentSchema = baseContactSchema.extend({
  contactReason: z.literal('Soy Estudiante Universitario'),
  question: z.string().min(1, 'La pregunta o solicitud es requerida'),
  file: fileSchema
});

const journalistSchema = baseContactSchema.extend({
  contactReason: z.literal('Soy Periodista/ Medio de comunicación'),
  areaOfInterest: z.enum(['Presidencia Ejecutiva', 'Mercadeo', 'Relaciones Corporativas']),
  question: z.string().min(1, 'La pregunta o solicitud es requerida')
});

const ethicsLineSchema = baseContactSchema.extend({
  contactReason: z.literal('Línea Ética YUMMIES'),
  comments: z.string().optional(),
  file: fileSchema
});

const othersSchema = baseContactSchema.extend({
  contactReason: z.literal('Otros'),
  message: z.string().optional(),
  file: fileSchema
});

// Union schema for all contact forms
export const contactFormSchema = z.discriminatedUnion('contactReason', [
  clientSchema,
  prospectiveClientSchema,
  exportsSchema,
  supplierSchema,
  studentSchema,
  journalistSchema,
  ethicsLineSchema,
  othersSchema
]);

// Helper function to get validation schema by contact reason
export function getValidationSchemaByReason(contactReason: ContactReason) {
  switch (contactReason) {
    case 'Soy cliente':
      return clientSchema;
    case 'Quiero ser cliente':
      return prospectiveClientSchema;
    case 'Exportaciones':
      return exportsSchema;
    case 'Quiero ser proveedor':
      return supplierSchema;
    case 'Enviar Hoja de vida':
      // This redirects, so no validation needed
      return baseContactSchema;
    case 'Soy Estudiante Universitario':
      return studentSchema;
    case 'Soy Periodista/ Medio de comunicación':
      return journalistSchema;
    case 'Línea Ética YUMMIES':
      return ethicsLineSchema;
    case 'Otros':
      return othersSchema;
    default:
      return baseContactSchema;
  }
}

// Validation function for file uploads
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'El archivo debe ser menor a 10MB' };
  }
  
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Solo se permiten archivos PDF, JPG y PNG' };
  }
  
  return { valid: true };
}

export type ContactFormData = z.infer<typeof contactFormSchema>;
