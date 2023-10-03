console.log("Hello from enforce-build.js");

const fs = require("fs");

// Get the commit message from the command line arguments
const commitMessageFile = process.argv[2];
const commitMessage = fs.readFileSync(commitMessageFile, "utf8");

// Check if the package.json file was modified
const isPackageJsonModified = commitMessage.includes("package.json");

// Check if the commit message starts with "build:"
const isValidCommitMessage = commitMessage.startsWith("build:");

if (isPackageJsonModified && !isValidCommitMessage) {
  console.error(
    'Error: When modifying package.json, the commit message must start with "build:"'
  );
  process.exit(1); // Exit with an error code to block the commit
}
