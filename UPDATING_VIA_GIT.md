## How to update the website using the command line and git

### Clone the repository

```sh
git clone https://github.com/hms-dbmi/gehlenborglab-website.git # or use SSH if you prefer
cd gehlenborglab-website
```

### Check out a new git branch for your changes

```sh
git checkout -b firstname-lastname # replace with your name
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

When you are finished editing the file, save it, and commit the changes to your git branch

```sh
git add firstname-lastname.md # replace with your name
git commit -m "Updated Firstname Lastname lab member details"
```

Push the changes to GitHub

```sh
git push --set-upstream origin firstname-lastname # replace with your name
```

Review your changes on GitHub by comparing your `firstname-lastname` branch with the `master` branch

[https://github.com/hms-dbmi/gehlenborglab-website/compare?expand=1](https://github.com/hms-dbmi/gehlenborglab-website/compare?expand=1)

Use the "compare:" dropdown to select your `firstname-lastname` branch for comparison.

If everything looks good, click the green "Create pull request" button and make a pull request.