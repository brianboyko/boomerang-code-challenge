(function() {

  /*
    function loadScript does not seem to need any editing.
   */
  // loadScript lets us load jQuery without violating Gmail's Content Security Policy
  function loadScript(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function() {
      if (req.readyState != 4 || req.status != 200) {
        return;
      }

      // Taken from jquery source.  Ensures code is evaluated in global scope
      var script = document.createElement("script");
      script.text = req.responseText;
      document.head.appendChild(script).parentNode.removeChild(script);

      if (callback) {
        callback();
      }
    };
    req.send();
  }
  /* The absolute, brain-deadest simplest way to solve this might be just to call the "Choose an email" function multiple times.
     This does not, however, guarantee that the same message would not be highlighted the same amount of times.
     Instead, what would be better would be simply to gather three unique indices from the array of []messages. */
  function choose_an_email() {
    var messages = jQuery(".xW.xY:visible").parent();
    var chosenIndex = Math.floor(Math.random() * messages.length);
    var chosenOne = jQuery(messages[chosenIndex]);
    chosenOne.css("background-color", "#3a8bf7");
    chosenOne.find(".yW,,.y6,.xW.xY").css("color", "#fff").css("font-weight", "bold");
    chosenOne.find(".y2").css("color", "#d4e1ff").css("font-weight", "normal");
  }
  // do not like this solution. Is O(n^2) in worst case. More efficient algorithm later - think I can get O(n);
  function uniquePicks(numPicks, set) {
    var picks = [];
    var rand; // initialized outside of loop.
    while (picks < numPicks) {
      rand = Math.floor(Math.random() * set.length);
      if (picks.indexOf(set[rand]) > -1) {
        continue;
      }
      picks.push(set[rand]);
    }
    return picks;
  }

  function choose_multiple_emails(num) {
    var messages = jQuery(".xW.xY:visible").parent();
    var chosenMessages = uniquePics(num, messages);
    chosenMessages.forEach(function(msg){
      msg.css("background-color", "#3a8bf7");
      msg.find(".yW,,.y6,.xW.xY").css("color", "#fff").css("font-weight", "bold");
      msg.find(".y2").css("color", "#d4e1ff").css("font-weight", "normal");
    })
  }


  if (document.location.toString().indexOf("mail.google.com") == -1) {
    alert("Click on this bookmarklet when you are viewing your Gmail Inbox.");
  } else if (typeof jQuery == "undefined") {
    loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js');

    // wouldn't it be better to simply use the callback feature of loadScript() rather than
    // polling here?
    function wait_for_jquery() {
      if (typeof jQuery == "undefined") {
        setTimeout(wait_for_jquery, 500);
      } else {
        choose_multiple_emails(3);
      }
    }

    wait_for_jquery();
  } else {
    choose_multiple_emails(3);
  }
})();
