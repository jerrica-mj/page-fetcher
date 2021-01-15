// A small command line node app to take in command line argument of a URL and a local file path, then download the resource (URL) to the specified path

// use request library to make HTTP request, and file system to access local files
const request = require("request");
const fs = require("fs");

// fetch command line arguments
const url = process.argv[2]; // e.g.: http://www.google.com
const path = process.argv[3]; // e.g.: file.txt

// request/access the URL resource
request(url, (error, response, body) => {
  // if the URL results in an error or non-200 (all went well) status code, inform the user and terminate the app
  if (error || response.statusCode !== 200) {
    console.log("There was a problem accessing the provided URL.\nPlease revise the URL try again.");
    process.exit();
  }
  // write url/resource body HTML to a file at path--overwriting any existing
  fs.writeFile(path, body, (error) => {
      // if the file path is invalid (results in an error), inform the user and terminate the app
    if (error) {
      console.log("There was a problem accessing the provided file path.\nPlease revise the file path and try again.");
      process.exit();
    }
    fs.stat(path, (error, fileStats) => {
      if (error) throw error;
      // print completion message with file size
      console.log(`Downloaded and saved ${fileStats.size} bytes to ${path}`)
    })
  })
});