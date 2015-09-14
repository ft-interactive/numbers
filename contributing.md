# Contributing

### First time

Clone this repo and install dependencies.

```shell
git clone https://github.com/ft-interactive/numbers.git && \
cd numbers && \
npm install

```

### Run the code locally

The simple way is to start the server, and build the client code (js, css, compress images etc) with one command.

```shell
npm run watch
```

However you might find it handy to run the following two commands in side by side terminal windows.

The first starts and watches the server for changes. It also start a BrowserSync session to reload the browser.

```shell
npm run watch-server
```

The second builds the clientside Javascript and Sass code and compresses images. It will also watch for changes and rebuild.

```shell
npm run watch-client
```

### Making code changes

Follow this workflow:

#### Make local changes
* Create a branch, be sure to branch from master. eg `git checkout -b my-branch`
* Make code changes in the branch
* Commit: use an informative commit message

#### Push to Github
* Push commits to Github. eg `git push origin my-branch`
* When you are ready, make a Pull request (PR) on Github
* Tell others about the PR if they'd like to see what you're working on
* Keep pushing your changes to GH regularly

#### Check the Heroku review app
* When the PR is made, a Heroku app is automatically provisioned. The name of the app corresponds to the PR number. eg for PR #123 the app will be at `http://ft-ig-numbers-pr-123.herokuapp.com`
* check your changes on the Heroku app is ok
* if not, make more changes to the PR and they will automatically get deployed to Heroku

#### Get a code review
when you think you changes are ready to go live
* Rebase to master and squash commits
* Ask someone else to have a look at the PR. if they like it and don't want you to make a few changes
* it's up to you to now merge the PR into the master branch.

#### Go live
* code merged into master then automatically gets deployed to a Heroku staging app: `http://ft-ig-numbers-s.herokuapp.com`
* A successful build on the staging environment will then get promoted to live.
