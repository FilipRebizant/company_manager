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

    public function countGeneralSummary($id)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT SUM(r.hours_summary) as summary, u.first_name as firstName, u.last_name as lastName, u.salary
            FROM commission c
            INNER JOIN report r ON r.commission_id = c.id
            INNER JOIN user u ON r.user_id = u.id
            WHERE c.id = :id
            GROUP BY u.first_name, u.last_name, u.salary
        ';

        $stmt = $conn->prepare($sql);
        $stmt->execute([
            'id' => $id
        ]);

        return $stmt->fetchAll();
    }
}
