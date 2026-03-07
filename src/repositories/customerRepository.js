'use-strict'

import Customer from "../models/customer"

const customerRepository = {

    get: async(password, email) => {
        const res = await Customer.find(
            {
                password: password,
                email: email
            });
        return (res);
    }
}

export default customerRepository;