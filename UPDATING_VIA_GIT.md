## How to update the website using the command line and git

### Fork the repository

Use the "Fork" button in the top right corner of the repository to fork it to your account.

### Clone the forked repository

```sh
git clone https://github.com/firstname-lastname/gehlenborglab-website.git # replace with your name
cd gehlenborglab-website
```

### Updating / adding lab member details

Lab member profiles live in the `_members/` folder. Each lab member has a separate markdown file in this folder, named using the `firstname-lastname.md` convention.

If adding a new lab member, copy the template file to a file with your name, which you will edit to fill in your information

```sh
cd _members
cp template.md firstname-lastname.md # replace with your name
```

To update your file, open it in any text editor.

Run the following command to open with TextEdit on Mac

```sh
open -a TextEdit firstname-lastname.md # replace with your name
```

For more information about the markdown file format, please refer to [this guide](https://guides.github.com/features/mastering-markdown/).

When you are finished editing the file, save it, and commit your changes

```sh
git add firstname-lastname.md # replace with your name
git commit -m "Updated Firstname Lastname lab member details"
```

Push the changes to GitHub

```sh
git push --u origin master
```

Review your changes on GitHub by comparing them with the original (non-forked) `master` branch

[https://github.com/hms-dbmi/gehlenborglab-website/compare/](https://github.com/hms-dbmi/gehlenborglab-website/compare/)

Click "compare across forks" and then select your fork.

If everything looks good, click the green "Create pull request" button and make a pull request.