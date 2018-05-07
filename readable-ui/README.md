
# readable-ui

_Readable_ is a React application that enables users to post content. These posts can
be upvoted or downvoted, and commented on by all users.

This is project 2 of the Udacity React training course.

It uses [redux](https://github.com/reactjs/react-redux) to manage application state, and
[react router](https://github.com/ReactTraining/react-router) for navigation. Both of
which are awesome!

## Getting Started

This application requires that [NodeJS](https://nodejs.org/en/) is installed, which provides
the npm (node package manager) command.

The backend server should also be running (_../api-server_). If successful you should be able
to see the REST interface detailed here:

<pre>
    http://localhost:3001/
</pre>

Next install the application dependencies, as follows:

<pre>
    $ npm install
</pre>

And finally start the UI application itself:

<pre>
    $ npm start
</pre>

Use a browser to navigate to here:

<pre>
    http://localhost:8080/
</pre>


## Notes:

* Users can only post withing a category page. This is intendend so that the user sees
  the context of the category and the other posts within it.

* Don't seem to be able to go directly to a routed page, only the _all_ page. So can't
  go directly to a category. E.g., if copy this into another browser tab:

<pre>
  http://localhost:8080/react
<pre>

* I could have improved the buttons (Edit Post, Delete Post) on the post page, so they
  are at the top-right, similar to the 'Sort by' menu.

## Screenshot

!(https://github.com/stallmanwotr/reactnd-readable/tree/master/readable-ui/screenshot1.png "Screenshot 1")

## License

MIT

