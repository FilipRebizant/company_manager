<?php

namespace App\Controller\API;

use App\Repository\ClientRepository;
use App\Service\ClientService;
use App\Service\Exception\ValidationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ClientController extends ApiController
{
    /** @var ClientService */
    private $clientService;

    /**
     * @param ClientService $clientService
     */
    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
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
            $client = $this->clientService->create($request->request->all());
            $clientArray = $this->clientService->transform($client);
        } catch (ValidationException $e) {
            return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        return $this->respondSuccess($clientArray, Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param ClientRepository $clientRepository
     * @return JsonResponse
     * @throws ValidationException
     */
    public function show(Request $request, ClientRepository $clientRepository): JsonResponse
    {
        $client = $clientRepository->find($request->get('id'));

        if (!is_null($client)) {
            $clientArray = $this->clientService->transform($client);

            return $this->respondSuccess($clientArray, Response::HTTP_OK);
        }

        return $this->respondError(["Client could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param ClientRepository $clientRepository
     * @return JsonResponse
     * @throws ValidationException
     */
    public function showAll(ClientRepository $clientRepository): JsonResponse
    {
        $clients = $clientRepository->findAll();
        $clientArray = [];

        foreach ($clients as $client) {
            $clientArray[] = $this->clientService->transform($client);
        }

        return $this->respondSuccess(['clients' => $clientArray], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @param ClientRepository $clientRepository
     * @return JsonResponse
     * @throws \Exception
     */
    public function update(Request $request, ClientRepository $clientRepository): JsonResponse
    {
        $data = $this->transformJsonBody($request);
        $client = $clientRepository->find($request->get('id'));

        if (!is_null($client)) {
            try {
                $updatedClient = $this->clientService->update($client, $data->request->all());
                $clientArray = $this->clientService->transform($updatedClient);

                return $this->respondSuccess([$clientArray]);
            } catch (ValidationException $e) {
                return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->respondError(["Client could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param Request $request
     * @param ClientRepository $clientRepository
     * @return JsonResponse
     */
    public function delete(Request $request, ClientRepository $clientRepository): JsonResponse
    {
        $client = $clientRepository->find($request->get('id'));

        if (!is_null($client)) {
            $this->clientService->delete($client);

            return $this->respondSuccess(['result' => 'Client has been deleted'], Response::HTTP_OK);
        }

        return $this->respondError(["Client could not be found"], Response::HTTP_NOT_FOUND);
    }
}
