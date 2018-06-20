# How to use package
More info you can find on https://reactjs.org/tutorial/tutorial.html

# Nead to install!
Install Node.js. You can download it from https://nodejs.org/en/

- Download package.
- Open cmd or Node.js cmd
- First need to install create-react-app
```
npm install -g create-react-app
```
- Enter your project and run
```
npm install
```
- run 
```
npm start
```

# Other options

SASS compilation in package.
To use SASS in project doo this steps:
Run another cmd
Go to folder with your app
run 
```
npm install gulp gulp-ruby-sass gulp-autoprefixer
```
Start compile files with running a simple command gulp
Done.

All files is in src/scss folder. Do some changes in this files save it. Gulp compile files from this folder and change App.css. After then react-app detect changes in styles and change it in build folder.


# Pages

## Home page 
Contain Sidebar and Header. 
Content - in progress

## Profile
Click on user in Sidebar. 
This page show all info about user (full name, job title, email, phone, ....) and go to edit page.

Also you can open other users profile but cant edit.

## All users
link to this page is in sidebar menu "All users"
This page show a list with all users under IMS folder

## Edit Page
From your profile you can navigate to this page by clicking on "Edit Profile" button.

## Change Password
Click "Change Password" in Sidebar. 