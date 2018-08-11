const browser = chrome;

function getStorage() {
  return localStorage.getItem('tabMapping');
}
function getAllTabs(text) {
  text.value = text.value.toLowerCase();
  console.log('getting all tabs');

  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].active) {
        //chrome.tabs.sendRequest(tabs[i].id, { action: "getDOM" }, function (response) {
          try {
            //console.log(response.dom);
            //chrome.tabs.sendMessage(tabs[i].id, {action: "alterDom", data: "<div>test</div>"}, function(response) {}); 
          } catch (e) {

          }
        //});
      }
      if (text.id == 'url') {
        if ((tabs[i].url.toLowerCase()).match(text.value)) {
          chrome.tabs.update(tabs[i].id, { active: true });
          return true;
        }
      } else if (text.id == 'title') {
        if ((tabs[i].title.toLowerCase()).match(text.value)) {
          chrome.tabs.update(tabs[i].id, { active: true });
          return true;
        }
      } else if (text.id == 'tag' && tabs[i].active) {
        var tabss = [];
        var alreadySetTabs = JSON.parse(localStorage.getItem('tabMapping'));
        if (alreadySetTabs !== null) {
          for (var x in alreadySetTabs) {
            tabss.push(alreadySetTabs[x]);
          }
          tabss.push({ windowId: tabs[i].id, tagName: text.value });
          localStorage.setItem('tabMapping', JSON.stringify(tabss));
        } else {
          tabss.push({ windowId: tabs[i].id, tagName: text.value });
          localStorage.setItem('tabMapping', JSON.stringify(tabss));
        }
        //console.log(text.value);
        //calls to content script
        //chrome.tabs.sendMessage(tabs[i].id, { action: "showTagList", data: localStorage.getItem('tabMapping') }, function (response) { });
        //calls to main.js
        chrome.runtime.sendMessage( { action: "showTagList", data: localStorage.getItem('tabMapping') }, function (response) { });
        return true;
      } else if (text.id == 'get-tag') {
        var tabMapping = JSON.parse(localStorage.getItem('tabMapping'));
        for (var i in tabMapping) {
          if (text.value == tabMapping[i].tagName) {
            chrome.tabs.update(tabMapping[i]['windowId'], { active: true });
            //console.log(text.value);
            return true;
          }
        }
      } else if (text.id == 'clear-tags') {
        localStorage.clear();
        return true;
      } else if (text.id == 'list-tags') {
        for (var i in tabs) {
          if (tabs[i].active) {
            
            this.storage = localStorage.getItem('tabMapping');
            return true;
          }
        }

      }
    }
  });
}