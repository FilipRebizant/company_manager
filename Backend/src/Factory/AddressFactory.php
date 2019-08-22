<?php

namespace App\Factory;

use App\Entity\Address;

class AddressFactory
{
    /**
     * @param array $data
     * @return Address
     */
    public function create(array $data): Address
    {
        $address = new Address();
        $address->setPostCode($data['postCode']);
        $address->setTown($data['town']);
        $address->setStreet($data['street']);
        $address->setHouseNumber($data['houseNumber']);

        return $address;
    }
}
