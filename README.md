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

`gnat clone git-repo-url target-path`

## Example

Suppose I have a Git repository for "static-site-starter",
which I would like to clone as a new, separate Node project.

`gnat clone https://github.com/reykjavikingur/static-site-generator.git my-example-site`

The command above will create a Git clone of the repository at the given URL,
put it into the directory `my-example-site`.
Then it will prompt the user for Node package input, similar to `npm init`.
It will also delete `my-example-site/.git`
and remove the "repository" field from `package.json`

