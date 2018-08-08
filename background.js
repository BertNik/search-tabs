const browser = chrome;
let tabUrls = {};

function getAllTabs(text){

  text.value = text.value.toLowerCase();
  console.log('getting all tabs');
  chrome.tabs.query({}, function(tabs){
      for (var i = 0; i < tabs.length; i++) {
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
  
}