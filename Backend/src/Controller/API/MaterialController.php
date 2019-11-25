<?php

namespace App\Controller\API;

use App\Repository\MaterialRepository;
use App\Service\Exception\ValidationException;
use App\Service\MaterialService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MaterialController extends ApiController
{
    /** @var MaterialService */
    private $materialService;

    /**
     * @param MaterialService $materialService
     */
    public function __construct(MaterialService $materialService)
    {
        $this->materialService = $materialService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $request = $this->transformJsonBody($request);

        try {
            $material = $this->materialService->create($request->request->all());
            $materialArray = $this->materialService->transform($material);
        } catch (ValidationException $e) {
            return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        return $this->respondSuccess($materialArray, Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param MaterialRepository $materialRepository
     * @return JsonResponse
     */
    public function update(Request $request, MaterialRepository $materialRepository): JsonResponse
    {
        $data = $this->transformJsonBody($request);
        $material = $materialRepository->find($request->get('id'));

        if (!is_null($material)) {
            try {
                $updatedMaterial = $this->materialService->update($material, $data->request->all());
                $materialArray = $this->materialService->transform($updatedMaterial);

                return $this->respondSuccess([$materialArray]);
            } catch (ValidationException $e) {
                return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->respondError(["Material could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param Request $request
     * @param MaterialRepository $materialRepository
     * @return JsonResponse
     */
    public function getMaterialFromCommission(Request $request, MaterialRepository $materialRepository)
    {
        $materials = $materialRepository->findBy([
            'commission' => $request->get('id'),
        ]);

        $materialsArray = [];
        foreach ($materials as $material) {
            $materialsArray[] = $this->materialService->transform($material);
        }

        return $this->respondSuccess(['materials' => $materialsArray]);
    }

    /**
     * @param Request $request
     * @param MaterialRepository $materialRepository
     * @return JsonResponse
     */
    public function delete(Request $request, MaterialRepository $materialRepository): JsonResponse
    {
        $material = $materialRepository->find($request->get('id'));

        if (!is_null($material)) {
            $this->materialService->delete($material);

            return $this->respondSuccess(['result' => 'Material has been deleted'], Response::HTTP_OK);
        }

        return $this->respondError(["Material could not be found"], Response::HTTP_NOT_FOUND);
    }
}
