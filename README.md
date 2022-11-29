# Node + Create React App + Docker Compose

A project that runs a Node server and a create-react-app app via two separate containers, using Docker Compose.

## Development

```
docker-compose up
```

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `localhost:3000` and it proxies internally to the server using the linked name as `server:8080`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

### Notes

#### Adding new scss files

In a previous version of this, you needed to restart the client for new scss files to be recognized by the watch command. This may have changed (TODO: test if this still matters with react-scripts updates):

```
docker-compose restart client
```

#### Installing npm dependencies

All changes to `node_modules` should happen _inside_ the containers. Install any new dependencies by inside the container. You can do this via `docker-compose run`, but it’s easier to just upadte a running container and avoid having to rebuild everything:

```
docker-compose exec client
```

Then inside:

```
npm install --save <new_dependency>
```

## Production

```
docker-compose -f docker-compose.prod.yml up
```

For production, this uses the Dockerfile at the root of the repo. It creates a static build of the client React app and runs Express inside server, which handles both the API and serving of React files.

As a result, different code is executing to serve the React files, but all of the API calls should remain the same. The difference between development and production isn’t ideal, but it does offer the simplicity of having the entire app run in one server on one machine.

This is one of multiple ways a Node + React app could be setup, as suggested [here](https://daveceddia.com/create-react-app-express-production/):

- **Keep them together** - have Express serve both the API and React files
- **Split them apart** - have Express API on one machine and the React files on another (e.g., on S3 and use CORS to access the API)
- **Put the API behind a proxy** - use something like NGINX to proxy the Express API server and React static files separately

This project uses the “keep them together” approach. For better performance, you can set up a proxy (like Cloudflare) in between your server and the Internet to cache the static files. Or with some extra work you can fashion it to do either of the other two options.

## Notes

### Using docker compose

I have `comp` aliased to `docker-compose` on my computer.

Start via:

```
comp up

# or detached
comp up -d
```

Run a container of the server image via:

```
comp run server /bin/bash
```

Check status:

```
comp ps
```

Requirement:
docker & docker-compose

Run:
sudo docker-compose up
