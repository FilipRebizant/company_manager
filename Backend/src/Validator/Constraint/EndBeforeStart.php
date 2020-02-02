<?php

namespace App\Validator\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class EndBeforeStart extends Constraint
{
    public $message = '"{{ value }}" is before start date.';
}
