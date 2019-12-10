<?php

namespace App\Controller\API;

use App\Service\Exception\ValidationException;
use App\Repository\UserRepository;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends ApiController
{
    /** @var UserService */
    private $userService;

    /**
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param Request $request
     * @param UserRepository $userRepository
     * @return JsonResponse
     * @throws ValidationException
     */
    public function show(Request $request, UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->find($request->get('id'));

        if (!is_null($user)) {
            $userArray = $this->userService->transform($user);

            return $this->respondSuccess($userArray, Response::HTTP_OK);
        }

        return $this->respondError(["User could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param UserRepository $userRepository
     * @return JsonResponse
     * @throws ValidationException
     */
    public function showAll(UserRepository $userRepository): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        
        $users = $userRepository->findAll();
        $userArray = [];

        foreach ($users as $user) {
            $userArray[] = $this->userService->transform($user);
        }

        return $this->respondSuccess(['users' => $userArray], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @param UserRepository $userRepository
     * @return JsonResponse
     * @throws \Exception
     */
    public function update(Request $request, UserRepository $userRepository): JsonResponse
    {
        $data = $this->transformJsonBody($request);
        $user = $userRepository->find($request->get('id'));

        if (!is_null($user)) {
            try {
                $updatedUser = $this->userService->update($user, $data->request->all());
                $userArray = $this->userService->transform($updatedUser);

                return $this->respondSuccess([$userArray]);
            } catch (ValidationException $e) {
                return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->respondError(["User could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param Request $request
     * @param UserRepository $userRepository
     * @return JsonResponse
     */
    public function delete(Request $request, UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->find($request->get('id'));

        if (!is_null($user)) {
            $this->userService->delete($user);

            return $this->respondSuccess(['result' => 'User has been deleted'], Response::HTTP_OK);
        }

        return $this->respondError(["User could not be found"], Response::HTTP_NOT_FOUND);
    }
}
