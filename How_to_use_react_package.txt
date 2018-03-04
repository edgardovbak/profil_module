How to use package

More info you can find on https://reactjs.org/tutorial/tutorial.html

To use package you need

1. Install Node.js. You can download it from https://nodejs.org/en/
2. Open node.js cmd and create new app with
    npm install -g create-react-app
    create-react-app my-app

    2.1 This package also use other modules. You need to install it with
        npm install redux --save --save-exact
    2.2
        npm install react-redux --save --save-exact
    2.3
        npm i redux-thunk --save
    2.4
        npm i redux-devtools-extension --save
3. Delete all files in the src/ folder of the new project (don’t delete the folder, just its contents).
4. Go to the app folder
    cd my-app
5. Run
    npm start
6. Copy files from [downloaded package]/src and paste it to src folder in created app (my-app/src).


Done

Other options

SASS compilation in package.

To use SASS in project doo this steps:
1. Run another cmd
2. Go to folder with your app
3. run
    npm install gulp gulp-ruby-sass gulp-autoprefixer
4. Start compile files with running a simple command
    gulp

Done.

All files is in src/scss folder. Do some changes in this files save it. Gulp compile files from this folder and change App.css.
After then react-app detect changes in styles and change it in build folder.
