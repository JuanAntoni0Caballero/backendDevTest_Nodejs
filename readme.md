# Proyecto Backend: API de Productos

Este proyecto es una API REST que permite obtener información sobre productos y productos similares mediante solicitudes HTTP.

## Configuración inicial

Antes de ejecutar la aplicación, asegúrate de tener configurado el entorno de desarrollo correctamente.

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Levantar entorno de desarrollo

Para que la API funcione correctamente, es necesario levantar los servicios simulados mediante Docker Compose. Esto simula el comportamiento del servicio externo de productos.

Desde la raíz del proyecto, ejecuta:

### `docker-compose up -d`

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm install`

Instala las dependencias del proyecto.

### `npm run dev`

Ejecuta la aplicación en modo desarrollo con nodemon. La API estará disponible en: `http://localhost:5000/api`.

### `npm run test`

Ejecuta las pruebas unitarias usando Jest.

### `npm run lint`

Ejecuta ESLint para verificar y reportar problemas de estilo y calidad del código.

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
- **ESLint**: Para asegurar la calidad del código.

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

### Pruebas unitarias

Para ejecutar los tests

### `npm run test`

Se prueban escenarios clave como:

- Respuesta correcta con productos válidos.
- Manejo de productos no encontrados (404).
- Manejo de errores del servidor externo (500).
- Ignorar productos con errores y devolver solo los válidos.

```

```
