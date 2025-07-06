const { exec } = require("child_process");

const command = "serve -s build";

const process = exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// Ensure the process runs indefinitely
process.stdout.pipe(process.stdout);
process.stderr.pipe(process.stderr);
