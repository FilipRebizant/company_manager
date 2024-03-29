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

    /** @var string */
    private $dateFormat;

    /** @var string */
    private $shortDateFormat;

    /**
     * @param EntityManagerInterface $em
     * @param ValidatorInterface $validator
     */
    public function __construct(EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $this->em = $em;
        $this->validator = $validator;
        $this->dateFormat = 'Y-m-d h:i';
        $this->shortDateFormat = 'Y-m-d';
    }

    public function create(array $data): Commission
    {
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
        $tasks = [];
        foreach ($commission->getTasks() as $task) {
            $user = null;
            if ($task->getUser()) {
                $user = $task->getUser()->toString();
            }
            $date = $task->getCreatedAt()->format($this->shortDateFormat);
            $tasks[$date][] =
            [
                'id' => $task->getId(),
                'description' => $task->getDescription(),
                'createdAt' => $task->getCreatedAt()->format($this->dateFormat),
                'status' => $task->getStatus(),
                'employeeAssigned' => $user,
            ];
        }

        $reports = [];
        foreach ($commission->getReports() as $report) {
            $date = $report->getCreatedAt()->format($this->shortDateFormat);
            $reports[$date][] = [
                'id' => $report->getId(),
                'dayDescription' => $report->getDayDescription(),
                'startedAt' => $report->getStartedAt()->format($this->dateFormat),
                'finishedAt' => $report->getFinishedAt()->format($this->dateFormat),
                'hoursSum' => $report->getHoursSummary(),
                'addedBy' => $report->getUser()->toString(),
                'createdAt' => $report->getCreatedAt()->format($this->dateFormat),
            ];
        }

        $materials = [];
        foreach ($commission->getMaterial() as $material) {
            $date = $material->getCreatedAt()->format($this->shortDateFormat);
            $materials[$date][] = [
                'id' => $material->getId(),
                'createdAt' => $material->getCreatedAt()->format($this->dateFormat),
                'code' => $material->getCode(),
                'name' => $material->getName(),
                'quantity' => $material->getQuantity(),
            ];
        }

        return [
            'id' => $commission->getId(),
            'name' => $commission->getName(),
            'createdAt' => $commission->getCreatedAt()->format($this->dateFormat),
            'town' => $commission->getAddress()->getTown(),
            'street' => $commission->getAddress()->getStreet(),
            'houseNumber' => $commission->getAddress()->getHouseNumber(),
            'material' => $materials,
            'reports' => $reports,
            'tasks' => $tasks,
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
