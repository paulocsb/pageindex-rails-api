README
------

It's a tiny RESTful API to index a page's content. "Index the content" means to parse the page content and store it's content - in this case to store the content that is found inside the tags h1, h2 and h3 and the links.

### Endpoints:

1. List the urls and content stored in the database

```
[GET] /tasks tasks#index
```

2. Receive the URL of the page, grab its content and store its content with the tags h1, h2 and h3 and the links

```
[POST] /tasks tasks#create_page
```

Dependencies
------------

- The Ruby 2.2.2+
- Rails (versions 5.0)
- PostgreSQL

Configuration
-------------

### Clone repository
```
$ git clone <path-this-repo>.git
$ cd lim-api
```

### Run bundle install
```
$ bundle install
```

Database
--------

### Run database setup
```
$ rake db:setup
```

### Run migrations
```
$ rake db:migratiom
```

Start the Web Server
--------------------

### Run server setup
```
$ rails server
```

Author
------

* **Paulo Cesar** - [GitHub](https://github.com/paulocsb)

