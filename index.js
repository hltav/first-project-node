const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')

const port = 3000

const app =  express()
app.use(express.json())
/*  
        - Query params => meusite.com/users?name=Hudson&age=37
        - Route params => /users/2   // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
        - Request Body => {"name": "Hudson", "age":37}

        - GET          => Buscar informação no back-end
        - POST         => Criar informaçãop no back-end
        - PUT / PATCH  => Alterar/Atualizar informações no back-end
        - DELETE       => Deletar informações no back-end

        - MIDDLEWARES  => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição

*/

// app.get('/users', (request, response) =>{
    
//     const {name, age} = request.body


//     return response.json({name, age})
    
//     console.log(request)
//     const {id} = request.params
//     console.log(id)
//     return response.json({id})
    
//     const name = request.query.name
//     const age = request.query.age
//    return response.json({Nome: name, Idade:age})
// })

const users = []

// const myFirstMiddleware = (request, response, next) =>{
//     console.log("Fui chamado")

//     next()

//     console.log("Finalizamos")
// }

// app.use(myFirstMiddleware)

const checkedUsersId = (request, response, next) =>{
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index <0){
        return response.status(404).json({error:"User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) =>{

    return response.json(users)

})

app.post('/users', (request, response) =>{
    const {name, age} = request.body

    const user = {id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkedUsersId, (request, response) =>{
        
    const {name, age} = request.body

    const index = request.userIndex
    const id = request.userId

    const updateUser = {id, name, age}

    
    users[index] = updateUser

    return response.json(updateUser)

})

app.delete('/users/:id', checkedUsersId, (request, response) =>{

    const index = request.userIndex

    
    users.splice(index,1)

    return response.status(204).json()

})


app.listen(port, () =>{
    console.log(`🚀 Server started on port ${port} ✈` )
})
