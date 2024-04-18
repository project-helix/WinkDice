# WinkDice source code
> [!WARNING]
> As of this moment this is undocumented and not quite easy to self host but we will try to explain it enough so that you can have your instance up and running

### so first!
just follow the postgresql setup from [misskey](https://misskey-hub.net/ja/docs/for-admin/install/guides/ubuntu-manual/#postgresql) (Misskey is a kind of x (formely know as twitter) clone);

### then
install redis and make sure that it's running

### then
install mongodb and make sure a local instance is running

### then
run `pnpm install` (or yarn)

### then
Initialize typeorm (just google it)

### then
run `pnpm run start`
 
---

> [!CAUTION]
> we don't provide an easy way to create a master account but i will explain how to do it.

### so first
create an account on the login page

### second
log into the created account
and go into cookies and copy the `usrToken` value

### third
go into your code editor and navigate to `static/js/admin/adminPanel.js`
and comment the following lines:
```js
23| if (!CheckIfLoggedIn()) REJECTED();
24| if (!(await CheckIfAdmin())) REJECTED();
```

### then
go back to your web-browser and in the URL bar change `/login` to `/admin`
and then paste the coppied user token into the first text input under `USER DATA EDITOR`

### then
in the second text input you should see somewhere something that looks like this:
```json
"roles":["default"]
```
Replace that with:
```json
"roles":["default","admin"]
```

### then
go back into your text editor and **uncomment**
```js
23| // if (!CheckIfLoggedIn()) REJECTED();
24| // if (!(await CheckIfAdmin())) REJECTED();
```
in `static/js/admin/adminPanel.js`

---

now you should have everything set up!