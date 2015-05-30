# Gulp task gui runner

![screenshot](http://i.imgur.com/21XjmxU.png)

## Build & Run 
on the gulpfile, change the Platform variable in Globals to the one you need for you current platform:
```
var Globals = {
    Platform : "win64",// osx32/osx64/linux32/linux64/win32/win64
    nwVersion : "0.12.2"
};
```

And then run the following commands:
```
$ npm install
$ gulp build
$ gulp default
```