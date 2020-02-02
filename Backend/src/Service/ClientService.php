<?php

namespace App\Service;

use App\Entity\Address;
use App\Entity\Client;
use App\Entity\Commission;
use App\Entity\Company;
use App\Factory\CommissionFactory;
use App\Service\Exception\ValidationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ClientService
{
    /** @var EntityManagerInterface $em */
    private $em;

    /** @var ValidatorInterface $validator */
    private $validator;

    /**
     * @param EntityManagerInterface $em
     * @param ValidatorInterface $validator
     */
    public function __construct(EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $this->em = $em;
        $this->validator = $validator;
    }

    /**
     * @param Client $client
     * @return array
     * @throws ValidationException
     */
    public function transform(Client $client): array
    {
        try {
            $updatedAt = $client->getUpdatedAt();
            if (!is_null($updatedAt)) {
                $updatedAt = $client->getUpdatedAt()->format('d.m.Y H:i:s');
            }
            return [
                'id' => (int)$client->getId(),
                'firstName' => (string)$client->getFirstName(),
                'lastName' => (string)$client->getLastName(),
                'company' => $client->getCompany(),
                'commission' => $client->getCommission(),
                'createdAt' => $client->getCreatedAt()->format('d.m.Y H:i:s'),
                'updatedAt' => $updatedAt,
            ];

        } catch (\Exception $e) {
            throw new ValidationException("", 0, $e);
        }
    }

    /**
     * @param array $data
     * @return Client
     * @throws \Exception
     */
    public function create(array $data): Client
    {
        // Create Client instance
        try {
            $address = new Address();
            $address->setPostCode('35-000');
            $address->setTown('Rzeszów');
            $address->setStreet('Lwowska');
            $address->setHouseNumber('50');

//            $address = $this->em->find(Address::class);

            $company = new Company();
            $company->setName('company');
            $company->setCreatedAt(new \DateTimeImmutable());
            $company->setAddress($address);
            $company->setNIP(12345678901);

//            $commission = new Commission();
//            $commission->setAddress($address);
//            $commission->setCreatedAt(new \DateTimeImmutable());
//            $commission->setName('Commission Name');
//            $commission->setDescription('Do something');
//            $commission->setStartDate(new \DateTimeImmutable());

//
//            $commission = new CommissionFactory();
//            $commission->create([
//                'address' => $address,
//                'name' => 'Name',
//                'description' => 'description',
//                'startDate' => new \DateTimeImmutable()
//            ]);
            $commission = $data['commission'];
            if (!is_null($commission)) {
                $this->em->find(Commission::class, $commission);
            }

            $client = new Client();
            $client
                ->setFirstName($data['firstName'])
                ->setLastName($data['lastName'])
                ->setCompany($data['company'])
                ->setCommission($commission)
                ->setCreatedAt(new \DateTimeImmutable());

            // Validate
            $errors = $this->validator->validate($client);

            // If there are errors
            if (count($errors) > 0) {
                $errorArray = [];

                foreach ($errors as $error) {
                    $errorArray[] = [$error->getPropertyPath() => $error->getMessage()];
                }

                throw new ValidationException("", 0, null, $errorArray);
            }
        } catch (\Exception $e) {
            throw new ValidationException("", 0, null, ['message' => 'Bad request' . $e->getMessage()]);
        }

        // Save Client
        $this->em->persist($client);
        $this->em->flush();

        return $client;
    }

    /**
     * @param Client $client
     * @param array $data
     * @return Client
     * @throws \Exception
     */
    public function update(Client $client, array $data): Client
    {
        $client
            ->setFirstName($data['firstName'])
            ->setLastName($data['lastName'])
            ->setCommission($data['commission'])
            ->setCompany($data['company'])
            ->setUpdatedAt(new \DateTimeImmutable());

        $this->em->flush();

        return $client;
    }

    /**
     * @param Client $client
     */
    public function delete(Client $client): void
    {
        $this->em->remove($client);
        $this->em->flush();
    }
}
