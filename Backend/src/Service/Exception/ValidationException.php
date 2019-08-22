<?php

namespace App\Service\Exception;

use Throwable;

class ValidationException extends \Exception
{
    /** @var array  */
    private $errorArray;

    public function __construct(string $message = "", int $code = 0, Throwable $previous = null, $errorArray = array())
    {
        parent::__construct($message, $code, $previous);
        $this->errorArray = $errorArray;
    }

    /**
     * @return array
     */
    public function getErrors(): array
    {
        return $this->errorArray;
    }
}
