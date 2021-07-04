import { map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const observer = {
    next: (value: any) => console.log("Next:", value),
    complete: () => console.log("Complete!"),
    error: (error) => console.log("Error!", error),
};

const searchQuery = "qwerty ";

const githubRepos = `https://api.github.com/search/repositories?q=${searchQuery}`;
const streamOne = ajax(githubRepos).pipe(
    map((item) =>
        item.response.items.map(
            (item) =>
                "Repo owner: " +
                item.owner.login +
                " Repo name: " +
                item.name +
                " URL: " +
                item.url
        )
    )
);
streamOne.subscribe(observer);

const gitlabRepos = `https://gitlab.com/api/v4/projects?search=${searchQuery}`;
const streamTwo = ajax(gitlabRepos).pipe(
    map((item) =>
        item.response.map(
            (item) =>
                "Repo owner: " +
                item.namespace.name +
                " Repo name: " +
                item.name +
                " URL: " +
                item.web_url
        )
    )
);
streamTwo.subscribe(observer);
