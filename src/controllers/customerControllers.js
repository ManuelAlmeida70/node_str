'use-strict'

import customerRepository from '../repositories/customerRepository.js'
import validationContract from '../validators/fluent-validator.js'


// Validacao do email do metedo post
// contract.isEmail(req.body.email, "Email invalido");

export const post = async(req, res, next) => {
    
    let contract = new validationContract();

    contract.hasMinLen(req.body.name, 3, "O nome deve conter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.password, 8, "A palavra-passe deve conter pelo menos 8 caracteres");
    

    if (!contract.isValid())
    {
        res.status(404).send(contract.errors()).end();
        return;
    }

    try
    {
        await customerRepository.create(req.body);
        res.status(201).send({message: "Consumidor cadastrado com sucesso"});
    }
    catch(e)
    {
       res.status(500).send({message: "A falha ao precessar requisição"});
    }
}

export const get = async(req, res, next) => {

    let contract = new validationContract();

    contract.isEmail(req.body.email, "Email invalido");

    if (!contract.isValid())
    {
        res.status(400).send(contract.errors()).end();
        return;
    }


    try
    {
        const data = await customerRepository.get(req.body.email, req.body.password);

        if (data == null)
            res.status(500).send({message: "Email ou palavra errada"});

        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(500).send({message: "Falha"});
    }
}