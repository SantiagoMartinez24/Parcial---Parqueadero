// tarifas.js — responsabilidad única: calcular el costo de un vehículo según el tiempo parqueado.
// Es una función pura: solo recibe los datos que le pasan (la hora de entrada) y responde
// de inmediato. Como vehiculos.js NO lo importa (R2 / ADR-001), consultar cupos en
// vehiculos.js nunca pasa por aquí ni corre el riesgo de alterar el registro de ocupación.
const TARIFA_POR_MINUTO = 100; // pesos por minuto

export function calcularCosto(horaEntrada, horaSalida = Date.now()) {
  const minutos = Math.max(1, Math.ceil((horaSalida - horaEntrada) / 60000));
  return minutos * TARIFA_POR_MINUTO;
}

export function formatearCosto(valor) {
  return `$${valor.toLocaleString('es-CO')}`;
}
