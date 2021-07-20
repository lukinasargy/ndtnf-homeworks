`docker-compose build` чтобы установить проект <br/>
`docker-compose up` чтобы запустить проект <br/>

- Регистрация пользователя `POST: /api/users/signup 
{ "email":"mail@mail.com",
"firstName": "Ivan",
 "lastName": "Ivanov",
  "password": "guess"
}`
- Аутентификация пользователя `POST: /api/users/signin 
{ "email":"mail@mail.com",
  "password": "guess"
}`
- Для авторизации использовать Bearer token `curl http://localhost:3000/api/users/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."`