const fs = require("fs");
const { execSync } = require("child_process");

try {
  // Check if package.json is modified compared to the previous commit
  const isPackageJsonModified = execSync(
    "git diff --exit-code --name-only HEAD@{1} package.json",
    {
      stdio: "ignore",
    }
  );

  if (isPackageJsonModified.toString() !== "") {
    console.error("Error: Please use a build commit for package.json changes.");
    process.exit(1); // Exit with an error code to block the commit
  }
} catch (error) {
  // An error occurred (indicating a modification to package.json)
  console.error("Error: Please use a build commit for package.json changes.");
  process.exit(1); // Exit with an error code to block the commit
}
