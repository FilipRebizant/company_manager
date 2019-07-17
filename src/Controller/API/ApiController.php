<?php

namespace App\Controller\API;

use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController
{
    /** @var int  */
    protected $responseCode = 200;

    /**
     * @return int
     */
    public function getResponseCode(): int
    {
        return $this->responseCode;
    }

    /**
     * @param $data
     * @param array $headers
     * @return JsonResponse
     */
    public function respondSuccess(array $data, array $headers = []): JsonResponse
    {
        return new JsonResponse($data, $this->getResponseCode(), $headers);
    }

    /**
     * @param $errors
     * @param array $headers
     * @return JsonResponse
     */
    public function respondError(array $errors, array $headers = []): JsonResponse
    {
        $data = [
            'errors' => $errors
        ];

        return new JsonResponse($data, $this->getResponseCode(), $headers);
    }
}
