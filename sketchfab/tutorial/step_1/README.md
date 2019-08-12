# Radical Inside : Tutorial part 1 

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer 

## Inital setup
- In this first part of the tutorial we will setup the initial code structure to be used. 
- The code is a webpage and runs in a webbrowser. To make a webpage we use a combination of html, css and javascript. Lets start by making the html document with the necessary html.
- Paste the boilerplate code below into a code editor of your choice. 

```
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="UTF-8">
        <title> Sketchfab - Radical Inside </title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- add sketchfab library here -->
    </head>

    <body>
        <!-- add iframe here -->
        <!-- add link your code here -->
    </body>
</html>
```

- Save the file as "index.html" in a folder called sketchfab3d. 
- Your folder structure should now look like this: 

```
/sketchfab3d/index.html
```

### Html structure
- The boilerplate webpage has an autonomy consisting of html element and inside the element a head and a body.

### Link the library code 
- In the head we will link to the sketchfab library so we can use its 3D functions of sketchfab.com.
- Go to https://sketchfab.com/developers/viewer and click on the link. 
    - "Insert this script in your page: sketchfab-viewer-1.5.1.js." 
    - You see a page of compressed code. right click to save the page.
    - Save the page as "sketchfab-viewer.js" in the folder /sketchfab3d/js/
    - (you need to create a folder called "js" in your sketchfab3d folder)
    - At the end of the body we will link to the library code.
    - under the instruction "add sketchfab library here" write: 
```
<script type="text/javascript" src="./js/sketchfab-viewer.js"></script>
```

### Link your script file
- Create an empty file called "myScript.js" and save it in the js folder
- Your folder structure should now look like this: 
```
/sketchfab3d/index.html
/sketchfab3d/js/myScript.js
/sketchfab3d/js/sketchfab-viewer.js
```
- under the instruction "add link your code here" write: 
```
<script type="text/javascript" src="./js/myscript.js"></script>
```
- Now we have linked the files that we need to start coding the project

### Add target iframe
- In the body we will finally add an iframe (a webpage within a webpage) where the animations from the sketchfab models will play.
- under the instruction "add iframe here" write: 
```
  <iframe src="" id="api-frame" class="api-frame" allow="autoplay; fullscreen; vr"
            allowvr allowfullscreen mozallowfullscreen="true"
            webkitallowfullscreen="true" width="100%" height="800px"></iframe>
```
### Edges of an empty window
- If you open on the index.html file i a web browser you should see an the edges of an empty window. 
