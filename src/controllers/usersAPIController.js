const db = require('../../database/models');
/* const Op = db.Sequelize.Op; */

module.exports= {
	list: async (req,res) => {
		try {
            const users = await db.User.findAll()
	        return res.json({
                count: users.length,
                data: users.map(user => ({
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                detail: `/api/users/${user.id}`
            }))
        }) 
        } catch(error){
            console.log(error)
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    detail: async (req,res) =>{
        try{
            const user = await db.User.findByPk(req.params.id)
            if(user){
                return res.json({
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    phone: user.phone,
                    img: `/img/users/${user.photo}`
                }) 
            } else {
            return res.status(404).json({ error: 'Usuario no encontrado' }); 
        }
        } catch(error){
            console.log(error)
            res.status(500).json({ error: 'Error interno del servidor' });
    }}
}
