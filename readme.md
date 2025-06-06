# Proyecto Backend: API de Productos

Este proyecto es una API REST que permite obtener información sobre productos y productos similares mediante solicitudes HTTP.

## Configuración inicial

Antes de ejecutar la aplicación, asegúrate de tener configurado el entorno de desarrollo correctamente.

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Igualmente debes crear un archivo **.env** en la raiz del proyecto y añadir las variables de entorno:

- PORT=5000
- BASE_URL = http://localhost:3001/product

## Levantar entorno de desarrollo

Para que la API funcione correctamente, es necesario levantar los servicios simulados mediante Docker Compose. Esto simula el comportamiento del servicio externo de productos.

Desde la raíz del proyecto, ejecuta:

### `docker-compose up -d`

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm install`

Instala las dependencias del proyecto.

### `npm run dev`

Ejecuta la aplicación en modo desarrollo con nodemon. La API estará disponible en: `http://localhost:5000`.

### `npm run format`

Ejecuta el formateo automático del código fuente utilizando Prettier.

### `npm run test`

Ejecuta las pruebas unitarias usando Jest.

### `npm run lint`

Ejecuta ESLint para verificar y reportar problemas de estilo y calidad del código.

### `npm run build`

Compila el proyecto y genera los archivos listos para producción.

---

## Endpoint principal

### GET /product/{productId}/similar

Obtiene los detalles de los productos similares al ID de producto proporcionado.

#### Respuestas de la API

- 200 OK: Respuesta exitosa con los productos similares.
- 404 Not Found: Si el producto solicitado no existe o no tiene productos similares.
- 500 Internal Server Error: Fallo en el servicio externo o errores inesperados.

## Tecnologías utilizadas

- **Node.js y Express**: Para construir la API REST.
- **Jest**: Para pruebas unitarias.
- **Docker y Docker Compose**: Para levantar los servicios simulados y pruebas de carga.
- **k6 + Grafana**: Para realizar pruebas de rendimiento y visualizar métricas.
- **ESLint y Prettier**: Para asegurar la calidad del código.

## Arquitectura y Patrones de Diseño

### Arquitectura General

Este proyecto está organizado siguiendo una arquitectura basada en funcionalidades o componentes y siguiendo principios de diseño como SOLID para mejorar la mantenibilidad.

**Componentes por funcionalidad**
Cada funcionalidad (por ejemplo, productos) contiene sus controladores, servicios, rutas y pruebas relacionados.

Aunque al ser un proyecto pequeño los beneficios no son evidentes, esta organización:

- Facilita la escalabilidad cuando el proyecto crece.
- Permite trabajar en equipos más grandes de manera más cómoda.
- Agrupa toda la lógica relacionada a una funcionalidad en un solo lugar, mejorando la mantenibilidad y la claridad del código.

### Manejo de Errores

- Los errores como 404 y 500 son gestionados y logueados apropiadamente.
- Productos con errores individuales (como no encontrados o con fallos de servidor) son ignorados para no afectar la respuesta global.
- El middleware centralizado de manejo de errores se encarga de registrar logs y enviar respuestas estándar.

### Nuevo enfoque con SSE (Server-Sent Events)

En lugar de esperar todos los productos para devolverlos juntos, ahora los productos se envían uno a uno al cliente a medida que se van obteniendo desde el servicio externo.

Este cambio mejora la resiliencia y la experiencia del usuario al proporcionar datos tan pronto como estén disponibles, sin tener que esperar a toda la colección.

- Respuestas más rápidas: el cliente empieza a recibir productos sin esperar a que todos estén listos.
- No se repiten productos ni se envía el array entero con cada actualización.
- Mejor experiencia de usuario: productos lentos no bloquean el flujo.
- La respuesta se construye progresivamente en el cliente.
- Ideal para listas largas o respuestas parciales.
- Los productos con errores se ignoran.

### Pruebas unitarias

### `npm run test`

Para ejecutar los tests.

Se prueban escenarios clave como:

- Respuesta correcta con productos válidos.
- Manejo de productos no encontrados (404).
- Manejo de errores del servidor externo (500).
- Ignorar productos con errores y devolver solo los válidos.

## Estructura enfocada en los criterios de evaluación

### Claridad y mantenibilidad del código

- Separación de responsabilidades (controlador, servicio, helper).
- Código limpio y modular.
- ESLint aplicado para mantener consistencia de estilo.
- Variables, funciones y archivos con nombres descriptivos que expresan su propósito.

### Performance

- Peticiones a servicios externos realizadas en paralelo.
- Aplicado `fetchWithTimeout` para evitar bloqueos por servicios lentos.

### Resilience

- Manejo robusto de errores HTTP y timeouts con `Promise.all`.
- No se bloquea la experiencia del usuario por productos que no responden.
- Diseño defensivo frente a peticiones que devuelven 404 o 500.
- Mostrar productos disponibles lo antes posible y no bloquear al usuario esperando uno lento.
