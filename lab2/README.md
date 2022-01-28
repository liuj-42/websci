# Websci lab 2

This is the readme file for the first lab of Web Systems & Science class.
RCSID: liuj42
Link to repo for this class: https://github.com/liuj-42/websci
discord tag: `e g g#0507` or `nothing excessive#7009`

I took a look at 3 different APIs apart from the weather API that I used in the lab.
The first API I looked at was Discord's API. I had previously used it for a very simple bot so I had some very basic knowledge on it, but apart from that I had never looked that deep into the documentation. Discord has two main sections for the documentation, games and bots/apps. 
Discord's game API enabled you to

- Display rich game data on players’ profiles
- Send game invites to each other
- Ask to Join and Spectate their friends' games

while the bot/app API has a much bigger featureset. There are bots on Discord that range from playing the audio of a youtube video to people in the same voice channel to automating moderator duties, and when looking through the documentation, everything was laid out pretty well and I also found many third party guides that walked through setting up various types of bots. 
I think that the documentation for the API was well-structured and the search feature was also very useful.

The next API I took a look at was GitHub's REST API.
I took a look at the quickstart guide and documentation, and also at some third-party guides on how to use the API for some common tasks. I think that the quickstart guide provided by GitHub was very well-made and even included example HTTP headers and many ways to use the API, which I thought was very good. One thing that was different compared to Discord's API was that the quick start guide had many more scenarios and that it used the curl command.

The last API I looked at was youtube's API. It had pretty extensive documentation and examples for every single resource and method combination - there were two drop down menus, one for resource and one for method, and you could choose any of those two and then a table would list use cases. It also let you view examples of code for that use case in Python, PHP, Java, JavaScript, as a request header, and curl. One thing that I found to be interesting was that in order to use this API, I needed to create a project through the Google Developers Console and register my API there to actually use it.



That's about it for the researching about APIs part, so now I will be writing about the lab itself:

> Every lab you turn in will have a README.md file. This file will contain a running work log of everything you did for this lab. I especially want to know where you got stuck along the way and what you did to get out of being stuck. One to two sentences isn’t going to cut it here: this is the only opportunity you are going to get to document your own progression so take it seriously. At the end of the semester, I should be able to read through all the README.md files and have a good idea of your growth--as should you!

I didn't have too much trouble on implementing the actual API call and all that because I had experience doing that last semester for the GNH website where I did something similar to this, though I did add some extra features to this weather display, including animations which I want to learn more about. The majority of the time that I spent on this lab was researching APIs and then setting up node and express to serve the html page properly. I had no experience with working with node.js before, so I opted to follow some guides that I found with a quick google search. Getting node to serve a static HTML page with no CSS/JS was pretty easy, but I spent more time trying to figure out how to fix the fact that all of my GET requests were getting blocked and leaving me unable to have any external files being used on my site. I eventually found about using express in my node file, which then let me designate folders as "static", which would let me use them normally. The next problem that I had was trying to use a library that I had downloaded through npm. It was a css file, and because it was in my node_modules folder, I couldn't treat it as static so I had to move it to my static public folder that I used for other files. Before that though, I was having some trouble with being able to search up how to fix my problem, since the vast majority of node libraries are all javascript and the questions on stackoverflow or guides went over how to import the library through javascript while I didn't know if it would be similar through css. Eventually I stumbled upon a thread on stackoverflow and read some documentation about npm install, and I realized that the css file that I imported was just in a folder that I could use.



> Additionally, you must cite any tutorials/walkthroughs/YouTube videos/etc. that you used to create both the group portfolio and your personal portfolio. Plagiarism is no good! If you looked at it, you drop the link in your cited sources list. Simple as that. Failure to cite all referenced works will result in a zero for the assignment and a full letter drop in your final grade. When in doubt, email me or the TA.

[GitHub REST API - GitHub Docs](https://docs.github.com/en/rest)

[YouTube &nbsp;|&nbsp; Google Developers](https://developers.google.com/youtube)

[Discord Developer Portal](https://discord.com/developers/docs/resources/application)

https://openweathermap.org/

https://animate.style/

https://docs.npmjs.com/

[Getting Started Guide | Node.js](https://nodejs.org/en/docs/guides/getting-started-guide/)

[css - how to export and import style in npm package? - Stack Overflow](https://stackoverflow.com/questions/40368015/how-to-export-and-import-style-in-npm-package)

[Express/Node introduction - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)

npmjs.com/package/cors

[How To Serve Static Files in Express | DigitalOcean](https://www.digitalocean.com/community/tutorials/nodejs-serving-static-files-in-express)