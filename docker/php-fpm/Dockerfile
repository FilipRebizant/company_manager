FROM thecodingmachine/php:7.3-v2-fpm

LABEL authors="Julien Neuhart <j.neuhart@thecodingmachine.com>, David Négrier <d.negrier@thecodingmachine.com>"

USER root

RUN apt-get update && \
    apt-get install -y --no-install-recommends gnupg && \

    docker-php-ext-enable xdebug  && \
    echo 'xdebug.remote_port=10000' >> /usr/local/etc/php/php.ini

COPY ./Backend/composer.json /var/www/html/
COPY ./Backend/composer.lock /var/www/html/
COPY ./docker/php-fpm/config/config.ini /usr/local/etc/php-fpm.d/www.conf

RUN composer install

USER docker
