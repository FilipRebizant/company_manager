FROM nginx
#COPY ./docker/nginx /usr/share/nginx/html
#COPY ./docker/nginx/default.conf /etc/nginx/
#WORKDIR "/etc/nginx"
RUN "pwd"

RUN "ls"

#RUN rm -r ./default.conf
RUN rm -r /etc/nginx/nginx.conf

COPY ./default.conf /etc/nginx/config.conf
#COPY ./default.conf /etc/nginx/conf.d/