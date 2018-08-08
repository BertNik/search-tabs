const browser = chrome;
let tabUrls = {};

function getAllTabs(text){

  

  text.value = text.value.toLowerCase();
  console.log('getting all tabs');
  chrome.tabs.query({}, function(tabs){
      for (var i = 0; i < tabs.length; i++) {
        if(tabs[i].active){
          chrome.tabs.sendRequest(tabs[i].id, {action: "getDOM"}, function(response) {
            console.log(response.dom);
            chrome.tabs.sendMessage(tabs[i].id, {action: "alterDom", data: "<div>test</div>"}, function(response) {});  

          });
        }

        if(text.id == 'url'){
          if((tabs[i].url.toLowerCase()).match(text.value)){
            
            
            chrome.tabs.update(tabs[i].id, {active: true});
            return;
          }
        }else if(text.id == 'title'){
          if((tabs[i].title.toLowerCase()).match(text.value)){
            chrome.tabs.update(tabs[i].id, {active: true});
            return;
          }
        }
      }
  });
  return "<div>test</div>"
}