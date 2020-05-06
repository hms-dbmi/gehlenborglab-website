## How to update the website using the GitHub interface

### Fork the repository

Use the "Fork" button in the top right corner of the repository to fork it to your personal account.

![fork](/docs/img/00_fork.png)

If you already have a fork, navigate to it: `https://github.com/my-username/gehlenborglab-website`

### Updating / adding lab member details

Navigate to the `_members` folder:

![navigate to _members](/docs/img/03_members.png)

#### Adding a lab member

[Click here](https://raw.githubusercontent.com/keller-mark/gehlenborglab-website/instructions/_members/template.md)
to select all template contents and copy them to your clipboard (Edit -> Select All, then Edit -> Copy).
![copy template contents](/docs/img/04_template_raw_copy.png)

Create a new member file
![create members file](/docs/img/05_create_members_file.png)

Enter your name
![enter your name](/docs/img/06_name_members_file.png)

Paste the template contents from your clipboard (Edit -> Paste)
![paste template contents](/docs/img/07_template_paste.png)

Edit the template to insert your information.

When you are ready, scroll down. Click the "Create a **new branch** for this commit and start a pull request" option. Enter `firstname-lastname` and click the "Propose new file" button.

![propose new file](/docs/img/08_propose_new_file.png)

The following page will appear. Click "compare across forks".

![click compare across forks](/docs/img/09_open_pr.png)

Use the first dropdown to select the option with the "hms-dbmi/" prefix.
![choose hms-dbmi base repo](/docs/img/11_choose_base_repo.png)

Click the "Create pull request button" to finish.

![create pull request](/docs/img/12_create_pr.png)