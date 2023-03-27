FROM php:8.0-apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y

# This copies all of ./src to /var/www/html
COPY src/ /var/www/html

RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html/
