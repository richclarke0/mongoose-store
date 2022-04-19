const express = require('express')
const Book = require('../../booklist/models/book')

//variable of the .Router() method
//dont forget to module.exports at the bottom to this var
const productRouter = express.Router()

//require mongoose product schema
const Product = require("../models/product")

//seed data
const seed = require("../models/productseed")

// INDUCES - Index, New, Delete, Update, Create, Edit, Show
//seed if you have it
productRouter.get("/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {
      Product.create(
        seed,
        (error, data) => {
            res.send(data)
        //   res.redirect("/products")
        }
      )
    })
  })

//create route
productRouter.post("/", (req,res) => {
    Product.create(req.body, (err, createdProduct) => {
        if (err) return res.send(err)
        //res.send(createdProduct)
        res.redirect("/products")
    })
})

//delete route
productRouter.delete("/:id", (req,res) => {
    Product.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect("/products")
    })
})

//------------- controllers (routes) ------------------
//new route (must be before show route)
productRouter.get("/new", (req,res) => {
  res.render("new.ejs", {
    pageTitle: "Create New Product"
  })
})


//index route
// displays at /products
productRouter.get("/", (req, res) => {
    Product.find({}, (error, allProducts) => {
      res.render("index.ejs", {
        pageTitle: "Our Product Line",
        products: allProducts,
      })
    })
  })

//edit route
productRouter.get("/:id/edit", (req,res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    // res.send(foundProduct)
    res.render("edit.ejs", {
      pageTitle: "Edit Product: " + foundProduct.name,
      product: foundProduct
    })
  })
})

//show route
productRouter.get("/:id", (req,res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("show.ejs", {
      pageTitle: foundProduct.name,
      product: foundProduct
    })
  })
})


//export
module.exports = productRouter