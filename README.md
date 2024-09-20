# Book Inventory

A React Book Inventory web app where you can access an inventory of books, add a new book entry, and download it as JSON or CSV.

## Setup

To set up the project:

### 1. MySQL Database

Download MySQL Web Community Edition [here](https://dev.mysql.com/downloads/installer/).

You can go ahead and install MySQL on your computer.

Make sure to select the following options when installing.

![image](https://github.com/user-attachments/assets/0489ce47-4090-4268-9c3d-a4911d664a79)

Once MySQL is finished installing, you will have an empty workbench with no MySQL connections.

![image](https://github.com/user-attachments/assets/30172b3c-400a-4c2b-972e-5abc4c008cd6)

To set up a new connection, click on the plus sign next to "MySQL Connections". Enter your connection name, user name (leave as root or use any username), and password (If you did not set it up during installation)

![image](https://github.com/user-attachments/assets/1feb0e4f-e05c-461c-8023-bd35858e69f7)

Test your connection and click "OK". Once you are connected to your MySQL database, run the following commands to set up the database and table:

```
CREATE DATABASE inventory;

USE inventory;

CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  genre VARCHAR(255),
  publication_date YEAR,
  isbn VARCHAR(255)
);
```

Use the following network configuration:

![image](https://github.com/user-attachments/assets/657f278e-0174-4b68-95ed-bcf46f641fb5)

Type in your password for the MySQL server (you will use this password later):

![image](https://github.com/user-attachments/assets/9b1f3a27-6152-4ccd-93d6-1edf104fc0bb)

### 2. Web App Setup

If you don't have Node.js installed, download it [here](https://nodejs.org/en/download/package-manager).

Download VS Code to run the project [here](https://code.visualstudio.com/).

Once you have Node.js installed, download the repository by cloning it or downloading the .zip file.

Clone the repository using the following command:

```
git clone https://github.com/KevinDang12/book-inventory.git
```

After downloading the project and opening it in an IDE, open the terminal using ``` ctrl + ` ``` or click "Terminal" on the toolbar at the top of the window and click "New Terminal."

In your terminal run the following commands:

```
npm install

npm run build

cd server

npm install
```

In ```server/server.js```, on line 36, replace the user and password with your MySQL username and password. If you didn't select a username, it should be root by default. Type in the password that you used for your MySQL server during installation.

Once everything is set up run ```npm run dev``` to start the server. You should be able to find the website using the following URL [here](http://localhost:5000/).
