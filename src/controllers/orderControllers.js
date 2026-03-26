'use-strict'

import customer from "../models/customer.js";
import orderRepository from "../repositories/orderRepository.js";
import ValidationContract from "../validators/fluent-validator.js";
import  guid from "guid";

export const post = async(req, res, next) =>
{
    let contract = new ValidationContract();



    if (!contract.isValid())
    {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try
    {
        await orderRepository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({message: "Pedido cadastrado com sucesso"});
    }
    catch(e)
    {
        res.status(500).send({message: "Erro ao processar requisicao"});
    }
};


export const getall = async(req, res, next) => {
    try
    {
        let data = await orderRepository.getall();
        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(400).send({message: "Nao encontrado"});
    }
}