var jwt = require('jsonwebtoken');

module.exports = (app, userModel) => {
    app.post('/generate/token', function (req, res) {
        console.log('generando token')
        // paso1) verificar que el usuario exista en la tabla de cuentas

        userModel.findOne({
            where: {
                usuario: req.body.usuario,
                contraseña: req.body.contraseña
            }
        }).then((resp) => {
            console.log(resp)

            if (!resp) {
                res.send({message:"usuario o contraseña son incorrectos"})
            } else {
                claimUser = {
                    NOMBRE: resp.NOMBRE,
                    email: resp.email,
                    rol: resp.rol,
                    ubicacion: resp.ubicacion
                }

                const token = jwt.sign(claimUser, 'secretKey', { expiresIn: '1h'});
                console.log(token)
                res.send(token)
            }
        });

    })

       // console.log(token);

    app.post('/user', function(req,res) {
        //Authorization:bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOT01CUkUiOiJSb2PDrW8iLCJyb2wiOiJMREkiLCJ1YmljYWNpb24iOiJHdWFkYWxhamFyYSIsImlhdCI6MTU2MTU3OTgwMywiZXhwIjoxNTYxNTgzNDAzfQ.K5L9DTliB71sVKK-Qnb3pXzg3gmR9yo9godMqYBHk4g

        const authHeader = req.headers['authorization'];

        token = authHeader.replace('Bearer ', '')

        jwt.verify(token,'secretKey', function (err, token) {// verifica si el token is valido
            if (err) { // si no, responde con 401 y un mensaje de unauthorized
                console.log('invalid token')

                res.status(401)
                res.send({message: 'Unauthorized'})
            } else { // si es valido, revisa los roles del usuario
                console.log('valid token')

                if (token.rol === 'admin') { //revisa si el usuario tiene roles de admin
                    console.log('user is admin')

                    console.log(req.body)

                    userModel.create(req.body).then((resp) => {
                        //res.status(200);
                        res.send(resp);
                    });
                } else {
                    res.send({message:'se requieren permisos de administrador para crear usuarios'})
                }
            }            
        })
    });
}
/* paso2) 
    Si, el usuario existe -> 
    2.1) consultar tabla usuarios para obtener info y agregarla al token
    2.2) generar el token:
        Claims: Info de usuario
        Caducidad de 30 minutos

    si el usuario no existe -> error -> retorna bad request
tabla cuentas
tabla usuarios
    */