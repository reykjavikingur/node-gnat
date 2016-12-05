/*
This is the file for the bin command "gnat" that is installed globally.
It has actions including "clone" and later will have "init".
The "clone" action will take a Git URL and a path
clone from git to the path
then open "package.json" in the path
and make the following modifications:

- prompt for name, defaulting to basename of path
- prompt for version, defaulting to 1.0.0
- prompt for description, defaulting to whatever is already there
- prompt for author, defaulting to empty string
- prompt for license, defaulting to whatever is already there
- keep existing fields: scripts, bin, main, dependencies, devDependencies, peerDependencies, bundledDependencies, optionalDependencies, files, directories, config, engines, engineStrict, os, cpu
- remove all other fields, especially repository, keywords, homepage, bugs, contributors
 */
