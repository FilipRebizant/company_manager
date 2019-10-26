<?php

namespace App\Controller\API;

use App\Repository\CommissionRepository;
use App\Service\CommissionService;
use App\Service\Exception\ValidationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CommissionController extends ApiController
{
    /** @var CommissionService */
    private $commissionService;

    /**
     * @param CommissionService $commissionService
     */
    public function __construct(CommissionService $commissionService)
    {
        $this->commissionService = $commissionService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $request = $this->transformJsonBody($request);

        try {
            $commission = $this->commissionService->create($request->request->all());
            $commissionArray = $this->commissionService->transform($commission);
        } catch (ValidationException $e) {
            return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        return $this->respondSuccess($commissionArray, Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param CommissionRepository $commissionRepository
     * @return JsonResponse
     */
    public function show(Request $request, CommissionRepository $commissionRepository): JsonResponse
    {
        $commission = $commissionRepository->find($request->get('id'));

        if (!is_null($commission)) {
            $commissionArray = $this->commissionService->transform($commission);

            return $this->respondSuccess($commissionArray, Response::HTTP_OK);
        }

        return $this->respondError(["Commission could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param CommissionRepository $commissionRepository
     * @return JsonResponse
     */
    public function showAll(CommissionRepository $commissionRepository): JsonResponse
    {
        $commissions = $commissionRepository->findAll();
        $commissionsArray = [];

        foreach ($commissions as $commission) {
            $commissionsArray[] = $this->commissionService->transform($commission);
        }

        return $this->respondSuccess(['commissions' => $commissionsArray], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @param CommissionRepository $commissionRepository
     * @return JsonResponse
     */
    public function update(Request $request, CommissionRepository $commissionRepository): JsonResponse
    {
        $data = $this->transformJsonBody($request);
        $commission = $commissionRepository->find($request->get('id'));

        if (!is_null($commission)) {
            try {
                $updatedCommission = $this->commissionService->update($commission, $data->request->all());
                $commissionArray = $this->commissionService->transform($updatedCommission);

                return $this->respondSuccess([$commissionArray]);
            } catch (ValidationException $e) {
                return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->respondError(["Commission could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param Request $request
     * @param CommissionRepository $commissionRepository
     * @return JsonResponse
     */
    public function delete(Request $request, CommissionRepository $commissionRepository): JsonResponse
    {
        $commission = $commissionRepository->find($request->get('id'));

        if (!is_null($commission)) {
            $this->commissionService->delete($commission);

            return $this->respondSuccess(['result' => 'Commission has been deleted'], Response::HTTP_OK);
        }

        return $this->respondError(["Commission could not be found"], Response::HTTP_NOT_FOUND);
    }
}
