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

uniquePics();

* setCopy should decrease in length during each loop.

Test (temporarily) via console.log; use an assert in more formal testing that old setCopy.length = new setCopy.length + 1;
