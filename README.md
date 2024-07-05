# Major-Project

Project Name: HotelListingApp

Description:
HotelListingApp is a full-stack web application that allows users to browse, list, and review various locations on an interactive map. Users can sign up, log in, and engage with the platform through a variety of features such as authorization, comments, delete listing, edit listing, delete comment, giving stars (ratings), and more. The application is built with a focus on security and uses MongoDB as its database.

Features
Authorization:

Users must sign up and log in to access certain features.
Role-based access control to manage permissions for different user types (e.g., admin, regular user).
Comments:

Users can add comments to listings to share their thoughts and experiences.
Comments can be edited or deleted by the comment author.
Delete Listing:

Users can delete their own listings.
Admins have the ability to delete any listing if it violates platform rules.
Edit Listing:

Users can edit the details of their own listings.
Delete Comment:

Users can delete their own comments.
Admins can delete any comment if it violates platform rules.
Give Stars (Ratings):

Users can rate listings with a star rating system.
Average ratings are displayed for each listing.
Map Integration:

An interactive map allows users to explore various locations.
Listings are shown as markers on the map.
Users can search for locations and view detailed information about each listing.
Sign Up and Login:

Users can create an account by signing up with their email and a secure password.
Users can log in using their email and password.
Security:

Passwords are hashed before being stored in the database.
Use of HTTPS to secure data in transit.
Input validation and sanitization to prevent SQL injection and XSS attacks.
Implementation of JWT (JSON Web Tokens) for secure authentication.
Technology Stack
Frontend:

React: For building user interfaces.
Material-UI / Tailwind CSS: For styling and responsive design.
MapBox map API: For map integration.
Backend:

Node.js / Express: For building the server-side logic and APIs.
MongoDB: As the database for storing user data, listings, comments, and ratings.
Mongoose: For object data modeling (ODM) to interact with MongoDB.
User Stories
User Registration and Authentication:

As a user, I want to sign up with my email and password so that I can create an account.
As a user, I want to log in with my credentials so that I can access my account.
Listing Management:

As a user, I want to create a new listing with details such as title, description, location, and images.
As a user, I want to edit my existing listings to update the information.
As a user, I want to delete my listings if they are no longer relevant.
Comments and Ratings:

As a user, I want to add comments to listings to share my experience.
As a user, I want to edit or delete my comments.
As a user, I want to rate listings with stars to indicate their quality.
As a user, I want to see the average rating for each listing.
Interactive Map:

As a user, I want to view listings on an interactive map to easily find locations.
As a user, I want to search for specific locations on the map.

