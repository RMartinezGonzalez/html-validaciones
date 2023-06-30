export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (!input.validity.valid) {
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  } else {
    input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  }
}

const tipoDeErrores = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError',
];

const mensajesDeError = {
  nombre: {
    valueMissing: 'Este campo nombre no puede estar vacío',
  },
  email: {
    valueMissing: 'Este campo correo no puede estar vacío',
    typeMismatch: 'El correo no es válido',
  },
  password: {
    valueMissing: 'Este campo contraseña no puede estar vacío',
    patternMismatch: 'Al menos 6 caracteres maximo 12, solo letras.',
  },
  nacimiento: {
    valueMissing: 'Este campo nacimiento no puede estar vacío',
    customError: 'Debes tener almenos 18 años de edad',
  },
  numero: {
    valueMissing: 'Este campo numero no puede estar vacío',
    patternMismatch: 'El formato requerido es XXXXXXXXXX 10 numeros',
  },
  direccion: {
    valueMissing: 'Este campo dirección no puede estar vacío',
    patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres',
  },
  ciudad: {
    valueMissing: 'Este campo dirección no puede estar vacío',
    patternMismatch: 'La ciudad debe contener entre 10 a 40 caracteres',
  },
  estado: {
    valueMissing: 'Este campo dirección no puede estar vacío',
    patternMismatch: 'El estado debe contener entre 10 a 40 caracteres',
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = '';
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      //   console.log(tipoDeInput, error);
      //   console.log(input.validity[error]);
      //   console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = '';

  if (!mayorDeEdad(fechaCliente)) {
    mensaje = 'Debes tener almenos 18 años de edad';
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fechaCliente) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fechaCliente.getUTCFullYear() + 18,
    fechaCliente.getUTCMonth(),
    fechaCliente.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
