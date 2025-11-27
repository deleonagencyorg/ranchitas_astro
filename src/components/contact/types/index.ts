// Contact form types
export type ContactReason = 
  | 'Soy cliente'
  | 'Quiero ser cliente'
  | 'Exportaciones'
  | 'Quiero ser proveedor'
  | 'Enviar Hoja de vida'
  | 'Soy Estudiante Universitario'
  | 'Soy Periodista/ Medio de comunicación'
  | 'Línea Ética YUMMIES'
  | 'Soy un ganador'
  | 'Otros';

export type Country = 
  | 'Guatemala'
  | 'El Salvador'
  | 'Honduras'
  | 'Nicaragua'
  | 'Costa Rica'
  | 'República Dominicana';

// Base form fields that all contact forms must have
export interface BaseContactForm {
  contactReason: ContactReason;
  country: Country;
  city: string;
  name: string;
  email: string;
  phone?: number;
}

// Additional fields for specific contact reasons
export interface ClientExtraFields {
  clientCode?: string;
  areaOfInterest: 'Sugerencias' | 'Consultas' | 'Reclamo';
  message?: string;
  file?: File;
}

export interface ProspectiveClientExtraFields {
  requestType: 'Para consumo propio' | 'Pulpería' | 'Mini Mercado' | 'Abastecedor' | 'Otros';
  file?: File;
}

export interface ExportsExtraFields {
  interest: 'Quiero ser distribuidor' | 'Deseo producto para consumo personal';
}

export interface SupplierExtraFields {
  areaOfInterest: string;
  file?: File;
}

export interface StudentExtraFields {
  question: string;
  file?: File;
}

export interface JournalistExtraFields {
  areaOfInterest: 'Presidencia Ejecutiva' | 'Mercadeo' | 'Relaciones Corporativas';
  question: string;
}

export interface EthicsLineExtraFields {
  comments?: string;
  file?: File;
}

export interface OthersExtraFields {
  message?: string;
  file?: File;
}

export interface WinnerExtraFields {
  dynamicOrPromotion: string; // Dinámica o promoción en la que ganó
  award: string; // Premio adjudicado
}

// Complete form types
export interface ClientForm extends BaseContactForm, ClientExtraFields {
  contactReason: 'Soy cliente';
}

export interface ProspectiveClientForm extends BaseContactForm, ProspectiveClientExtraFields {
  contactReason: 'Quiero ser cliente';
}

export interface ExportsForm extends BaseContactForm, ExportsExtraFields {
  contactReason: 'Exportaciones';
}

export interface SupplierForm extends BaseContactForm, SupplierExtraFields {
  contactReason: 'Quiero ser proveedor';
}

export interface StudentForm extends BaseContactForm, StudentExtraFields {
  contactReason: 'Soy Estudiante Universitario';
}

export interface JournalistForm extends BaseContactForm, JournalistExtraFields {
  contactReason: 'Soy Periodista/ Medio de comunicación';
}

export interface EthicsLineForm extends BaseContactForm, EthicsLineExtraFields {
  contactReason: 'Línea Ética YUMMIES';
}

export interface WinnerForm extends BaseContactForm, WinnerExtraFields {
  contactReason: 'Soy un ganador';
}

export interface OthersForm extends BaseContactForm, OthersExtraFields {
  contactReason: 'Otros';
}

export type ContactForm = 
  | ClientForm
  | ProspectiveClientForm
  | ExportsForm
  | SupplierForm
  | StudentForm
  | JournalistForm
  | EthicsLineForm
  | WinnerForm
  | OthersForm;

export interface ContactFormResponse {
  success: boolean;
  message: string;
  data?: any;
}
