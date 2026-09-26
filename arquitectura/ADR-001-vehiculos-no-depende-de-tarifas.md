# ADR-001 · Vehículos no depende de Tarifas

Fecha: 24 de septiembre de 2026 · Estado: aceptada

## Contexto
`vehiculos.js` expone `cuposDisponibles()` y `listarVehiculosActivos()` para que
cualquiera pregunte por el estado del parqueadero sin tocar nada. Si este módulo
tuviera algún tipo de dependencia hacia otro módulo de negocio, una consulta tan
simple como "¿cuántos cupos hay?" podría terminar disparando, aunque fuera sin querer,
lógica ajena que no debería correr solo por preguntar.

## Driver que manda
La búsqueda o consulta de cupos no puede alterar el registro de ocupación.

## Decisión
El módulo `vehiculos` **no puede importar** a `tarifas`. Así, `cuposDisponibles()` y
`listarVehiculosActivos()` quedan garantizadas como funciones de solo lectura: no
llaman a nada externo, no disparan ninguna otra lógica, y no tienen forma de terminar
modificando `vehiculosActivos` por una ruta indirecta. Toda consulta de cupos vive
completa y aislada dentro de este módulo.

## Alternativa descartada
Que `vehiculos.js` importara a `tarifas.js` para, por ejemplo, calcular junto con los
cupos disponibles un estimado de cuánto costaría el siguiente cupo. Es una
funcionalidad tentadora, pero mezcla una consulta (cupos) con un cálculo de otro
dominio (tarifas) dentro del mismo módulo, y ya no queda garantizado que preguntar
por cupos sea una operación pura de solo lectura.

## Qué pagamos
`app.js` es quien tiene que combinar por su cuenta los cupos con cualquier otro dato
si alguna pantalla llegara a necesitarlo junto, en vez de pedírselo ya resuelto a
`vehiculos`. Es una responsabilidad más para el orquestador, a cambio de que la
consulta de cupos nunca deje de ser segura de llamar en cualquier momento.

## Cómo se verifica
Regla **R2** en `arquitectura/reglas.json`, revisada por el pipeline en cada cambio.
