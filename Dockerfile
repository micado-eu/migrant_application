# develop stage
FROM micadoproject/quasar:1.0.3 as build-stage
COPY --chown=node:node ./app /code
RUN ls -lat /code

RUN npm install
RUN quasar build -m pwa

# production stage
#FROM nginx:1.17.5-alpine as production-stage
#COPY --from=build-stage /code/dist/spa /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

FROM alpine
COPY --from=build-stage /code/dist/pwa /var/www/html2
#COPY site/index.html /var/www/html2/index.html
VOLUME /var/www/html2/
COPY busyscript.sh /usr/local/bin/busyscript
RUN chmod +x /usr/local/bin/busyscript
CMD ["busyscript"]
