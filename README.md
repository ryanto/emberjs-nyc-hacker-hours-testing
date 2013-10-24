# Testing Ember Examples

### What's here

I've included a few basic examples of situations you may want to test in
an Ember application. I'll add some more over the next few days. 

If there are specific things you are having trouble testing in Ember
please email me at [ryanto@gmail.com](mailto:ryanto@gmail.com) and I'll
be sure to add them to this repo.

### Example Structure

Every example has three files.

* ``index.html``: Bootstrap for libraries, app, and tests. Also this is where templates
are defined.
* ``app.js``: The Ember application.
* ``tests.js``: The tests for the app.

### Run the examples

Serve this directory over http: ``ruby -run -e httpd . -p 5000``

Visit [http://localhost:5000](http://localhost:5000).

Load an Ember app from a directory, to run tests just append ``?tests``
onto the URL.
