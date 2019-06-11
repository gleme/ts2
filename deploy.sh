

docker build -t gleme/ts2-nginx ./nginx
docker build -t gleme/ts2-api ./api
docker build -t gleme/ts2-app ./app


# docker run -e NODE_ENV -e PORT -e TYPEORM_CONNECTION -e TYPEORM_HOST -e TYPEORM_PORT -e TYPEORM_USERNAME -e TYPEORM_PASSWORD -e TYPEORM_DATABASE -e TYPEORM_SYNCHRONIZE -e TYPEORM_ENTITIES -e TYPEORM_MAX_QUERY_EXECUTION_TIME -e MONGODB_USERNAME -e MONGODB_PASSWORD -e MONGODB_DATABASE -e MONGODB_AUTHDB -e MONGODB_HOST -e MONGODB_PORT -e MONGODB_URI -d --name api gleme/ts2-api

docker run --env-file ./api.env -d --name api gleme/ts2-api
docker run -d --link api:api --name app gleme/ts2-app
docker run -p 80:80 -d --link api:api --link app:app gleme/ts2-nginx

# Development
# MONGODB_URI=<uri> MONGODB_HOST=<host> docker-compose up