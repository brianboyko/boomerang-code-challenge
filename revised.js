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

  function randomInteger(max) {
    return Math.floor(Math.random() * max);
  }

  function uniquePicks(numPicks, set) {
    var setCopy = set.slice(); // splice modifies the array and we do not want to modify original;
    var picks = [];
    var p;
    while (picks.length < numPicks){
      picks.push(setCopy.splice(randomInteger(setCopy.length), 1)[0])
    }
    return picks;
  }

  function choose_multiple_emails(num) {
    // if num is undefined or not a number, default to 1.
    // if num is not an integer (i.e, a float), default to Math.floor(num);
    //   assuming that Math.floor(anyInteger) => anyInteger;
    num = isNaN(num) ? 1 : Math.floor(num);
    // declare outside forEach;
    var $msg;
    var messages = jQuery(".xW.xY:visible").parent();
    var chosenMessages = uniquePicks(num, messages);
    chosenMessages.forEach(function(msg) {
      $msg = jQuery(msg);
      $msg.css("background-color", "#3a8bf7");
      $msg.find(".yW,,.y6,.xW.xY").css("color", "#fff").css("font-weight", "bold");
      $msg.find(".y2").css("color", "#d4e1ff").css("font-weight", "normal");
    })
  }

  if (document.location.toString().indexOf("mail.google.com") == -1) {
    alert("Click on this bookmarklet when you are viewing your Gmail Inbox.");
  } else if (typeof jQuery == "undefined") {
    loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js');

    // wouldn't it be better to simply use the callback feature of loadScript() rather than
    // polling here? Or is there a delay between when the script is added to the DOM
    // and when the jQuery variable is assigned?
    // merits further investigation.
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
