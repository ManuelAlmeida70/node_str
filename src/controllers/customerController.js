'use-strict'

import customerRepository from '../repositories/customerRepository'
import validationContract from '../validators/fluent-validator'

export const get = async(req, res, next) => {

    let contract = new validationContract();

    contract.isEmail(req.body.email, "Email invalido");

    if (!contract.isValid())
    {
        res.status.send(contract.errors()).end();
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