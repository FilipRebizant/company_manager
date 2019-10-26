<?php

namespace App\Repository;

use App\Entity\ActivationToken;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ActivationToken|null find($id, $lockMode = null, $lockVersion = null)
 * @method ActivationToken|null findOneBy(array $criteria, array $orderBy = null)
 * @method ActivationToken[]    findAll()
 * @method ActivationToken[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActivationTokenRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ActivationToken::class);
    }
}
