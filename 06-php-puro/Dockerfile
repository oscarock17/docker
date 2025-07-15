# Utilizar la imagen base de PHP
FROM php:8-alpine3.19

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Instalar dependencias necesarias
RUN apk --update --no-cache add \
    libzip-dev \
    zip \
    postgresql-dev \
    docker-php-ext-install pdo_pgsql

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar y configurar Xdebug
RUN apk add --no-cache $PHPIZE_DEPS \
    && apk add --no-cache linux-headers \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Copiar archivos de la aplicación
COPY . .

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar el servidor PHP
CMD [ "php", "-S", "0.0.0.0:80" ]