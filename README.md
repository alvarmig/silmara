# Silmara Online Store - Express, Node.js 
Online Store - Express based Application 

The development time was around three weeks, I will be adding a shooping cart and will migrate all the views to EJS. 
The purpose of the application was to create an Online Store to undestand the concepts of REST API and webservices for the backend course.

A simple schema was created to store the users, products and categories.

If you want to see a more detailed explanation please chekout the following ppt:
https://github.com/alvarmig/silmara/blob/master/Proyecto%20Backend.pptx 

<ul>Features: 
  <li>Display Products from DB dinamically.</li>
  <li>Filter Item by Category from DB.</li>
  <li>Views product details per item.</li>
  <li>Login & Authentication.</li>
  <li>Sessions and store session on DB.</li>
  <li>Register new Users into the DB.</li>
  <li>Flash messages.</li>
  <li>Responsive design, mobile, table and desktop.</li>
</ul>

<br>

The application is based on Node.js, Express is the webserver. 
The main goals was to create a REST API to serve the front-end with JSON data from each one of the products. 

<ul>Technologies used: 
  <li>HTML & CSS (Boostrap 4.0).</li>
  <li>javascript for DOM manipulation, AJAX request.</li>
  <li>EJS Embedded JavaScript templating for the register and login pages.</li>
  <li>Node.js & Express for the backend.</li>
  <li>Sequelize ORM.</li>
  <li>Passport and sessions-express for authentication and sessions.</li>
  <li>MySQL 8.0 using MySQL Workbench.</li>
  <li>MVC pattern.</li>
</ul>

<br>
<img src="/public/img/README/img-1.JPG" width="1000">
Products are loaded dynamically via a GET request to the REST API, the request acquires the data from the DB using an ORM.
<br>
<br>

<img src="/public/img/README/img-2.JPG" width="1000">
A filter sections was added to select items by category, this is done with GET request also.
<br>
<br>
<br>

<img src="/public/img/README/img-3.JPG" width="1000">
Pagination was added, the user is able to change page to view more products. 
The pagination is dynamic on the backend, I need to work on making the front-end dynamic. 
<br>
<br>
<br>


<img src="/public/img/README/img-4.JPG" width="1000">
The user is able to view the product details by item, this was implemented using an AJAX call to a GET request using the id of the product.
<br>
<br>
<br>


<img src="/public/img/README/img-5.JPG" width="1000">
Login views was implemented using EJS, this way I was able to display flash messages to the user and session variables easier. 
<br>
<br>
<br>


<img src="/public/img/README/img-6.JPG" width="1000">
A dashboard was implemented, when the user login it will display the user information. 
The URL is authenticated so it´s not possible to view the dashboard without login in.
<br>
<br>
<br>

<img src="/public/img/README/img-7.JPG" width="1000">
Register view was implemented also, verification of all fields was implemented using flash messages. 
If an email is already on the database a message will be displayed also. This was implemented using the sequelize ORM.
<br>
<br>
<br>
