<?php

namespace App\Factory;

use App\Entity\Company;

class CompanyFactory
{
    /**
     * @param array $data
     * @return Company
     * @throws \Exception
     */
    public function create(array $data): Company
    {
        $company = new Company();
        $company->setName($data['name']);
        $company->setCreatedAt(new \DateTimeImmutable('now'));
        $company->setNIP($data['NIP']);

        return $company;
    }
}
