const { func } = require("joi");

console.log("before");
getUser(1, (user) => {
  getRepositories(user, displayRepos);
});
console.log("after");

function displayRepos(repo) {
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading data from the database...");
    callback({ id: id, gitHubUsername: "Steve" });
  }, 2000);
}

// replace callback with a promise
function getUserAsync(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading data from the database...");
      resolve({ id: id, gitHubUsername: "Steve" });
    }, 2000);
  });
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling gitHub Api....");
    callback({ repo: ["repo1", "repo2", "repo3"] });
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    callback({ commits: ["commit 1", "commit 2"] });
  }, 2000);
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
p.then((result) => console.log("result", result));

// Running promises in parallel
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1....");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2....");
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2]).then((result) => console.log(result));
