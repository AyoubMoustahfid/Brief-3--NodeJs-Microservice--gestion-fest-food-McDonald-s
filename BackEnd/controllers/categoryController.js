const Category = require('./../models/categoryModel');


exports.createCategory = (req, res) => {
    const category = new Category(req.body);

    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            category: category
        })
    }) 
}

exports.allCategories = (req, res) => {

    Category.find()
    .exec((err, categories) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            categories
        })
    })
}

exports.deleteCategory = (req, res) => {

    let category = req.category;

    category.remove((err, category) => {

        if(err) {
            return res.status(404).json({
                error: "category not found !"
            })
        }

        res.status(204).json({
            message: 'Category deleted '
        })

    })

}


exports.categoryId = (req, res, next, id) => {

    Category.findById(id).exec((err, category) => {

        if(err || !category) {
            return res.status(404).json({
                error: "Category not found !"
            })
        }

        req.category = category;
        next()
    })

} 


exports.updateCategory = (req, res) => {

    let category = req.category;

    category.name = req.body.name;

    category.save((err, category) => {

        if(err) {
            return res.status(400).json({
                error: "bad request !"
            })
        }

        res.json({
            category,
            message: 'Category updated '
        })

    })

}


exports.relatedCategory =(req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 2;

    Category.find({souCategory: req.category.souCategory,
                 _id: {$ne : req.category._id} // not give to me id of the product 
           })
    .limit(limit)
    .populate('souCategory')
    .exec((err, categories) => {
        if(err){
            res.status(404).json({
                error: "Sous Category not found !"
            })
        }

        res.json({
            categories
        })
    })

}