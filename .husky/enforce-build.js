console.log("checking for build changes...");

const fs = require("fs");
const { execSync } = require("child_process");

// Get the commit message from the command line arguments
const commitMessageFile = process.argv[2];
const commitMessage = fs.readFileSync(commitMessageFile, "utf8");

// Check if the package.json file was modified
const changes = execSync("git diff --cached --name-only").toString();

const packageJsonRegex = /package\.json/;
const isPackageJsonModified = packageJsonRegex.test(changes);

if (!isPackageJsonModified) {
  process.exit(0); // Exit with a success code to allow the commit
} else {
  console.log("found package.json changes");
  // Check if the commit message starts with "build:"
  const isValidCommitMessage = commitMessage.startsWith("build:");

  if (!isValidCommitMessage) {
    console.error(
      'Error: When modifying package.json, the commit message must start with "build:"'
    );
    process.exit(1); // Exit with an error code to block the commit
  }
}
