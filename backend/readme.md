# db

A arquitetura será:

HTTP
 ↓
Route
 ↓
Controller       → recebe HTTP / devolve HTTP
 ↓
Service          → regra de negócio
 ↓
Repository       → acesso ao MongoDB
 ↓
Model            → estrutura/validação do documento
 ↓
MongoDB

npm run dev


### Post create participant
Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:3000/participants `
  -ContentType "application/json" `
  -Body '{"name":"João Silva","birthdate":"2000-05-15"}'

1. mongosh
2. use swimrank
3. db.participants.find().pretty()
[
  {
    _id: ObjectId('6aabf2465c7a351847bd4d7a'),
    name: 'Jo�o Silva',
    birthdate: ISODate('2000-05-15T00:00:00.000Z'),
    points: 0,
    createdAt: ISODate('2026-09-17T13:59:34.733Z'),
    updatedAt: ISODate('2026-09-17T13:59:34.733Z'),
    __v: 0
  }
]

## Patch training
Invoke-RestMethod `
  -Method Patch `
  -Uri http://localhost:3000/trainings/6aaef93245ea2c51ef90866f `
  -ContentType "application/json" `
  -Body '{"date":"2026-10-05","isMain":true}'

Invoke-RestMethod `
  -Method Delete `
  -Uri http://localhost:3000/trainings/6aaef93245ea2c51ef90866f


## Patch status with user

  1. Create activity
    $body = @{
      participantId = "6aac3d15736b6e3dfccb375c"
      date = "2026-09-23"
      type = "BACKSTROKE"
      distance = 1000
      time = 1800
  } | ConvertTo-Json

  $activity = Invoke-RestMethod `
      -Method Post `
      -Uri http://localhost:3000/activities `
      -ContentType "application/json" `
      -Body $body

  $activity

  2. login with teacher
  $login = Invoke-RestMethod `
    -Uri "http://localhost:3000/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body '{
      "email": "professor@swimrank.com",
      "password": "123456"
    }'

  $login

  3. save token
  $token = $login.token

  4. see user
  $login.user

  5. change status
  Invoke-RestMethod `
    -Uri "http://localhost:3000/activities/6ab29e97413d2761b08247b3/validation" `
    -Method PATCH `
    -Headers @{
      Authorization = "Bearer $token"
    } `
    -ContentType "application/json" `
    -Body '{
      "status": "APPROVED"
    }'