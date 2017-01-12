please also include a description of some test cases that you would want to verify your solution against before shipping it to customers.

Test cases:

choose_multiple_emails();

* parameter "num" in choose_multiple_emails is undefined or not a number:

Behavior: Should choose one email to highlight.

* parameter "num" in choose_multiple_emails is a float, not an integer:

Behavior: Should choose the nearest integer without going over (i.e, Math.floor(num));

* parameter "num" in choose_multiple_emails is larger than the length of the messages array;

i.e.: We're asking to highlight more messages than are showing.

Behavior: Should highlight all e-mails.

* There are no messages;

Behavior: Console.log a warning, other than that, no-op.

* each message needs to be hooked into jQuery so that it has the .css properties.

uniquePicks();

* setCopy should decrease in length during each loop.

Test (temporarily) via console.log; use an assert in more formal testing that old setCopy.length = new setCopy.length + 1;

wait_for_jquery();

* wait_for_jquery should never terminate when jQuery is unavailable;

* Possible TODO: if jQuery does not load at all, possibility for infinite loop here.
Perhaps a overall timeout to prevent this behavior, or a counter to limit the number of retries?

* Can we use the callback feature of loadScript() to load the script rather than relying
on polling here?  The great strength of JS is through asynchronous functionality; I think
this is worth investigation.
