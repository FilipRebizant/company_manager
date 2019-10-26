<?php

namespace App\Repository;

use App\Entity\Commission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Commission|null find($id, $lockMode = null, $lockVersion = null)
 * @method Commission|null findOneBy(array $criteria, array $orderBy = null)
 * @method Commission[]    findAll()
 * @method Commission[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommissionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Commission::class);
    }
}
