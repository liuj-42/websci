# Websci lab 3

This is the readme file for the third lab of Web Systems & Science class.
RCSID: liuj42
Link to repo for this class: https://github.com/liuj-42/websci
discord tag: `e g g#0507` or `nothing excessive#7009`


> Every lab you turn in will have a README.md file. This file will contain a running work log of everything you did for this lab. I especially want to know where you got stuck along the way and what you did to get out of being stuck. One to two sentences isn’t going to cut it here: this is the only opportunity you are going to get to document your own progression so take it seriously. At the end of the semester, I should be able to read through all the README.md files and have a good idea of your growth--as should you!

I spent a lot of time trying to get this project working. I'd say that the majority would be getting (more) familiar with node and express and understanding how it worked in tandem with my front end. I was looking around for API's until I found Spotify's API and I thought that something that could view your recently played tracks and do stuff with that would be a good idea, so I decided to go ahead and try it out. The only other API I had ever worked with was the openweather API, which only had one authorization token that worked fine and didn't need anything else. This was my first time going through the OAuth 2.0 flow, which was very confusing for me at first. I also spent a lot of time pretty much banging my head against a wall, trying to start this project from scratch until I finally decided to use the code provided by Spotify in their qucik start guide. Once I got my hands on that and saw a bit of how it worked, I was able to get started pretty quickly after that. I also learned how to use insomnia to test out my back end and make sure that my calls were working as intended. There were a lot of times that I got stuck during this lab, but I think that the majority was from a lack of understanding of what to do rather than how to do something. For example, in the beginning I was not too sure on how my API would work when I would just be using Spotify's API, but once I started actually writing down code I was able to understand what was going on a lot better.

As of now, my API has several GET endpoints but nothing more. There are planned POST, PUT, and DELETE endpoints but as the lab did not require me to implement them, I have just created mock versions of them that do nothing. My GET calls are for logging in to get an authorization token, viewing the user's 20 most recently played tracks, and checking to see if a  track has been liked by the user or not. I plan on having a PUT call to like a track, a DELETE call to remove said like, and a POST call to add a track to a playlist. As I work on this project, I will probably add more calls too. In my code I have comments on where the POST/PUT/DELETE calls would be.

> Additionally, you must cite any tutorials/walkthroughs/YouTube videos/etc. that you used to create both the group portfolio and your personal portfolio. Plagiarism is no good! If you looked at it, you drop the link in your cited sources list. Simple as that. Failure to cite all referenced works will result in a zero for the assignment and a full letter drop in your final grade. When in doubt, email me or the TA.

https://developer.spotify.com/documentation/web-api/reference/#/

https://developer.spotify.com/documentation/web-api/quick-start/

https://stackoverflow.com/questions/15097315/change-onclick-attribute-with-javascript/23412811

https://feathericons.com/

https://icons.getbootstrap.com/icons/

https://stackoverflow.com/questions/755885/how-do-i-make-jquery-wait-for-an-ajax-call-to-finish-before-it-returns

https://stackoverflow.com/questions/20211890/svg-change-fill-color-on-button-click

https://stackoverflow.com/questions/53110707/javascript-promises-with-ajax

https://stackoverflow.com/questions/3302702/jquery-return-value-using-ajax-result-on-success

https://stackoverflow.com/questions/630453/what-is-the-difference-between-post-and-put-in-http

and a bunch more links that i didnt write down