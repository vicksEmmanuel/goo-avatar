![Image of goo-avatar](https://github.com/vicksEmmanuel/goo-avatar/raw/master/public/goo-avatar.PNG)

Create Server-Side avatars on the fly

## Getting Started
--------------------------------------------------------------

```javascript
  npm install goo-avatar --save
```

ES6

```javascript
    import gooAvatar from 'gooAvatar';

    gooAvatar.inSVG('User Name','destination/path').then(svg_path => {
        console.log(svg_path) //destination/path/21djde-2hdjd....svg
    }).catch(err => {
        console.log(err);
    });
    
    gooAvatar.inPNG('Company Name','destination/path').then(png_path => {
        console.log(png_path) //destination/path/21djde-2hdjd....png
    }).catch(err => {
        console.log(err);
    });
```

  If a path is not specified, it creates a default avatar path
  
  ```javascript
    gooAvatar.inPNG('Goo-Avatar').then(png_path =>{
      console.log(png_path) //avatar/2ieod-dkkd...png
    })
    .catch(err => console.log(err)});
  ```
  ## Input
  ---------
  Type: String 
  
  The Input can be one of: A String. a path can also be sepcified in String
  
  ## Output
  ----------
  Type: SVG, PNG, String
  
  It returns a String specifying the path of the created avatar SVG or PNG
  
  
  ## Example
  -----------
  
  ```javascript
    gooAvatar.inSVG('Goo-Avatar','destination/path').then(png_path =>{
      console.log(png_path); //destination/path/c1f9dcd0-4980-11e9-8537-231ee6fd230b.svg
    })
    .catch(err => console.log(err)});
  ```
  
  ```javascript
    app.use(express.static("destination/path/"));
  ```
  
  ```html
    <img src='destination/path/c1f9dcd0-4980-11e9-8537-231ee6fd230b.svg' style="width:100%;height:100%; border-radius:50%"/>
  ```
  
 ![Example images](https://github.com/vicksEmmanuel/goo-avatar/raw/master/public/example-avatar.PNG)
  
  
  ## Conclusion
  -----------
  
  Thanks for supporting. Don't forget to share with others
  
  
  ## Keywords
  ---------
  
  generate-avatar, create avatar, avatar, svg-avatar, goo-avatar