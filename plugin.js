(function($){
 $.fn.base64 = function(param){
 		var defaults = {
 		"customFileBrowser":true,
 		"inputStyle":"border:1px solid #efefef;height:36px;width:200px;border-radius:10px;",
 		"buttonRequired": true,
 		"buttonStyle":"border:1px solid #c8c8c8;border-radius:10px;background:white;height:36px;width:auto;margin-left:10px;cursor:pointer;",
 		"buttonText":"Choose a file",
 		"acceptableFormats":[],
 		"minSize":"",//in bytes
 		"maxSize":"",//in bytes
 		"minSizeErrorMessage":"File size is less than minimum expected size.",
 		"maxSizeErrorMessage":"File size is more than maximum expected size.",
 		"formatErrorMessage":"Selected file doesn't match with the specified formats.",
 		"onError":function(inst,errorCode,errMsg){
           console.log(errMsg);
 		},
 		"onSuccess":function(inst,base64Str){
 		}
 	};
 	try{
 	var settings = param ? $.extend(defaults,param) : defaults;
 	if(isNaN(settings.minSize) || isNaN(settings.maxSize)) throw "not a number";
 	var fileConverterObj = new Object();
 	fileConverterObj.base64Str = "";
 	fileConverterObj.settings = settings;
 	if(settings.minSize > settings.maxSize) throw "minSize can't be higher than maxSize";
        $(this).attr("type","file");
	 if(settings.customFileBrowser){
	 	$(this).css("display","none");
	 	var customFileBrowser = '<div><input id="'+$(this).attr("id")+'customFileBrowser" onclick="triggerFileBrowser(&quot;'+$(this).attr("id")+'&quot)" style="'+settings.inputStyle+'"/>';
	 	if(settings.buttonRequired){
	 		customFileBrowser +='<button onclick="triggerFileBrowser(&quot;'+$(this).attr("id")+'&quot)" style="'+settings.buttonStyle+'">'+settings.buttonText+'</button></div>';
	 	}else{
	 		customFileBrowser += '</div>';
	 	}
	 	$(this).parent().append(customFileBrowser);
	 }
	 $(this).on("change",function(){
	 	fileChanged(this,fileConverterObj);
	 });
	 return fileConverterObj;
 	}catch(err){
	   console.log(err);
 	}
 };
     triggerFileBrowser = function(inputId){
    	$("#"+inputId).trigger("click");
    };
    function fileChanged(obj,fileConverterObj){
    	var fileObj = obj.files[0];
        if(fileConverterObj.settings.minSize != ""){
        	if(fileObj.size < fileConverterObj.settings.minSize){
        		fileConverterObj.settings.onError(obj,"Err_minSize",fileConverterObj.settings.minSizeErrorMessage);
        		return false;
        	}
        }
        if(fileConverterObj.settings.maxSize != ""){
        	if(fileObj.size > fileConverterObj.settings.maxSize){
        		fileConverterObj.settings.onError(obj,"Err_maxSize",fileConverterObj.settings.maxSizeErrorMessage);
        		return false;
        	}
        }
        if(fileConverterObj.settings.acceptableFormats.length > 0){
            if(fileConverterObj.settings.acceptableFormats.indexOf(fileObj.type) < 0){
            	fileConverterObj.settings.onError(obj,"Err_fileType",fileConverterObj.settings.formatErrorMessage);
        		return false;
            }
        }
    	if(fileConverterObj.settings.customFileBrowser){
           $("#"+$(obj).attr("id")+"customFileBrowser").val($(obj).val());
    	}
    	var webworkerReader = new FileReader();
    	webworkerReader.onload = function(){
        var binaryStr = webworkerReader.result;
        var base64Str = btoa(binaryStr);
        fileConverterObj.base64Str = base64Str;
        fileConverterObj.settings.onSuccess(obj,base64Str);
    };
     webworkerReader.readAsBinaryString(fileObj);
    }
})(jQuery);