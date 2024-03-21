const db = require('../../database/models');
const Op = db.Sequelize.Op;

module.exports= {
	list: (req,res) => {
		db.User
            .findAll()
            .then (users=>{
	            return res.json({
                    count: users.length,
                    data: users.map(user => ({
                        id: user.id,
                        name: `${user.first_name} ${user.last_name}`,
                        email: user.email,
                        detail: `/api/users/${user.id}`
                    }))
                }) })
    },
    detail: (req,res) =>{
        db.User
            .findByPk(req.params.id)
            .then(user => {
                return res.json({
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    phone: user.phone,
                    img: `/img/users/${user.photo}`
                })
            })
    }
}
