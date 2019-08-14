<?php

namespace App\Controller\API;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ApiController
{
    /**
     * @param array $data
     * @param int $responseCode
     * @param array $headers
     * @return JsonResponse
     */
    public function respondSuccess(array $data, int $responseCode = 200, array $headers = []): JsonResponse
    {
        return new JsonResponse($data, $responseCode, $headers);
    }

    /**
     * @param $errors
     * @param array $headers
     * @return JsonResponse
     */
    public function respondError(array $errors, int $responseCode = 400, array $headers = []): JsonResponse
    {
        $data = [
            'errors' => $errors
        ];

        return new JsonResponse($data, $responseCode, $headers);
    }

    /**
     * @param Request $request
     * @return null|Request
     */
    protected function transformJsonBody(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        }
        if ($data === null) {
            return $request;
        }
        $request->request->replace($data);

        return $request;
    }
}
