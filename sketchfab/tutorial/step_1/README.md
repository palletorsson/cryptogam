# Radical Inside : Tutorial part 1 

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer 

## Inital setup
- In this first part of the tutorial we will only setup the initial code structure. 
- The code is a webpage and runs in a webbrowser 
- To make a webpage we use a combination of html, css and javascript.

- Lets start by making the html document with the necessary html.
- Paste the boilerplate code below into a code editor of your choice. 

```
<!DOCTYPE HTML>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- add sketchfab library here -->
    </head>

    <body>
        <!-- add iframe here -->
        <!-- add local link to ./js/myscript.js -->
    </body>
</html>
```

- Save the file "index.html" in a folder called sketchfab3d. 
- Your folder structure should now look like this 

```
/sketchfab3d/index.html
```

### Html structure
- The boilerplate webpage has an autonomy consisting of html element and inside that element a head and a body.

### Link files
- In the head we will link to the javascript library so we can use its 3D functions of sketchfab.com.
- Go to https://sketchfab.com/developers/viewer and click on the link. 
    - "Insert this script in your page: sketchfab-viewer-1.5.1.js." 
    - You see a page of of compressed code. right click to save the page.
    - Save the page as "sketchfab-viewer.js" in the folder /sketchfab3d/js/
    - (you need to create a folder called "js" in your sketchfab3d folder)
    - At the end of the body we will link to the javascript that will take care of the interaction.
    - under the instruction "add sketchfab library here" write: 
```
<script type="text/javascript" src="./js/sketchfab-viewer.js"></script>
```
- Create an empty file called "myscript.js" and save it in the js folder

- Your folder structure should now look like this: 
```
/sketchfab3d/index.html
/sketchfab3d/js/myscript.js
/sketchfab3d/js/sketchfab-viewer.js
```
- Now we have link the library and our script in the webpage and the interative code.


### Add target iframe
- in the body we will add an iframe, a webpage within a webpage, where the animations will play.
