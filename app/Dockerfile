FROM postgres
ENV POSTGRES_PASSWORD=mySecret
EXPOSE 5432
COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
VOLUME [ "/data" ]