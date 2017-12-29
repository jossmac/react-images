# Contributing

Thank you for your interest in react-images. All forms of contribution are
welcome, from issue reports to PRs and documentation / write-ups.

Before you open a PR:

* If you're planning to add or change a major feature in a PR, please ensure
the change is aligned with the project roadmap by opening an issue first,
especially if you're going to spend a lot of time on it.
* In development, run `yarn start` to build (+watch) the project source, and run
the [development server](http://localhost:8000).
* Please ensure all the examples work correctly after your change. If you're
adding a major new use-case, add a new example demonstrating its use.
* Please **DO NOT** commit the build files. Make sure **ONLY** your changes to
`/src/` and `/examples/src` are included in your PR.
* Be careful to follow the code style of the project. Run `yarn run lint` after
your changes and ensure you do not introduce any new errors or warnings.
* All new features and changes need documentation.
* Make sure yarn.lock is updated when you add or upgrade dependencies.
