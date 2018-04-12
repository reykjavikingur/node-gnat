# Gnat

Gnat is a utility for Node starter kit generators.
It is intended to serve as a simple installation process.
It clones a Node module from a Git repository,
detaches it from its upstream,
and resets any identifying fields in `package.json`,
prompting as necessary.

## Installation

`npm install -g gnat`

## Usage

`gnat clone GIT-REPO-URL TARGET-PATH`

## Example

Suppose I have a Github repository `https://github.com/edgar/static-site-generator`,
which I would like to clone as a new, separate Node project in the directory `my-example-site`

You would run the command:

`gnat clone edgar/static-site-generator my-example-site`

Effects:
* clone the repository into the given path
* prompt you for `package.json` changes (similar to `npm init`)
* remove `repository` from `package.json`
* remove `.git` in your new path

You can then change to your new directory, do your installations, and attach to a new repository.


## TODO

* after prompting for package.json fields, it should show resulting changes and prompt for confirmation (default "y")
* have registry mapping simple names to git urls to clone and allow searching with subcommand "list"
