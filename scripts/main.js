var bgPage = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
  var search = document.getElementsByClassName('search');
  
  for(var s of search){
    s.addEventListener('keypress', function(e) {
      if(e.keyCode === 13){
        bgPage.getAllTabs(e.target);
      }
    });
  }
  var button = document.getElementById('clear-tags');
  button.addEventListener('click', function(e) {
    bgPage.getAllTabs(e.target);
    
  });
  var button2 = document.getElementById('list-tags');
  button2.addEventListener('click', function(e) {
    document.getElementById('list-tags-placeholder').innerHTML = bgPage.getStorage();    
  });
  respondToVisibility = function(element, callback) {
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
    if(visible) {
      console.log('visible');
      document.getElementById('get-tag').focus();
     }
     else {
       console.log('invisible');
     }
  });

  
});



