(function() {

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

  /**
   * randomInteger() - provides a random integer from 0 (inclusive) to the maximum provided(non-inclusive);
   * @param {Number: integer} max: Maximum (non-inclusive) possible number to roll.
   *    randomInteger(6), for example, will return either 0, 1, 2, 3, 4, or 5;
   * @return {Number: integer} A random integer from 0 to max -1;
   * */
  function randomInteger(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * uniquePicks() - selects a number of unique values from the array;
   *
   * NB: The more I think about this, the more I don't like this solution.
   * Yes, it works, but the splice() operation is O(n) in worst case, and we call it
   * once for each pick, making this an O(n^2) operation.
   *
   * The other way to go about this would be to pick the numbers at random and check for
   * but that has a worst case scenario of O(infinity); in practice, though,
   * one could get the indicies, and slice, making O(1) in the best case.
   * However, that might be overoptimization at this stage.
   *
   * @param  {Number:integer} numPicks The quantity of items to get from the array;
   * @param  {Array} coll (short for "collection") The array from which to choose the unique picks.
   * @return {Array} An array containing the number of unique pics from the set provided;
   */
  function uniquePicks(numPicks, coll) {
    if(coll.length < numPicks){
      return coll.slice(); // we want to return a copy, not the original array;
    }
    var collCopy = coll.slice(); // splice modifies the array and we do not want to modify original;
    var picks = [];
    var p;
    while (picks.length < numPicks) {
      picks.push(collCopy.splice(randomInteger(collCopy.length), 1)[0])
    }
    return picks;
  }

  /**
   * choose_multiple_emails() - highlights multiple e-mails.
   * @param {Number} num - the number of messages to highlight.
   *   @default if isNaN(num), defaults to 1; if !Number.isInteger(num), defaults to Math.floor(num);
   * @return void;
   * @sideEffect: "num" random messages are highlighted;
   */
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
