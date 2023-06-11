# API Authentication using NodeJs

This is an Authentication API using JWT's that you can plug inside your current project or you can start with a new one. Name, Email & Password is used for authentication.

The API based on Node.js, Express, MongoDB, following the **MVC pattern** i.e. Model ~~View~~ Controller.

**Mongoose** is used for storing Users in Database.
**jsonwebtoken** is used for creating Tokens
**bcryptjs** is used for hashing passwords

---

## To start setting up the project

Step 1: Clone the repo

```bash
git clone https://github.com/Sid-Saraswat/assignment_developer_backend.git
```

Step 2: cd into the cloned repo and run:

```bash
npm install
```

Step 3: Put your credentials in the .env file.

```bash
DB_URL=mongodb://localhost:27017/backend_developer_assignment
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

Step 4: Install MongoDB (Linux Ubuntu)

See <https://docs.mongodb.com/manual/installation/> for more infos

Step 5: Run Mongo daemon

```bash
sudo service mongod start
```

Step 6: Start the APIs by

```bash
npm start
```

Step 7: Start making API calls from apis.http file


## Author

- [**Siddharth Saraswat**]

## Contribute

You can fork this repo and send me a PR.

## License

This project is licensed under the MIT License.
