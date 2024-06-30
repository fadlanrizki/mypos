# User API Spec

## Register User API

Endpoint : /api/users

Request Body : 

```json
{
    "username": "fadlan",   
    "password": "secret",
    "name": "Fadlan Rizki"   
}
```

Response Body Success:
```json
{
    "data": {
        "username": "fadlan",
        "name": "Fadlan Rizki",
        "message": "Data User Berhasil Ditambahkan"
    }
}
```

Response Body Error :
```json
{
    "Errors": "Username Already Registered"
}
```

## Login User API
Endpoint : POST /api/users/login

Request Body : 

```json
{
    "username": "fadlan",   
    "password": "secret",   
}
```


Response Body Success:
```json
{
    "data": {
        "token": "Unik Token"
    }
}
```

Response Body Error:
```json
{
    "Errors": "Username or Password Wrong"
}
```


## Update User API
Endpoint : PATCH /api/users/current

Header : 
- Authorization: token

Request Body : 

```json
{
    "name": "fadlan",   
    "password": "newPassword",   
}
```

Response Body Success:
```json
{
    "data": {
        "username": "New Username",
        "name": "New Nama"
    }
}
```

Response Body Errors:
```json
{
    "Errors": "Error Update Data"
}
```


## Get User API
Endpoint : GET /api/users/current

Header : 
- Authorization: token

Response Body Success:
```json
{
    "data": {
        "username": "New Username",
        "name": "New Nama"
    }
}
```

Response Body Errors:
```json
{
    "Errors": "Error Get Data User"
}
```



## Logout API
Endpoint : DELETE /api/users/logout

Header : 
- Authorization: token

Response Body Success:
```json
{
    "data": "OK"
}
```

Response Body Errors:
```json
{
    "Errors": "Unauthorize"
}
```
