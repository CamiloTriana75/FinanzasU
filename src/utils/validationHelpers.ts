/**
 * Validaciones compartidas para formularios
 * Evita duplicidad de lógica en diferentes páginas
 */

export interface ValidationErrors {
  [key: string]: string
}

// Validadores reutilizables
export const validators = {
  required: (value: string | number, field: string): string => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${field} es obligatorio`
    }
    return ''
  },

  minLength: (value: string, minLength: number, field: string): string => {
    if (value && value.length < minLength) {
      return `${field} debe tener mínimo ${minLength} caracteres`
    }
    return ''
  },

  email: (value: string): string => {
    if (!value) return ''
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(value)) {
      return 'Correo no válido'
    }
    return ''
  },

  monto: (value: string | number, field: string = 'Monto'): string => {
    if (!value) return `${field} es obligatorio`
    const num = parseFloat(String(value))
    if (isNaN(num)) {
      return `${field} debe ser un número válido`
    }
    if (num <= 0) {
      return `${field} debe ser mayor a 0`
    }
    return ''
  },

  fecha: (value: string, field: string = 'Fecha'): string => {
    if (!value) return `${field} es obligatoria`
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      return `${field} no es válida`
    }
    return ''
  },

  passwordMatch: (password: string, confirmPassword: string): string => {
    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden'
    }
    return ''
  },

  select: (value: string | number, field: string): string => {
    if (!value) {
      return `${field} es obligatorio`
    }
    return ''
  },

  montoLimite: (value: string, field: string = 'Monto límite'): string => {
    if (!value) return `${field} es obligatorio`
    const num = parseFloat(value)
    if (isNaN(num)) {
      return `${field} debe ser un número válido`
    }
    if (num <= 0) {
      return `${field} debe ser mayor a 0`
    }
    if (num > 999999999) {
      return `${field} no puede exceder 999.999.999`
    }
    return ''
  },

  nombre: (value: string): string => {
    if (!value || !value.trim()) {
      return 'El nombre es obligatorio'
    }
    if (value.trim().length < 2) {
      return 'El nombre debe tener mínimo 2 caracteres'
    }
    return ''
  },
}

// Validadores de formularios completos
export const formValidators = {
  transaccion: (form: {
    monto: string
    categoria_id: string
    fecha: string
    tipo?: string
  }): ValidationErrors => {
    const errors: ValidationErrors = {}
    errors.monto = validators.monto(form.monto)
    errors.categoria_id = validators.select(form.categoria_id, 'Categoría')
    errors.fecha = validators.fecha(form.fecha)
    
    // Eliminar errores vacíos
    return Object.fromEntries(Object.entries(errors).filter(([_, v]) => v))
  },

  categoria: (form: { nombre: string; tipo: string }): ValidationErrors => {
    const errors: ValidationErrors = {}
    errors.nombre = validators.nombre(form.nombre)
    
    return Object.fromEntries(Object.entries(errors).filter(([_, v]) => v))
  },

  presupuesto: (form: {
    categoria_id: string
    monto_limite: string
  }): ValidationErrors => {
    const errors: ValidationErrors = {}
    errors.categoria_id = validators.select(form.categoria_id, 'Categoría')
    errors.monto_limite = validators.montoLimite(form.monto_limite)
    
    return Object.fromEntries(Object.entries(errors).filter(([_, v]) => v))
  },

  perfil: (form: {
    nombre: string
  }): ValidationErrors => {
    const errors: ValidationErrors = {}
    errors.nombre = validators.nombre(form.nombre)
    
    return Object.fromEntries(Object.entries(errors).filter(([_, v]) => v))
  },

  password: (form: {
    newPassword: string
    confirmPassword: string
  }): ValidationErrors => {
    const errors: ValidationErrors = {}
    
    if (!form.newPassword) {
      errors.newPassword = 'La nueva contraseña es obligatoria'
    } else if (form.newPassword.length < 6) {
      errors.newPassword = 'Mínimo 6 caracteres'
    }
    
    if (!form.confirmPassword) {
      errors.confirmPassword = 'Confirmar contraseña es obligatoria'
    }
    
    if (form.newPassword && form.confirmPassword) {
      const matchError = validators.passwordMatch(form.newPassword, form.confirmPassword)
      if (matchError) errors.confirmPassword = matchError
    }
    
    return Object.fromEntries(Object.entries(errors).filter(([_, v]) => v))
  },
}

// Utilidad para verificar si hay errores
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0
}

// Utilidad para obtener error de un campo
export const getFieldError = (
  errors: ValidationErrors,
  fieldName: string
): string | undefined => {
  return errors[fieldName] || undefined
}
