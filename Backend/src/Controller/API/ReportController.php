<?php

namespace App\Controller\API;

use App\Repository\ReportRepository;
use App\Service\Exception\ValidationException;
use App\Service\ReportService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ReportController extends ApiController
{
    /** @var ReportService */
    private $reportService;

    /**
     * @param ReportService $reportService
     */
    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function create(Request $request): JsonResponse
    {
        $request = $this->transformJsonBody($request);

        try {
            $report = $this->reportService->create($request->request->all());
            $reportArray = $this->reportService->transform($report);
        } catch (ValidationException $e) {
            return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        return $this->respondSuccess($reportArray, Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param ReportRepository $reportRepository
     * @return JsonResponse
     */
    public function update(Request $request, ReportRepository $reportRepository): JsonResponse
    {
        $data = $this->transformJsonBody($request);
        $report = $reportRepository->find($request->get('id'));

        if (!is_null($report)) {
            try {
                $updatedReport = $this->reportService->update($report, $data->request->all());
                $reportArray = $this->reportService->transform($updatedReport);

                return $this->respondSuccess([$reportArray]);
            } catch (ValidationException $e) {
                return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->respondError(["Report could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param Request $request
     * @param ReportRepository $reportRepository
     * @return JsonResponse
     */
    public function getReportFromCommission(Request $request, ReportRepository $reportRepository)
    {
        $reports = $reportRepository->findBy([
            'commission' => $request->get('id'),
        ]);

        $reportsArray = [];
        foreach ($reports as $report) {
            $reportsArray[] = $this->reportService->transform($report);
        }

        return $this->respondSuccess(['reports' => $reportsArray]);
    }

    /**
     * @param Request $request
     * @param ReportRepository $reportRepository
     * @return JsonResponse
     */
    public function delete(Request $request, ReportRepository $reportRepository): JsonResponse
    {
        $report = $reportRepository->find($request->get('id'));

        if (!is_null($report)) {
            $this->reportService->delete($report);

            return $this->respondSuccess(['result' => 'Report has been deleted'], Response::HTTP_OK);
        }

        return $this->respondError(["Report could not be found"], Response::HTTP_NOT_FOUND);
    }
}
