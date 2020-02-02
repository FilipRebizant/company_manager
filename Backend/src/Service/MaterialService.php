<?php

namespace App\Service;

use App\Entity\Material;
use App\Repository\CommissionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class MaterialService
{
    /** @var EntityManagerInterface $em */
    private $em;

    /** @var ValidatorInterface $validator */
    private $validator;

    /** @var string */
    private $dateFormat;

    /** @var string */
    private $shortDateFormat;

    /** @var CommissionRepository  */
    private $commissionRepository;

    /**
     * MaterialService constructor.
     * @param EntityManagerInterface $em
     * @param ValidatorInterface $validator
     */
    public function __construct(
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        CommissionRepository $commissionRepository
    ) {
        $this->em = $em;
        $this->validator = $validator;
        $this->dateFormat = 'Y-m-d';
        $this->shortDateFormat = 'Y-m-d';
        $this->commissionRepository = $commissionRepository;
    }

    /**
     * @param array $data
     * @return Material
     * @throws \Exception
     */
    public function create(array $data): Material
    {
        $commission = $this->commissionRepository->find($data['commissionId']);
        $createdAt = new \DateTime($data['createdAt']);

        $material = new Material();
        $material->setName($data['name']);
        $material->setCode($data['code']);
        $material->setQuantity($data['quantity']);
        $material->setCommission($commission);
        $material->setCreatedAt($createdAt);
        $this->save($material);

        return $material;
    }

    public function transform(Material $material): array
    {
        return [
            'id' => $material->getId(),
            'name' => $material->getName(),
            'code' => $material->getCode(),
            'quantity' => $material->getQuantity(),
            'createdAt' => $material->getCreatedAt()->format($this->dateFormat),
        ];
    }

    public function delete(Material $material)
    {

    }

    public function save($entity): void
    {
        $this->em->persist($entity);
        $this->em->flush();
    }
}
