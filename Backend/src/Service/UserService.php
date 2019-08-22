<?php

namespace App\Service;

use App\Entity\User;
use App\Service\Exception\ValidationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserService
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
     * @param User $user
     * @return array
     * @throws ValidationException
     */
    public function transform(User $user): array
    {
        try {
            return [
                'id'        => (int)$user->getId(),
                'username'  => (string)$user->getUsername(),
                'firstName' => (string)$user->getFirstName(),
                'lastName'  => (string)$user->getLastName(),
                'createdAt' => (string)$user->getCreatedAt()->format('d.m.Y H:i:s'),
            ];

        } catch (\Exception $e) {
            throw new ValidationException("",0, $e);
        }
    }

    /**
     * @param array $data
     * @return User
     * @throws \Exception
     */
    public function create(array $data): User
    {
        // Create User instance
        try {
            $user = new User();
            $user
                ->setFirstName($data['firstName'])
                ->setLastName($data['lastName'])
                ->setEmail($data['email'])
                ->setUsername($data['username'])
                ->setCreatedAt(new \DateTimeImmutable())
                ->setActive(0);

            // Validate
            $errors = $this->validator->validate($user);

            // If there are errors
            if (count($errors) > 0) {
                $errorArray = [];

                foreach ($errors as $error) {
                    $errorArray[] = [$error->getPropertyPath() => $error->getMessage()];
                }

                throw new ValidationException("", 0, null, $errorArray);
            }
        } catch (\Exception $e) {
            throw new ValidationException("", 0, null, ["Bad request " . $e->getMessage()]);
        }

        // Save User
        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }

    /**
     * @param User $user
     * @param array $data
     * @return User
     * @throws \Exception
     */
    public function update(User $user, array $data): User
    {
        $user
            ->setFirstName($data['firstName'])
            ->setLastName($data['lastName'])
            ->setEmail($data['email'])
            ->setUsername($data['username'])
            ->setUpdatedAt(new \DateTimeImmutable());

        $this->em->flush();

        return $user;
    }

    /**
     * @param User $user
     */
    public function delete(User $user): void
    {
        $this->em->remove($user);
        $this->em->flush();
    }
}
