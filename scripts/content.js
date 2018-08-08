chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "getDOM")
      console.log(sendResponse({dom: document.body.innerHTML}));
    
    else
      sendResponse({}); 
   });

   chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.action == "alterDom")
        //document.body.innerHTML = request.data;
    });

   