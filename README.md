# base64.js
jquery plugin for converting a file to base64 string

A simple plugin for converting any file to base64 string in browser which is File Reader API compatible.
Easy to understand,modify and use it in your project.

<b>How to use</b><br/>
Attach the latest JQuery.js/jQuery.in.js and the plugin.js provided.

It is very easy to implement the file converter, Just create an input tag and call the base64 merhod with it's ID.

```sh
<input id="fileBrowser"/>
<script>
$("#fileBrowser").base64();
</script>"
```

<b>Options</b><br/>
<ul>
<li>customFileBrowser</li>
<p>Boolean, default is true. This option specifies whether a custom Input element is required or not.
<br/></p>
<li>inputStyle</li>
<p>String, if the custome file browser provided by the plugin is used then Dev can specify the style(CSS) for that element.
Styles are not maintained in a different CSS file since there is very few styles we have used. If required the a class can be added to the HTML which gets injected through the script and add your CSS in your own stylesheets.
<br/></p>
<li>buttonRequired</li>
<p>Boolean,default is true. If the custom file browser is used then a button comes along with it.If it is not required for your project then you can only use the input element without the button by passing 'false'.
<br/></p>
<li>buttonStyle</li>
<p>String, If the custome button is used then Dev has the option to change the look of the button by passing the styles through this attribute.<br/></p>
<li>buttonText</li>
<p>String, If the custome button is used then Dev has the option to change the text of the button by passing a string through this attribute.<br/></p>
<li>acceptableFormats</li>
<p>an Array,this attribute accepts the format of the file which the Dev wants the user to select and then the base64.js to convert it to base64 string.<br/></p>
<b>Refer the below link for all the MIME types a browser can accept</b><br/>
<a>http://www.freeformatter.com/mime-types-list.html</a>
<p><br/></p>
<li>minSize</li>
<p>Number/String as number, A validation is performed for the minimum size of the file which the user can upload. If the validation is failed then the method passsed through the 'onError' attribute will be called.<br/></p>
<li>maxSize</li>
<p>Number/String as number, A validation is performed for the minimum size of the file which the user can upload. If the validation is failed then the method passsed through the 'onError' attribute will be called.<br/></p>
<li>onError</li>
<p>javascript function, a method which could be called when an error or exception occurs. The DOM object,Error code and the Error description are passed as the parameters to the method.<br/></p>
<li>onSuccess</li>
<p>javascript function, a method which is called when the file conversion is success. The DOM object and the base64 string is passed as the parameters to the method.<br/></p>
</ul>
<h3>Example</h3>
```sh
$("#fileBrowser").base64({
 		"customFileBrowser":true,
 		"inputStyle":"border:1px solid #efefef;height:36px;width:200px;border-radius:10px;",
 		"buttonRequired": true,
 		"buttonStyle":"border:1px solid #c8c8c8;border-radius:10px;background:white;height:36px;width:auto;margin-left:10px;cursor:pointer;",
 		"buttonText":"Choose a file",
 		"acceptableFormats":["text/html"],
 		"minSize":"",//in bytes
 		"maxSize":"",//in bytes
 		"minSizeErrorMessage":"File size is less than minimum expected size.",
 		"maxSizeErrorMessage":"File size is more than maximum expected size.",
 		"formatErrorMessage":"Selected file doesn't match with the specified formats.",
 		"onError":function(inst,errorCode,errMsg){
           console.log(errMsg);
 		},
 		"onSuccess":function(inst,base64Str){
 		});
```
