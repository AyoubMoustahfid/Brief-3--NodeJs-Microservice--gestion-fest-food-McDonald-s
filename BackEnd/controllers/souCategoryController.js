const {SouCategory, getSouCategory} = require('./../models/souCategoryModel');


exports.createSouCategory = (req, res) => {
    const souCategory = new SouCategory(req.body);

    souCategory.save((err, souCategory) => {
        if(err){
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            souCategory: souCategory
        })
    }) 
}

exports.allSouCategories = (req, res) => {

    SouCategory.find()
    .populate('category')
    .exec((err, souCategories) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            souCategories
        })
    })
}

exports.deleteSouCategory = (req, res) => {

    let souCategory = req.souCategory;

    souCategory.remove((err, category) => {

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


exports.souCategoryId = (req, res, next, id) => {

    SouCategory.findById(id).exec((err, souCategory) => {

        if(err || !souCategory) {
            return res.status(404).json({
                error: "Category not found !"
            })
        }

        req.souCategory = souCategory;
        next()
    })

} 




exports.updateSouCategory = (req, res) => {

    let souCategory = req.souCategory;

    souCategory.name = req.body.name;

    souCategory.save((err, souCategory) => {

        if(err) {
            return res.status(400).json({
                error: "bad request !"
            })
        }

        res.json({
            souCategory,
            message: 'Category updated '
        })

    })

}


