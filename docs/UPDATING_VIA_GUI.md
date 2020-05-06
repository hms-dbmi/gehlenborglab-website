## How to update the website using the GitHub interface

### Fork the repository

Use the "Fork" button in the top right corner of the repository to fork it to your personal account.

<img alt="fork" src="/docs/img/00_fork.png" width="400" />

If you already have a fork, navigate to it: `https://github.com/my-username/gehlenborglab-website`

(fill in the `my-username` part of the URL above)

### Updating / adding lab member details

Navigate to the `_members` folder:

<img alt="navigate to _members" src="/docs/img/03_members.png" width="400" />

#### Adding a lab member

[Click here](https://raw.githubusercontent.com/hms-dbmi/gehlenborglab-website/master/_members/template.md)
to select all template contents and copy them to your clipboard (Edit -> Select All, then Edit -> Copy).


<img alt="copy template contents" src="/docs/img/04_template_raw_copy.png" width="400" />

Create a new member file

<img alt="create members file" src="/docs/img/05_create_members_file.png" width="400" />

Enter your name

<img alt="enter your name" src="/docs/img/06_name_members_file.png" width="400" />

Paste the template contents from your clipboard (Edit -> Paste).

<img alt="paste template contents" src="/docs/img/07_template_paste.png" width="400" />

Edit the template to insert your information.

- The information between the `---` lines must be formatted using the [YAML front matter syntax](https://jekyllrb.com/docs/front-matter/).
- The information below the second `---` line must be formatted using [markdown syntax](https://guides.github.com/features/mastering-markdown/).

When you are ready, scroll down. Click the "Create a **new branch** for this commit and start a pull request" option. Enter `firstname-lastname` and click the "Propose new file" button.

<img alt="propose new file" src="/docs/img/08_propose_new_file.png" width="400" />

The following page will appear. Click "compare across forks".

<img alt="click compare across forks" src="/docs/img/09_open_pr.png" width="400" />

Use the first dropdown to select the option with the "hms-dbmi/" prefix.

<img alt="choose hms-dbmi base repo" src="/docs/img/11_choose_base_repo.png" width="400" />

Click the "Create pull request button" to finish.

<img alt="create pull request" src="/docs/img/12_create_pr.png" width="400" />

#### Adding a photo

To add a photo, navigate back to `assets/img/members` in your forked repository:

`https://github.com/my-username/gehlenborglab-website/tree/instructions/assets/img/members`

(fill in the `my-username` part of the URL above)

Click the "Upload files" button.

<img alt="upload files" src="/docs/img/13_upload_files.png" width="500" />

Drag-and-drop or select your image file `firstname-lastname.png`

<img alt="drag files" src="/docs/img/14_drag_files.png" width="400" />

Once again, follow the steps to start a pull request:

Click the "Create a **new branch** for this commit and start a pull request" option. Enter `firstname-lastname` and click the "Propose changes" button.

<img alt="propose new file" src="/docs/img/08_propose_new_file.png" width="400" />

The following page will appear. Click "compare across forks".

<img alt="click compare across forks" src="/docs/img/09_open_pr.png" width="400" />

Use the first dropdown to select the option with the "hms-dbmi/" prefix.

<img alt="choose hms-dbmi base repo" src="/docs/img/11_choose_base_repo.png" width="400" />

Click the "Create pull request button" to finish.

<img alt="create pull request" src="/docs/img/12_create_pr.png" width="400" />

