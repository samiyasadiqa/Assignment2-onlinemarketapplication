const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// Routers
const productRoutes = express.Router();
const categoryRoutes = express.Router();

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect('mongodb+srv://sfatim43:vMgp9mYAXXMefMyL@cluster0.gl9ak63.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp',
{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("DB connected......")
})

// YOU WRITE YOUR CODE HERE
//Product Routes
    productRoutes.route('/').get((req, res)=>{
      Product.find()
      .then(products=>res.status(200).json(products))
        .catch(err=>res.status(400).json({"error": err}))
     });

    productRoutes.route('/:id').get((req,res)=>{
       Product.findById(req.params.id)
      .then(product=>res.status(200).json(product))
        .catch(err=>res.status(400).json({"error": err}))
     })

     productRoutes.route('/add').post((req,res)=>{ 
      let product = new Product(req.body)
        product.save()
          .then(product=>res.status(200).json(product))
          .catch(err=>res.status(400).json({"error": err}))
        });

        productRoutes.route('/update/:id').post((req,res)=>{
          Product.findById(req.params.id)
          .then(product =>{
              //Update the object with new data
              product.description = req.body.description;
              product.responsible = req.body.responsible;
              product.priority = req.body.priority;
              product.isCompleted = req.body.isCompleted;

          return product.save();  // Returning the promise here
        })
        .then(updatedProduct => res.status(200).json(updatedProduct))
        .catch(err => res.status(400).json({"error": err}));
    });
      
     //Category Routes
    categoryRoutes.route('/').get((req, res) => {
      Category.find()
      .then(categories => res.status(200).json(categories))
      .catch(err => res.status(400).json({ "error": err }));
    });
      categoryRoutes.route('/:id').get((req,res)=>{
        Category.findById(req.params.id)
       .then(category=>res.status(200).json(category))
         .catch(err=>res.status(400).json({"error": err}))
      });
 
      categoryRoutes.route('/add').post((req,res)=>{ 
       let category = new Category(req.body)
        category.save()
           .then(category=>res.status(200).json(category))
           .catch(err=>res.status(400).json({"error": err}))
         });
 
         categoryRoutes.route('/update/:id').post((req,res)=>{
           Category.findById(req.params.id)
           .then(category=>{
               //Update the object with new data
               category.description = req.body.description;
               category.responsible = req.body.responsible;
               category.priority = req.body.priority;
               category.isCompleted = req.body.isCompleted;

               return category.save();  // Returning the promise here
              })
              .then(updatedCategory => res.status(200).json(updatedCategory))
              .catch(err => res.status(400).json({"error": err}));
          });
     

          app.use('/api/products', productRoutes);
          app.use('/categories', categoryRoutes);

app.listen(8080,()=>{
    console.log("Server is running on 8080....");
});