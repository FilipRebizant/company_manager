<?php

namespace App\Service;

use App\Entity\Task;
use App\Repository\CommissionRepository;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TaskService
{
    /** @var EntityManagerInterface $em */
    private $em;

    /** @var ValidatorInterface $validator */
    private $validator;

    /** @var string */
    private $dateFormat;

    /** @var string */
    private $shortDateFormat;

    /** @var UserRepository */
    private $userRepository;

    /** @var CommissionRepository */
    private $commissionRepository;

    /**
     * TaskService constructor.
     * @param EntityManagerInterface $em
     * @param ValidatorInterface $validator
     * @param UserRepository $userRepository
     * @param CommissionRepository $commissionRepository
     */
    public function __construct(
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        UserRepository $userRepository,
        CommissionRepository $commissionRepository
    ) {
        $this->userRepository = $userRepository;
        $this->commissionRepository = $commissionRepository;
        $this->em = $em;
        $this->validator = $validator;
        $this->dateFormat = 'Y-m-d';
        $this->shortDateFormat = 'Y-m-d';
    }

    /**
     * @param array $data
     * @return Task
     * @throws \Exception
     */
    public function create(array $data): Task
    {
        $user = null;
        if (!empty($data['employeeAssigned'])) {
            $name = explode(" ", $data['employeeAssigned']);
            $user = $this->userRepository->findOneBy([
                'firstName' => $name[0],
                'lastName' => $name[1],
            ]);
        }

        $commission = $this->commissionRepository->find($data['commissionId']);
        $createdAt = new \DateTime($data['createdAt']);

        $task = new Task();
        $task->setDescription($data['description']);
        $task->setStatus('Todo');
        $task->setCreatedAt($createdAt);
        $task->setStartDate(new DateTimeImmutable());
        $task->setUser($user);
        $task->setCommission($commission);
        $task->setPriority($data['priority']);

        $this->save($task);

        return $task;
    }

    public function transform(Task $task): array
    {
        $date = $task->getCreatedAt()->format($this->shortDateFormat);
        $user = null;
        if ($task->getUser()) {
            $user = $task->getUser()->toString();
        }

        return   [
            'id' => $task->getId(),
            'description' => $task->getDescription(),
            'createdAt' => $task->getCreatedAt()->format($this->dateFormat),
            'status' => $task->getStatus(),
            'employeeAssigned' => $user,
            'priority' => $task->getPriority(),
        ];
    }

    public function update(Task $task, array $data)
    {
        $user = null;
        if (!empty($data['employeeAssigned'])) {
            $name = explode(" ", $data['employeeAssigned']);
            $user = $this->userRepository->findOneBy([
                'firstName' => $name[0],
                'lastName' => $name[1],
            ]);
        }
        $task->setStatus($data['status']);
        $task->setUser($user);
        $task->setUpdatedAt(new DateTimeImmutable());
        $task->setDescription($data['description']);
        $task->setPriority($data['priority']);
        if ($data['status'] === 'Done') {
            $task->setEndDate(new DateTimeImmutable());
        }

        $this->save($task);

        return $task;
    }

    public function changeStatus(Task $task, string $status)
    {
        $task->setStatus($status);
        $this->save($task);
    }

    public function delete(Task $task)
    {

    }

    public function save($entity): void
    {
        $this->em->persist($entity);
        $this->em->flush();
    }
}
