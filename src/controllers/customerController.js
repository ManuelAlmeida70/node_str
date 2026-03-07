'use-strict'

import customerRepository from '../repositories/customerRepository'

export const get = async(req, res, next) => {
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