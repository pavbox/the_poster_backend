# The Poster NodeJS Backend

Server-side The Poster App

Rest API for iOS application.

Stack: NodeJS/Express, MongoDB, Mongoose, Babeljs.

Routes:

```

'/api/v1/post/' — GET all posts
'/api/v1/post/:id' — GET, POST, PUT, DELETE post by id
'/api/v1/post/:id/upload' — GET, POST image upload/download for current post.
'/api/v1/post/:id/upload_thumbs' — GET thumb images (tableView preview)

```

# Usage

1. Use run_prod.sh for build app.
2. Use pm2.sh for serve app.
