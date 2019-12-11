<?php

namespace App\Controller\API;

use App\Service\AuthService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SecurityController extends ApiController
{
    /**
     * @return JsonResponse
     */
    public function getCurrentUser(): JsonResponse
    {
        $user = $this->getUser();
        
        return new JsonResponse([
            'name' => $user->toString(),
            'role' => $user->getRoles()[0],
        ], 200);
    }

    /**
     * @param Request $request
     * @param AuthService $authService
     * @return JsonResponse
     * @throws \Exception
     */
    public function register(Request $request, AuthService $authService): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $request = $this->transformJsonBody($request);
        $authService->register($request->request->all());

        return $this->respondSuccess([], 201);
    }
}
