FROM swaggerapi/swagger-ui

# Copiar a una ubicación segura fuera del directorio de Nginx primero
COPY docs/openapi.yaml /openapi.yaml

# Indicar a Swagger UI dónde encontrar el archivo
ENV SWAGGER_JSON=/openapi.yaml