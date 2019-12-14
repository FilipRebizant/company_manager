<?php

namespace App\Controller\API;

use App\Repository\TaskRepository;
use App\Service\Exception\ValidationException;
use App\Service\TaskService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends ApiController
{
    /** @var TaskService */
    private $taskService;

    /**
     * @param TaskService $taskService
     */
    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function create(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $request = $this->transformJsonBody($request);

        try {
            $task = $this->taskService->create($request->request->all());
            $taskArray = $this->taskService->transform($task);
        } catch (ValidationException $e) {
            return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
        }

        return $this->respondSuccess($taskArray, Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param TaskRepository $taskRepository
     * @return JsonResponse
     */
    public function show(Request $request, TaskRepository $taskRepository): JsonResponse
    {
        $task = $taskRepository->find($request->get('id'));

        if (!is_null($task)) {
            $taskArray = $this->taskService->transform($task);

            return $this->respondSuccess($taskArray, Response::HTTP_OK);
        }

        return $this->respondError(["Task could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param TaskRepository $taskRepository
     * @return JsonResponse
     */
    public function showAll(TaskRepository $taskRepository): JsonResponse
    {
        $tasks = $taskRepository->findAll();
        $tasksArray = [];

        foreach ($tasks as $task) {
            $tasksArray[] = $this->taskService->transform($task);
        }

        return $this->respondSuccess(['tasks' => $tasksArray], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @param TaskRepository $taskRepository
     * @return JsonResponse
     */
    public function update(Request $request, TaskRepository $taskRepository): JsonResponse
    {
        $data = $this->transformJsonBody($request);
        $task = $taskRepository->find($request->get('id'));

        if (!is_null($task)) {
            try {
                $updatedTask = $this->taskService->update($task, $data->request->all());
                $taskArray = $this->taskService->transform($updatedTask);

                return $this->respondSuccess([$taskArray]);
            } catch (ValidationException $e) {
                return $this->respondError($e->getErrors(), Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->respondError(["Task could not be found"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @param Request $request
     * @param TaskRepository $taskRepository
     * @return JsonResponse
     */
    public function changeStatus(Request $request, TaskRepository $taskRepository)
    {
        $task = $taskRepository->find($request->get('id'));
        $request = $this->transformJsonBody($request);
        $status = $request->get('status');
        $this->taskService->changeStatus($task, $status);

        return $this->respondSuccess([], Response::HTTP_NO_CONTENT);
    }

    /**
     * @param Request $request
     * @param TaskRepository $taskRepository
     * @return JsonResponse
     */
    public function getTaskWithStatus(Request $request, TaskRepository $taskRepository)
    {
        $tasks = $taskRepository->findBy([
            'status' => $request->get('status'),
            'commission' => $request->get('id'),
        ]);

        $tasksArray = [];
        foreach ($tasks as $task) {
            $tasksArray[] = $this->taskService->transform($task);
        }

        return $this->respondSuccess(['tasks' => $tasksArray], Response::HTTP_OK);
    }

    public function getTasksFromCommission(Request $request, TaskRepository $taskRepository)
    {
        $tasks = $taskRepository->findBy([
            'commission' => $request->get('id'),
        ]);

        $tasksArray = [];
        foreach ($tasks as $task) {
            $tasksArray[] = $this->taskService->transform($task);
        }

        return $this->respondSuccess(['tasks' => $tasksArray], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @param TaskRepository $taskRepository
     * @return JsonResponse
     */
    public function delete(Request $request, TaskRepository $taskRepository): JsonResponse
    {
        $task = $taskRepository->find($request->get('id'));

        if (!is_null($task)) {
            $this->taskService->delete($task);

            return $this->respondSuccess(['result' => 'Task has been deleted'], Response::HTTP_OK);
        }

        return $this->respondError(["Task could not be found"], Response::HTTP_NOT_FOUND);
    }
}
