<?php

namespace App\Service;

use App\Entity\User;
use App\Service\Exception\ValidationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserService
{
    /** @var EntityManagerInterface $em */
    private $em;

    /** @var ValidatorInterface $validator */
    private $validator;

    /** @var UserPasswordEncoderInterface  */
    private $encoder;

    /**
     * @param EntityManagerInterface $em
     * @param ValidatorInterface $validator
     */
    public function __construct(EntityManagerInterface $em, ValidatorInterface $validator, UserPasswordEncoderInterface $encoder)
    {
        $this->em = $em;
        $this->validator = $validator;
        $this->encoder = $encoder;
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
                'salary' => $user->getSalary(),
                'role' => $user->printRole(),
                'email' => $user->getEmail(),
                'createdAt' => (string)$user->getCreatedAt()->format('d.m.Y H:i:s'),
            ];

        } catch (\Exception $e) {
            throw new ValidationException("",0, $e);
        }
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
            ->setSalary($data['salary'])
            ->setRole($data['role'])

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
