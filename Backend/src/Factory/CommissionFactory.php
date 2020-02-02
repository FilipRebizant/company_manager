<?php

namespace App\Factory;

use App\Entity\Commission;

class CommissionFactory
{
    /**
     * @param array $data
     * @return Commission
     * @throws \Exception
     */
    public function create(array $data): Commission
    {
        $commission = new Commission();
        $commission->setName($data['name']);
        $commission->setAddress($data['address']);
        $commission->setCreatedAt(new \DateTimeImmutable());
        /** @var $data['startDate'] \DateTimeImmutable */
        $commission->setStartDate($data['startDate']);
        $commission->setDescription($data['description']);

        return $commission;
    }
}
