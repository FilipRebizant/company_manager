<?php

namespace App\Service;

use App\Entity\Commission;
use App\Factory\AddressFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CommissionService implements ServiceInterface
{
    /** @var EntityManagerInterface $em */
    private $em;

    /** @var ValidatorInterface $validator */
    private $validator;

    /**
     * @param EntityManagerInterface $em
     * @param ValidatorInterface $validator
     */
    public function __construct(EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $this->em = $em;
        $this->validator = $validator;
    }

    public function create(array $data): Commission
    {
        // TODO: Implement create() method.
        $addressFactory = new AddressFactory();
        $address = $addressFactory->create($data);
        $this->save($address);


        $commission = new Commission();
        $commission->setName($data['name']);
        $createdAt = new \DateTime($data['createdAt']);
        $commission->setCreatedAt($createdAt);
        $commission->setAddress($address);

        // Opcjonalne
        $commission->setDescription('Description');
        $commission->setStartDate(new \DateTimeImmutable());

        $this->save($commission);

        return $commission;
    }

    public function transform(Commission $commission): array
    {
        return [
            'id' => $commission->getId(),
            'name' => $commission->getName(),
            'createdAt' => $commission->getCreatedAt(),
            'town' => $commission->getAddress()->getTown(),
            'street' => $commission->getAddress()->getStreet(),
            'houseNumber' => $commission->getAddress()->getHouseNumber(),
            'material' => $commission->getMaterial(),
            'reports' => $commission->getReports(),
            'tasks' => $commission->getTasks(),
        ];
    }

    public function update(Commission $commission, array $data)
    {

    }

    public function delete(Commission $commission)
    {

    }

    public function save($entity): void
    {
        $this->em->persist($entity);
        $this->em->flush();
    }
}
