FROM thecodingmachine/php:7.3-v2-fpm

LABEL authors="Julien Neuhart <j.neuhart@thecodingmachine.com>, David Négrier <d.negrier@thecodingmachine.com>"

USER root

COPY ./Backend/composer.json /var/www/html/
COPY ./Backend/composer.lock /var/www/html/

RUN composer install

USER docker
