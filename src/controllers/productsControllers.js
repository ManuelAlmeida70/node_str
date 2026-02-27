'use strict';

import ValidationContract from "../validators/fluent-validator.js"

import productRepository from "../repositories/productRepository.js"

export const get = async (req, res, next) =>
{
    try
    {
        const data = await productRepository.get();
        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(500).send({message: "Falha ao processar requisicao"});
    }
}

export const getBySlug = async(req, res, next) =>
{
    try
    {
        const data = await productRepository.getBySlug(req.params.slug);
        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(400);
    }
}

export const getById = async(req, res, next) =>
{
    try
    {
        const data = await productRepository.getById(req.params.id);
        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(400);
    }
}

export const getByTag = async(req, res, next) =>
{
    try
    {
        const data = await productRepository.getByTag(req.params.tag);
        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(400);
    }
}

export const post = async(req, res, next) => {
   
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos 3 caracteres');

    if (!contract.isValid())
    {
        res.status(400).send(contract.errors()).end();
        return;
    }

   try
   {
        await productRepository.create(req.body)
        res.status(200).send({message: "Produto cadastrado com sucesso"});
   }
   catch(e)
   {
        res.status(400).send({message: "Erro ao cadastrar produto", error: e});
   }
};


export const put = ('/:id', async(req, res, next) => {
    const id = req.params.id;
    try
    {
        const data = await productRepository.put(id, req.body);
        res.status(200).send({message: 'Produto atualizado com sucesso'});
    }
    catch(e)
    {
        res.status(400).send({
            message: "Falha ao atualizar produto",
            data: e
        });
    }
        
});

export const remove = ('/:id', async(req, res, next) => {
    try
    {
        const id = req.params.id;
        const data = await productRepository.remove(id);
        res.status(200).send({message: "Produto eliminado com sucesso"});
    }
    catch(e)
    {
        res.status(400).send(
            {message: "Falha ao eliminar produto",
            data: e
            });
    }
});