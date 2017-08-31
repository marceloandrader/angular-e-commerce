docker run -it --rm --link angularecommercemarceloandrade_db_1:postgres \
  -v `pwd`:/app \
  -e PGPASSWORD=Asdf12345 postgres:9.4 \
  psql -h postgres -U dbadmin \
  postgres -a -f /app/postgrest-permissions.sql

docker-compose restart api
