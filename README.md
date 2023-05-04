# my-blog

A blog application where users create and manage their blogs.

## Steps to Run FrontEnd and BackEnd Applications

Follow the steps to run both the applications on local:

### Run Back End

1. ```cd myblog-api```
2. Install modules ```npm install```
3. Setup the `.env` file with the reference of this [example.env](/myblog-api/example.env) file
4. Run NestJs dev command ```npm run start:dev```

### Run Front End

1. ```cd myblog-ui```
2. Install modules ```npm install```
3. Run angular serve command ```ng s```
4. Open [http://localhost:4200](http://localhost:4200) in browser

Login Page

![Login](/static/login-page.PNG)

Login with Google Account

![Google Login](/static/google-login.PNG)

Dashboard Page

![Dashboard](/static/dashboard.PNG)

New Blog Post

![New Blog](/static/new-post.PNG)

Blog Detail page. Its a public page.

![Blog Detail](/static/detail.PNG)

## Repositories

I have built an UI Application in Angular, Backend Service in NestJs, Api Performance Load Tester Script in Python with the help of Locust and finally a Bulk Dummy Data Generator script in Node.Js.

Let's start with discussing each of the applications with their features.

## MyBlog UI

A Front End application that will be visible to users is built in Angular using RxJS Observables and Operators. It has features like:

1. Login through Google Account
2. A dashboard page to list all the blogs that user will create
3. A create blog page where user can enter Blog Title, Body, Category and some Tags and hit save
4. A blog detail page that opens when user clicks on a blog title from at the dashboard page
5. Logout

There are some additional features that I have impplemented in the UI:

### Infinite Scroll Paginator

Infinite Scroll is implemented on the dashboard page for blog listings to get paginated records. It gets recent created blogs first and scrolls through the list.
As soon as user reaches to the end of page, application hits get all blogs endpoint with next page number.

## MyBlog Api

A Backend service created in NestJs with MongoDB database. There are several features implemented in this service:

1. Authenticate user through Google account
2. Generates an application specific JWT Access token once the Google auth is successful and the same access token is returned to the front end application
3. NestJs Passport and JWT libraries are used to Authenticate the user
4. NestJs decorator is used to check the Bearer Access Token present in request headers
5. Get all blogs created by the user
6. Create a blog
7. Get a sigle blog by slug

Some additional features are implemented like:

1. I have used Factory Method design pattern
2. Unit Test Cases are written for each of the repositories, services, and helper methods with coverage over 95% (attached screenshot for reference)
3. E2E Test cases are written to check Get Blogs, Get Single Blog and Create Blog Apis are performing as expected
4. Environment config is setup to access configuratiob based values


### Test Coverage

I have written unit test cases to covers 95% of the backend codes.

![Test Coverage](/static/test-coverage.PNG)

## Locust Load Tester Script

I have setup Locust performance load tester script in Python.

Steps to run the Locust script:

1. Install Python
2. Install Locust using command ```pip3 install locust```
3. Run Locust command ```locust```. It will run the script and you can open the url in browser to configure the host and requests per second value.
4. [More details on setup](https://docs.locust.io/en/stable/installation.html).

Check the [url here](/static/locust-report.html) that shows a detailed report about the performance load tested locally.

## Bulk Dummy Data Generator

I have created a bulk data generator script in Node.Js. It has features like:

1. Calls the endpoint to insert blogs one by one on an interval of 20ms. It can insert almost 100k records in 3-5 mins
2. A bulk data generator script that directly inserts data into mongodb database
3. Automatically generates random article title, body, category and tags to insert

### Steps to run

1. Install modules ```npm install```
2. Run ```node app.js``` to insert data by calling api one by one. It can insert upto 100k records in 3-5 mins
3. Run ```node bulk-generator.js``` to insert data in bulk. It can insert upto 300k records in just 30-50 seconds

## Api Performance

I have generated 1.1 million records in my local MongoDB database. Each document has 100-200kb size of data. The api performs good on load tester with upto 600 requests per second.

![1.1 Million records in DB](/static//mongo-records.PNG)

The DB size is more than 4 GB but still it works good due to indexes I have used.
Here is the time taken by a query to search for a slug in 1.1 Million records

![DB Query time](/static/db-query-performance.PNG)

## Deployment

I have setup Dockerfile in both applications ui and backend to deploy it to cloud.

### Steps to run

1. Go to UI App
2. Build the docker image
3. Go to Backend App
4. Build the docker image
5. Run Docker compose ```docker compose up``` that will install the required softwares
