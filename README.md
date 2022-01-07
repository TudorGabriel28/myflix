# Myflix - Your personal database for movies and TV shows
Myflix is a web application which offers users the possiblity to keep track of their watched movies from all platforms, review, rate and recommend them. The platform is also meant to be a social space, where the user can communicate with their friends and get new movies ideas from his friends' watched movies and reviews.

# Technology
  
  The web application API is a NodeJS Restful CRUD API built with express framework and typescript, as for the database it was used MongoDb.
  
  The frontend will be based on VueJs framework together with Bootstrap 5.

# Interface and functionalities

There are two types of users: viewer and admin. The viewer account contains all the customer functionalities of the web application, while the admin has additional capabilities for management of the database. These include the following:
  * Revisal of newly added movies (accept, reject or modify the movie)
  * Capability to remove a user
  * Capability to remove a movie
 More details will follow in [Admin Pages](#admin-pages)

![First page](https://user-images.githubusercontent.com/61846679/148544865-3732e07b-1974-484c-b808-6ba1e6641ab7.png)

## Login

After you registered and confirmed your email address, you can login into your account.

![Login Page](https://user-images.githubusercontent.com/61846679/148546055-1562595c-f101-45e3-aeff-ef9f9f818c8a.png)

## Main page
 
 Here you can see all the movies added by you in your lists. You can search for any movie in the database, and if it doesn't exist you can add it through "Add Movie" page
 
 ![Home page](https://user-images.githubusercontent.com/61846679/148546694-61e2b537-85e9-4e42-857f-6dcc4e94ea8b.png)
 
## Add a movie
 There are two options for creating a new movie in database: 
  
  **Manual mode** - that requires to introduce all the data about the movie by hand. The sent data will not be available for all users until an admin revise the movie request.
  
  **Using the IMDb API** - you need to paste the exact movie title from IMDb and the information about the movie will be fetched. This operation will not need a revision from an admin as the information is certainly correct.
  
![Add movie page](https://user-images.githubusercontent.com/61846679/148548138-b5650ce0-1e3d-47dd-abd3-6027b96c866c.png)

## Friends

The secondary purpose of this web app, besides keeping an archive with all of your seen movies, is to also be a community. In this sense, you can be friends with other users and see their favourites movies.

![Friends page](https://user-images.githubusercontent.com/61846679/148549658-ca91f256-0ca0-4854-ace9-a45c2bcb654c.png)

## Admin pages

### Users

On Users page an admin can view, search or delete any user in the database.

![Users page](https://user-images.githubusercontent.com/61846679/148549810-92750a86-4db4-46bb-abf8-2c41e8dd67c9.png)

### Movie Requests

On this page admins will be able to accept, reject or modify user's movie requests.

![Requests page](https://user-images.githubusercontent.com/61846679/148550033-c0dbc119-7d8a-4c3e-929a-144dfacf053f.png)

# What are the next steps

On the backend, all the basic functionality was implemented and the following tasks will be completed in the near future:
- [ ] IMDb API connection for adding a movie
- [ ] Friends functionality
- [ ] Movie requests functionality
- [ ] Jest testing





