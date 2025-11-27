import type { ContactFormData, ContactFormResponse } from '../types/index';

export class ContactService {
  private readonly apiHost: string;
  private readonly apiToken: string;
  private readonly contactFormPath: string;

  constructor() {
    this.apiHost = import.meta.env.PUBLIC_CONTACT_API_HOST || 'https://api-crm.yummiespromociones.com/api';
    this.apiToken = import.meta.env.PUBLIC_CONTACT_API_TOKEN || '';
    this.contactFormPath = import.meta.env.PUBLIC_CONTACT_FORM_PATH || '/api/v1/auth/email/custom';
  }

  private validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return {
        valid: false,
        error: 'El archivo debe ser menor a 10MB / File must be smaller than 10MB'
      };
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Solo se permiten archivos PDF, JPG y PNG / Only PDF, JPG and PNG files are allowed'
      };
    }

    return { valid: true };
  }

  async submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
    try {
      // Handle redirect case for "Enviar Hoja de vida"
      if (formData.contactReason === 'Enviar Hoja de vida') {
        window.location.href = 'https://www.dinant.com/buscamos-talento-como-tu/';
        return {
          success: true,
          message: 'Redirecting to careers page...'
        };
      }

      // Validate file if present
      if (formData.file) {
        const fileValidation = this.validateFile(formData.file);
        if (!fileValidation.valid) {
          return {
            success: false,
            message: fileValidation.error || 'Invalid file'
          };
        }
      }

      // Check if API token is configured
      if (!this.apiToken) {
        console.error('API token not configured');
        return {
          success: false,
          message: 'API configuration error. Please contact support.'
        };
      }

      // Create FormData for multipart submission
      const multipartData = new FormData();

      // Add all form fields according to the API structure
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'file' && value instanceof File) {
            // Add file with proper field name for attachments
            multipartData.append('attachments', value);
          } else {
            // Convert all other fields to string
            multipartData.append(key, String(value));
          }
        }
      });

      // Build full API URL
      const apiUrl = `${this.apiHost}${this.contactFormPath}`;

      console.log('Submitting contact form to:', apiUrl);

      // Submit to API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          // Don't set Content-Type header - let browser set it with boundary for multipart
        },
        body: multipartData,
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      return {
        success: true,
        message: result.message || 'Formulario enviado exitosamente / Form submitted successfully',
        data: result.data
      };

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      let errorMessage = 'Error al enviar el formulario / Error sending form';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  }
}

// Export singleton instance
export const contactService = new ContactService();
