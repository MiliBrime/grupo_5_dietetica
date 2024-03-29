const db = require ('../../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['category']
            });

            console.log(products)
            
            const countByCategory = {};

            products.forEach(product => {
                const categoryName = product.category.name;
                if (!countByCategory[categoryName]) {
                    countByCategory[categoryName] = 1;
                } else {
                    countByCategory[categoryName]++;
                }
            });

                
            return res.json({
                count: products.length,
                countByCategory: countByCategory,
                data: products.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description_home,
                    category: product.category.name,
                    detail: `/api/products/${product.id}`
                }))
            })

        }
            catch(error) {
                console.error(error);
                res.status(500).json({ error: 'Error interno del servidor' });
    } 
    },

    detail: async (req, res) => {
    try{ 
        const products = await db.Product.findByPk(req.params.id, {
            include: ['status', 'category', 'brand' ]
        });

            return res.json({
                id: products.id,
                name: products.name,
                description: products.description, 
                shortDescription: products.description_home,
                price: products.price,
                status: products.status.name, 
                category: products.category.name, 
                brand: products.brand.name,
                img: `/img/products/${products.img}`
            })
    }
            catch(error) {
                console.error(error);
                res.status(500).json({ error: 'Error interno del servidor' });
    }
} 
}