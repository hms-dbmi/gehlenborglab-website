## How to update the website using the command line and git

### Fork the repository

Use the "Fork" button in the top right corner of the repository to fork it to your account.

![fork](/docs/img/00_fork.png)

### Clone the forked repository

```sh
git clone https://github.com/firstname-lastname/gehlenborglab-website.git # replace with your name
cd gehlenborglab-website
```

### Updating / adding lab member details

Lab member profiles live in the `_members/` folder. Each lab member has a separate markdown file in this folder, named using the `firstname-lastname.md` convention.

If adding a new lab member, copy the template file to a file with your name, which you will edit to fill in your information

```sh
cp _members/template.md _members/firstname-lastname.md # replace with your name
```

To update your file, open it in any text editor.

Run the following command to open with TextEdit on Mac

```sh
open -a TextEdit _members/firstname-lastname.md # replace with your name
```

For more information about the markdown file format, please refer to [this guide](https://guides.github.com/features/mastering-markdown/).

If planning to add a photo, fill in the `photo: firstname-lastname.png` field of the file, replacing with your filename.

When you are finished editing the markdown file, save it, and add it to your staged changes.

```sh
git add _members/firstname-lastname.md # replace with your name
```

To add a photo, move it to `assets/img/members/firstname-lastname.png` and stage that as well.

Images must be smaller than 10k x 10k pixels. Most images should be less than 2k x 2k pixels.

```sh
git add assets/img/members/firstname-lastname.png
git commit -m "Updated Firstname Lastname photo"
```

Push the changes to GitHub

```sh
git push -u origin main
```

Review your changes on GitHub by comparing them with the original (non-forked) `main` branch

[https://github.com/hms-dbmi/gehlenborglab-website/compare/](https://github.com/hms-dbmi/gehlenborglab-website/compare/)


Click "compare across forks" and then select your fork.

![compare changes](/docs/img/01_compare_changes.png)

![select fork](/docs/img/02_select_fork.png)

If everything looks good, click the green "Create pull request" button and make a pull request.