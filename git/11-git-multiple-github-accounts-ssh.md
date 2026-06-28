### Git Notes

# How To Work With Multiple Github Accounts on a single Machine

Let suppose I have two github accounts, **https:/<span></span>/github.com<span></span>/bharatOffice** and **https:/<span></span>/github.com<span></span>/bharatPersonal**. Now i want to setup my machine (Mac, Linux, or Windows) to easily talk to both the github accounts.

> NOTE: This logic can be extended to more than two accounts also. :)

The setup can be done in 5 easy steps:
## Steps:
- [Step 1](#step-1) : Create SSH keys for all accounts
- [Step 2](#step-2) : Create a Config File and Make Host Entries
- [Step 3](#step-3) : Add SSH keys to SSH Agent
- [Step 4](#step-4) : Add SSH public key to the Github
- [Step 5](#step-5) : Cloning GitHub repositories using different accounts

<br>

## Step 1:- Create SSH keys for all accounts

First make sure your current directory is your **.ssh** folder (navigate to the .ssh directory).

**Mac / Linux:**
```sh
     cd ~/.ssh
```

**Windows (PowerShell):**
```powershell
     cd $env:USERPROFILE\.ssh
```

If the .ssh directory does not exist, you can create and navigate to it:

**Mac / Linux:**
```sh
     mkdir ~/.ssh
     cd ~/.ssh
```

**Windows (PowerShell):**
```powershell
     New-Item -ItemType Directory -Force -Path $env:USERPROFILE\.ssh
     cd $env:USERPROFILE\.ssh
```

Complete path will be like:
- **Mac/Linux:** `~/.ssh` (e.g. `/Users/sonwanebr/.ssh`)
- **Windows:** `C:\Users\<YourWindowsUsername>\.ssh` (e.g. `C:\Users\sonwanebr\.ssh`)

List files in the **.ssh** folder:

**Mac / Linux:**
```sh
     ls ~/.ssh
```

**Windows (PowerShell):**
```powershell
     dir
```
### A) Create SSH keys for all accounts

**Windows:** Use **PowerShell** (OpenSSH is built-in on Windows 10+). Run the commands below from the `.ssh` directory as shown above.

Syntax for generating a unique SSH key for an account with email and file name:
```sh
      ssh-keygen -t rsa -C "yourEmailAddress" -f "repoProvider_githubUsername"
```
here,

**-C** stands for comment to help identify your ssh key

**-f** stands for the file name where your ssh key get saved (*repoProvider_githubUsername* is ssh-key-name.)


#### Now generating SSH keys for my two accounts
```sh
     ssh-keygen -t rsa -C "myOfficeEmail@gmail.com" -f "bitbucket_bharatOffice"
     ssh-keygen -t rsa -C "myPersonalEmail@gmail.com" -f "github_bharatPersonal"
```

Here **bharatOffice** is username of bitbucket corresponding to  **myOfficeEmail** email and for that **bitbucket_bharatOffice** is file name.
And **bharatPersonal** is username of github corresponding to  **myPersonalEmail** email and for that **github_bharatPersonal** is file name.

After entering the command the terminal will ask for passphrase, leave it empty and proceed.


> Now after adding keys , in your .ssh folder, a public key and a private will get generated.

>The public key will have an extension __.pub__ and private key will be there without any extension both having same name which you have passed after __-f__ option in the above command. (in my case *bitbucket_bharatOffice* and *github_bharatPersonal*)


<br>

## Step 2:- Create a Config File and Make Host Entries

The **~/.ssh/config** file allows us specify many config options for SSH.

If **config** file does not already exist, create one (make sure you are in the **.ssh** directory).

**Mac / Linux:**
```sh
     cd ~/.ssh/
     touch config
```

**Windows (PowerShell):**
```powershell
     cd $env:USERPROFILE\.ssh
     New-Item -ItemType File -Force -Path config
```

Open the config file in your editor:

**Mac / Linux:**
```sh
     open config
```

**Windows (PowerShell):**
```powershell
     notepad config
```
Now we need to add these lines to the file, each block corresponding to each account we created earlier.
```sh
     #syntax ==> 
     Host repoProvider.com-githubUsername
          HostName repoProvider.com
          User git
          IdentityFile ~/.ssh/repoProvider_githubUsername

     #bharatOffice account
     Host bitbucket.org-bharatOffice
          HostName bitbucket.org
          User git
          IdentityFile ~/.ssh/bitbucket_bharatOffice

     #bharatPersonal account
     Host github.com-bharatPersonal
          HostName github.com
          User git
          IdentityFile ~/.ssh/github_bharatPersonal
```

> **Windows note:** If `~` is not resolved in your SSH config, use the full path for `IdentityFile`, e.g. `C:\Users\sonwanebr\.ssh\github_bharatPersonal`.

<br>

## Step 3:- Add SSH keys to SSH Agent

#### Start SSH Agent

**Windows:** Run PowerShell as Administrator and execute:
```powershell
    Get-Service ssh-agent | Set-Service -StartupType Automatic
    Start-Service ssh-agent
    Get-Service ssh-agent
```

**Mac:** SSH agent usually runs by default. To start manually:
```sh
     eval "$(ssh-agent -s)"
```

**Linux:** Start the agent if needed:
```sh
     eval "$(ssh-agent -s)"
```

Optional: First-time trust host (same on all platforms):
```sh
     ssh -o StrictHostKeyChecking=no git@github.com
```

Now we have the keys but they cannot be used until we add them to the SSH Agent.

**Mac** (use `-K` to store in keychain):
```sh
     ssh-add -K ~/.ssh/repoProvider_githubUsername
     ssh-add -K ~/.ssh/bitbucket_bharatOffice
     ssh-add -K ~/.ssh/github_bharatPersonal
```

**Linux / Windows** (no `-K` option):
```sh
     ssh-add ~/.ssh/repoProvider_githubUsername
     ssh-add ~/.ssh/bitbucket_bharatOffice
     ssh-add ~/.ssh/github_bharatPersonal
```

On Windows (PowerShell), use the full path:
```powershell
     ssh-add $env:USERPROFILE\.ssh\bitbucket_bharatOffice
     ssh-add $env:USERPROFILE\.ssh\github_bharatPersonal
```

You can read more about adding keys to SSH Agent [here.](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

<br>

## Step 4:- Add SSH public key to the Github
For the next step we need to add our public key (that we have generated in our previous step) and add it to corresponding github accounts.

For doing this we need to:

__1. Copy the public key__

Open the `.pub` file and copy its contents, or copy it directly to the clipboard.

**Mac / Linux — open in editor:**
```sh
     vim ~/.ssh/bitbucket_bharatOffice.pub
     vim ~/.ssh/github_bharatPersonal.pub
```

**Windows (PowerShell) — open in Notepad:**
```powershell
     notepad $env:USERPROFILE\.ssh\bitbucket_bharatOffice.pub
     notepad $env:USERPROFILE\.ssh\github_bharatPersonal.pub
```

<p align="center">OR

**Copy directly to clipboard:**

**Mac:**
```sh
     pbcopy < ~/.ssh/bitbucket_bharatOffice.pub
     pbcopy < ~/.ssh/github_bharatPersonal.pub
```

**Windows (PowerShell):**
```powershell
     Get-Content $env:USERPROFILE\.ssh\bitbucket_bharatOffice.pub | Set-Clipboard
     Get-Content $env:USERPROFILE\.ssh\github_bharatPersonal.pub | Set-Clipboard
```   


__2. Paste the public key on Github__

* Sign in to Github Account
* Goto **Settings** > **SSH and GPG keys** > **New SSH Key**
* Paste your copied public key and give it a Title of your choice.

___OR___

* Sign in to Github 
* Paste this link in your browser (https://github.com/settings/keys) or click [here](https://github.com/settings/keys)
* Click on **New SSH Key** and paste your copied key.

<br>


## Step 5:- Cloning GitHub repositories using different accounts

So we are done with our setups and now its time to see it in action. We will clone a repository using one of the account we have added.

Make a new project folder where you want to clone your repository and go to that directory from your terminal.

For Example:
I am making a repository on my personal github account and naming it **TestRepo**
Now for cloning the repo use the below command:
 ```sh
     git clone git@{repoProvider.com}-{githubUsername}:{owner-user-name}/{the-repo-name}.git

     [e.g.] git clone git@github.com-bharatPersonal:bharatPersonal/TestRepo.git
 ```

 <br>


## Step 6:- Change Remote URL for Cloned Repositories (Optional)

If you have already cloned repositories using HTTPS, you can change the remote URL to use SSH for a smoother experience. First, navigate to the repository directory, then run the following commands to update the remote URL:

```sh
     git remote -v # To check current URLs
     git remote remove origin # Remove existed URLs
     git remote add origin git@{repoProvider.com}-{githubUsername}:{owner-user-name}/{the-repo-name}.git # Add SSH URL        
```

Pick the correct pair for your repository accordingly.
To push or pull to the correct account we need to add the remote origin to the project
```sh
     git remote add origin git@github.com-bharatPersonal:bharatPersonal
     
     git remote add origin git@github.com-bharatOffice:bharatOffice
```

## Step 7:- Finally

From now on, to ensure that our commits and pushes from each repository on the system uses the correct GitHub user — we will have to configure **user.email** and **user.name** in every repository freshly cloned or existing before.

To do this use the following commands.

```sh
     git config user.email "myOfficeEmail@gmail.com"
     git config user.name "Bharat Sonwane"
     
     git config user.email "myPersonalEmail@gmail.com"
     git config user.name "Bharat Sonwane"
```

Now you can use:
```sh
     git push
     
     git pull
```