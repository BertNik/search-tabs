var bgPage = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function () {
  var search = document.getElementsByClassName('search');

  for (var s of search) {
    s.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        bgPage.getAllTabs(e.target);
      }
    });
  }
  var button = document.getElementById('clear-tags');
  button.addEventListener('click', function (e) {
    bgPage.getAllTabs(e.target);
    var listTagsPlaceholder = document.getElementById('list-tags-placeholder');
    listTagsPlaceholder.setAttribute('data','');
    var autoFill = document.getElementById('auto-fill');
    autoFill.innerHTML = '';
    
    var fadeIn_fadeOut = function(){
      var count = 1;
      var increase = true;
      var iterate = 0;
      var intID = setInterval(function(){
        document.getElementsByClassName('button')[0].style.opacity = 1 - (400/10000)*count;
        if(document.getElementsByClassName('button')[0].style.opacity < .5 || !increase){
          count = count -1;
          if(document.getElementsByClassName('button')[0].style.opacity > .99){
            increase = true;
            if(iterate > 0){
              clearInterval(intID);
            }
          }else{
            increase = false;
            iterate++;
          }
        }else if(increase){
          count = count + 1.5; 
        }
      },30);
      }
      fadeIn_fadeOut();
  });
  
  var button2 = document.getElementById('list-tags');
  button2.addEventListener('click', function (e) {
    var listTagsPlaceholder = document.getElementById('list-tags-placeholder');
    listTagsPlaceholder.setAttribute('data', btoa(bgPage.getStorage()));
    
    var data = JSON.parse(atob(listTagsPlaceholder.getAttribute('data')));
    var select = "";
    for(var y in data){
      select += '<option value="' + data[y].tagName +'">' + data[y].tagName + '</option>';
    }
    var autoFill = document.getElementById('auto-fill');
    autoFill.innerHTML = select;
  });
  respondToVisibility = function (element, callback) {
    var options = {
      root: document.documentElement
    }
    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry.intersectionRatio > 0);
      });
    }, options);

    observer.observe((element));
  }

  respondToVisibility(document.getElementById("url"), visible => {
    const feedbackEl = document.getElementById("visibilityFeedback");
    if (visible) {
      button2.click();
      document.getElementById('get-tag').focus();
    }
    else {
      console.log('invisible');
    }
  });

  chrome.runtime.onMessage.addListener(
    //call from background.js
    function(request, sender, sendResponse) {
        if (request.action === "showTagList") {
          button2.click();
        }})


});



