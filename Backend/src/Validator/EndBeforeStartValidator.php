<?php

namespace App\Validator;


use App\Repository\CommissionRepository;
use App\Validator\Constraint\EndBeforeStart;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class EndBeforeStartValidator extends ConstraintValidator
{
    private $commissionRepository;

    public function __construct(CommissionRepository $commissionRepository)
    {
        $this->commissionRepository = $commissionRepository;
    }

    /**
     * Checks if the passed value is valid.
     *
     * @param mixed $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint)
    {
        $commission = $this->commissionRepository->findOneBy([
            'id' => $value,
        ]);

        $startDate = $commission->getStartDate();
        $endDate = $commission->getEndDate();

        if ($startDate > $endDate) {
            return;
        }

        /**
         * @var $constraint EndBeforeStart
         */
        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ value }}', $value)
            ->addViolation();
    }
}
