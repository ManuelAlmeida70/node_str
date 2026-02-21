'use strict';

import Product from "../models/products.js"
import ValidationContract from "../validators/fluent-validator.js"

export const get = (req, res, next) =>
{
    Product
        .find({active: true}, 'title slug price')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
}

export const getBySlug = (req, res, next) =>
{
    Product
        .findOne({
            slug: req.params.slug,
            active: true,
        }, 'title description price slug tags'
    )
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);   
    })
}

export const getById = (req, res, next) =>
{
    Product.findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
}

export const getByTag = (req, res, next) =>
{
    Product.find({tags: req.params.tag}, 'title description slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
}

export const post = (req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos 3 caracteres');

    if (!contract.isValid())
    {
        res.status(400).send(contract.errors()).end();
        return;
    }
        
    var product = new Product(req.body);
    product.save()
        .then(x => res.status(201).send( {message: "Produto registrado com sucesso"}))
        .catch(e => {res.status(400).send({message: "Erro ao registrar produto", data: e})})
};


export const put = ('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price}
    })
    .then(data => {
        res.status(200).send({message: 'Produto atualizado com sucesso'});
    })
    .catch(e => {
        res.status(400).send({
            message: "Falha ao atualizar produto",
            data: e
        });
    })
});

export const remove = ('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findOneAndDelete(id)
    .then(data => {
        res.status(200).send({message: "Produto eliminado com sucesso"});
    })
    .catch(e => {
        res.status(400).send(
            {message: "Falha ao eliminar produto",
            data: e
            })
    })
});