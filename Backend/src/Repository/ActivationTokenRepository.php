<?php

namespace App\Repository;

use App\Entity\ActivationToken;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ActivationToken|null find($id, $lockMode = null, $lockVersion = null)
 * @method ActivationToken|null findOneBy(array $criteria, array $orderBy = null)
 * @method ActivationToken[]    findAll()
 * @method ActivationToken[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActivationTokenRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ActivationToken::class);
    }
}
