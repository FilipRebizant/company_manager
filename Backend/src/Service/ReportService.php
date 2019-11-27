<?php

namespace App\Service;

use App\Entity\Report;
use App\Repository\CommissionRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ReportService
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

    /** @var UserRepository  */
    private $userRepository;

    /**
     * ReportService constructor.
     * @param EntityManagerInterface $em
     * @param ValidatorInterface $validator
     * @param CommissionRepository $commissionRepository
     * @param UserRepository $userRepository
     */
    public function __construct(
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        CommissionRepository $commissionRepository,
        UserRepository $userRepository
    ) {
        $this->em = $em;
        $this->validator = $validator;
        $this->dateFormat = 'Y-m-d H:i';
        $this->shortDateFormat = 'Y-m-d';
        $this->commissionRepository = $commissionRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * @param array $data
     * @return Report
     * @throws \Exception
     */
    public function create(array $data): Report
    {
        $commission = $this->commissionRepository->find($data['commissionId']);
        $name = explode(' ', $data['addedBy']);
        $user = $this->userRepository->findOneBy([
            'firstName' => $name[0],
            'lastName' => $name[1],
        ]);
        $createdAt = new \DateTime($data['createdAt']);
        $startedAt = new \DateTime($data['startedAt']);
        $finishedAt = new \DateTime($data['finishedAt']);

        $report = new Report();
        $report->setUser($user);
        $report->setFinishedAt($finishedAt);
        $report->setStartedAt($startedAt);
        $report->setHoursSummary($data['hoursSum']);
        $report->setDayDescription($data['dayDescription']);
        $report->setCommission($commission);
        $report->setCreatedAt($createdAt);
        $this->save($report);

        return $report;
    }

    /**
     * @param Report $report
     * @return array
     */
    public function transform(Report $report): array
    {
        return [
            'id' => $report->getId(),
            'hoursSummary' => $report->getHoursSummary(),
            'finishedAt' => $report->getFinishedAt()->format($this->dateFormat),
            'startedAt' => $report->getStartedAt()->format($this->dateFormat),
            'dayDescription' => $report->getDayDescription(),
            'createdAt' => $report->getCreatedAt()->format($this->shortDateFormat),
        ];
    }

    /**
     * @param Report $report
     */
    public function delete(Report $report): void
    {

    }

    /**
     * @param $entity
     */
    public function save($entity): void
    {
        $this->em->persist($entity);
        $this->em->flush();
    }
}
