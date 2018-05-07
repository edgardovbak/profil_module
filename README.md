# How to use package
More info you can find on https://reactjs.org/tutorial/tutorial.html

# Nead to install!
Install Node.js. You can download it from https://nodejs.org/en/

Open node.js cmd and create new app with npm install 
```
-g create-react-app create-react-app my-app
```

This package also use other modules.
You need to install it with 

```
npm install redux --save --save-exact 
npm install react-redux --save --save-exact 
npm install --save @sensenet/redux
npm install --save @sensenet/client-core
npm install react-router-dom --save-exact 
```

# Start Using Profile module
Delete all files in the src/ folder of the new project (don’t delete the folder, just its contents).
Go to the app folder cd "my-app"
Run 
```
npm start
```

Copy files from [downloaded package]/src and paste it to src folder in created app (my-app/src).

Done.

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