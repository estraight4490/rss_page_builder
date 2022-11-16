# RSS Page Builder

#### Create a static HTML page with the latest updates from your favorite RSS feeds.

###### Setup

1. Clone the git repo into a local directory
2. Run `npm install` in the shell
3. Run `node main.js` in the shell

#### Setting up your RSS feeds

Before running step 3 in the Setup, you'll want to add your RSS feeds. Inside `config/default.json` you'll see "feeds" which contain the example-only  JSON. Replace "Subcategory" with any name you want (ex: News, Journals, Substack, etc.). Inside the subcategories you need to add the name of the source as the key and the RSS URL as the value. Replace the examples and you're good to go.

#### Further configuration

There are two more configs available to edit, both inside `config/default.json`. The `file_path` and the `interval` configs. `file_path` determines the name of the HTML file as well as the path (where you want it to be created on your machine). Just passing a file name without a path results in the HTML file living in the root directory of the project. `interval` determines how often the HTML page is refreshed and updated in milliseconds. It's currently set to update every hour, but this value can be changed as needed.
