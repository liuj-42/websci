# Websci lab 1
This is the readme file for the first lab of Web Systems & Science class.
RCSID: liuj42
Link to repo for this class: https://github.com/liuj-42/websci
discord tag: `e g g#0507` or `nothing excessive#7009`

> Every lab you turn in will have a README.md file. This file will contain a running work log of everything you did for this lab. I especially want to know where you got stuck along the way and what you did to get out of being stuck. One to two sentences isn’t going to cut it here: this is the only opportunity you are going to get to document your own progression so take it seriously. At the end of the semester, I should be able to read through all the README.md files and have a good idea of your growth--as should you!

I think that this lab was a nice refresher on working on web development, and I got to learn some new things about javascript to boot. One thing that was interesting was using async with my ajax functions to make my code wait for the ajax function to successfully return data. I had previously used this before for my websys term project with a similar use case, but this time I also learned that I could use it with just about anything, and I learned about promises and deferreds. One thing that I got stuck on for a bit was on making the news ticker part of the news ticker - I had ideas and I think that if I worked on it enough, I could definitely create my own news ticker from scratch with CSS animations, but I had next to no experience in it and had already invested lots of time in getting the data parsed properly. After lots of searching I found a news ticker template that was open source and looked appealing, so I decided to build my news ticker off of that. 

Another thing - the lab mentioned that I needed to be getting my data from a json file, but the majority of my data was through the rss feeds themselves and were not stored in a json file, although they are treated as json objects when I use them. I did implement a fallback mechanism of sorts where if the ajax call to get the data from the rss feeds fails, it uses a local json file that has articles and such already stored inside it.  


> Additionally, you must cite any tutorials/walkthroughs/YouTube videos/etc. that you used to create both the group portfolio and your personal portfolio. Plagiarism is no good! If you looked at it, you drop the link in your cited sources list. Simple as that. Failure to cite all referenced works will result in a zero for the assignment and a full letter drop in your final grade. When in doubt, email me or the TA.

http://www.w3big.com/jquery/misc-when.html
https://www.jqueryscript.net/slider/Responsive-jQuery-News-Ticker-Plugin-with-Bootstrap-3-Bootstrap-News-Box.html
https://github.com/gagi270683/jQuery-bootstrap
https://stackoverflow.com/questions/19674380/execute-jquery-function-after-another-function-completes/19674400
https://stackoverflow.com/questions/5280699/jquery-when-understanding
https://www.w3schools.com/js/js_async.asp
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
https://www.cnet.com/rss/
https://stackoverflow.com/questions/377644/jquery-ajax-error-handling-show-custom-exception-messages
https://api.jquery.com/jquery.ajax/
https://stackoverflow.com/questions/20890943/javascript-settimeout-not-working
https://www.w3schools.com/jsref/met_win_settimeout.asp
https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
https://stackoverflow.com/questions/8252638/executing-javascript-after-x-seconds

> Additionally, open source code needs to actually follow the terms of the license (this usually means including an unmodified copy of the license somewhere in your repo–it is against the law to modify someone else’s license in any way, for any reason).

I used a news ticker template from this repository: https://github.com/gagi270683/jQuery-bootstrap

It is under the MIT license, and the license from the original repository is included in this lab folder under the LICENSE file.
