# atipay

##Installation

1. Before everything make sure that you've installed `Nodejs` and `MongoDB` on your server.
2. Then make a clone from this project on your server:
```bash
git clone git@github.com:sadra/atipay.git
```
3. Then, install the dependencies:
```bash
npm install
```
4. Install the `pm2`
```bash
npm install pm2 -g
```
5. Modify the `config.js` and replace `port` and `database` to every thing you want.
6. Run the app throw **pm2**:
```bash
pm2 start atipay.js
```

## Use the API

The **base route** starts with your server **Server Address** plus the **PORT** and the **users** key. for example
```html
0.0.0.0:32002/users
```

### Add user payment

**Method** : `GET`
**ROUTE** : `BASE_ROUTE/add`
**REQUEST BODY**:

```json
{
"mobile" : "09112223333", //string
"serial_number" : "123456789", //string
"ref_number" : "123456789", //string
}
```

#### RESPONSE:
**STATUS** : `200`
```json
{
    "user_add": true,
    "message": {
        "user": {
            "__v": 0,
            "created_at": "2018-08-04T14:07:56.811Z",
            "updated_at": "2018-08-04T14:07:56.811Z",
            "mobile": 9119991124,
            "serial_number": "123456",
            "ref_number": "123456789",
            "_id": "5b65b33c5d940e7445e81b0a"
        }
    }
}
```

#### FAILURE RESPONSE:
If user exist and paid before.
**STATUS** : `403`

```json
{
    "result": "User is exist",
    "user": {
        "_id": "5b65b33c5d940e7445e81b0a",
        "created_at": "2018-08-04T14:07:56.811Z",
        "updated_at": "2018-08-04T14:07:56.811Z",
        "mobile": 9119991124,
        "serial_number": "123456",
        "ref_number": "123456789",
        "__v": 0
    },
    "status": 403
}
```

### Verify user payment

**Method** : `GET`
**ROUTE** : `BASE_ROUTE/verify/MOBILE_NUMBER`

#### RESPONSE:
**STATUS** : `200`
```json
{
    "user_exist": true,
    "result": {
        "message": "The user is exist.",
        "user": {
            "_id": "5b65b33c5d940e7445e81b0a",
            "created_at": "2018-08-04T14:07:56.811Z",
            "updated_at": "2018-08-04T14:07:56.811Z",
            "mobile": 9119991124,
            "serial_number": "123456",
            "ref_number": "123456789",
            "__v": 0
        }
    }
}
```

#### FAILURE RESPONSE:
If user not existed
**STATUS** : `404`
```json
{
    "message": "User not found!",
    "status": 404
}
```



