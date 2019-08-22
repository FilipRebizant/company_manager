<?php

namespace App\Tests\Functional\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpClient\NativeHttpClient;

class UserControllerTest extends WebTestCase
{
    /** @var NativeHttpClient */
    private $client;

    protected function setUp(): void
    {
        $this->client = HttpClient::create();
    }

    /**
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function testCanGetUsersSuccessfully()
    {
        $expectedResponseCode = 200;

        $response = $this->client->request('GET', 'http://localhost:8000/api/users/', [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
        ]);


        $this->assertEquals($expectedResponseCode, $response->getStatusCode());
    }

    /**
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function testCanCreateAndDeleteUserSuccessfully()
    {
        $expectedCreatedResponseCode = 201;
        $expectedDeletedResponseCode = 200;

        $createRequest = $this->client->request('POST', 'http://localhost:8000/api/users', [
            'json' => [
                'username' => 'newUser',
                'firstName' => 'name',
                'lastName' => 'fineName',
                'email' => 'email@email.com',
            ]
        ]);

        $response = json_decode($createRequest->getContent(), true);
        $id = $response['id'];

        $this->assertEquals($expectedCreatedResponseCode, $createRequest->getStatusCode());

        $deleteRequest = $this->client->request('DELETE', 'http://localhost:8000/api/users/' . $id, []);

        $this->assertEquals($expectedDeletedResponseCode, $deleteRequest->getStatusCode());
    }
}
