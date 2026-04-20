El sistema se diseña bajo un enfoque deliberadamente simple: cada hábito tiene una meta medible dentro de un periodo fijo, y se evalúa únicamente como cumplimiento mínimo o máximo. No se busca modelar todos los casos posibles, sino mantener consistencia y claridad.

---

### 1) Definición de hábito

Un hábito es una métrica cuantificable evaluada en una frecuencia fija.

**Propiedades:**

- id
- nombre
- frecuencia (`daily`, `weekly`, `biweekly`, `monthly`, `quarterly`, `four_months`, `semiannual`, `yearly`)
- meta (número)
- tipo (`increase` | `decrease`)
- timezone (zona horaria del usuario)

Cada hábito:

- define completamente su periodo de evaluación
- no se evalúa fuera de su frecuencia

---

### 2) Periodos

Los periodos son **determinísticos y predefinidos** según la frecuencia:

- Diario: 00:00 → 23:59
- Semanal: lunes 00:00 → domingo 23:59
- etc.

Reglas:

- no hay solapamiento
- todos los periodos existen, incluso sin registros
- el corte es independiente de la fecha de creación del hábito
- se calculan siempre en la zona horaria del usuario

---

### 3) Registro de eventos (logs)

Los registros son **eventos atómicos**, no valores finales por periodo.

**HabitLogs**

- id
- habit_id
- timestamp (fecha + hora)
- timezone
- valor

Reglas:

- se permiten múltiples logs dentro de un mismo periodo
- los logs **no pertenecen explícitamente a un periodo**, se asignan por cálculo
- los valores se **acumulan** dentro del periodo

---

### 4) Construcción del valor por periodo

Para evaluar un hábito en un periodo:

1. Se determinan los límites del periodo según frecuencia y timezone
2. Se obtienen todos los logs dentro de ese rango
3. Se suman los valores

Resultado:

- `valor_periodo = suma(logs)`

Si no hay logs:

- `valor_periodo = 0`

---

### 5) Evaluación

Según el tipo del hábito:

- **increase** → cumple si `valor_periodo >= meta`
- **decrease** → cumple si `valor_periodo <= meta`

Resultado:

- booleano (cumple / no cumple)

---

### 6) Agrupación (opcional)

Se pueden agrupar hábitos en categorías u objetivos.

**HabitGroups**

- id
- nombre

Relación:

- un hábito puede pertenecer a uno o varios grupos

Reglas:

- no afecta lógica ni evaluación
- solo organización y análisis

---

### 7) Propiedades del sistema

El sistema es:

- **determinista**: mismo input → mismo resultado
- **acumulativo intra-periodo**: múltiples registros suman
- **sin ambigüedad de datos faltantes**: ausencia = 0
- **sin agregación inter-periodo**
- **sin interpretación adicional (rangos, promedios, etc.)**

---

### 8) Decisiones explícitas

Incluido:

- hábitos de incremento y reducción
- acumulación de eventos
- evaluación binaria por periodo

Excluido:

- promedios
- rangos
- evaluación cruzada entre periodos
- distinción entre “no registrado” y “no realizado”
- lógica de consistencia (streaks, etc.)

---

### 9) Consideraciones técnicas implícitas

- El cálculo de periodos depende de la zona horaria del hábito
- Los logs deben almacenarse con timestamp completo y zona
- La asignación de logs a periodos se hace dinámicamente
- No se requiere persistir resultados de evaluación

---

### 10) Flujo operativo

1. Usuario crea hábito
2. Usuario registra eventos (logs) en cualquier momento
3. El sistema:
    - agrupa logs por periodo
    - suma valores
    - evalúa contra meta

---

### 11) Punto crítico asumido

El sistema asume:

- registrar = responsabilidad del usuario
- ausencia de datos = valor 0

Esto simplifica el modelo, pero implica que:

- la calidad del tracking depende directamente del registro