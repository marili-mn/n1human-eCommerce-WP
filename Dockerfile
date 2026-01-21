FROM swaggerapi/swagger-ui

# Copiar nuestra definición OpenAPI a la carpeta predeterminada de Nginx en el contenedor
COPY docs/openapi.yaml /usr/share/nginx/html/openapi.yaml

# Configurar Swagger UI para que cargue nuestro archivo al iniciar
ENV SWAGGER_JSON=/usr/share/nginx/html/openapi.yaml
