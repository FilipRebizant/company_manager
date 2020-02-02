<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthService
{
    /** @var UserPasswordEncoderInterface  */
    private $encoder;

    /** @var EntityManagerInterface  */
    private $em;

    public function __construct(EntityManagerInterface $em, UserPasswordEncoderInterface $encoder)
    {
        $this->em = $em;
        $this->encoder = $encoder;
    }

    /**
     * @param array $data
     * @return User
     * @throws \Exception
     */
    public function register(array $data): User
    {
        $user = new User();
        $user->setActive(1);
        $user->setCreatedAt(new \DateTimeImmutable());
        $user->setUsername($data['username']);
        $user->setLastName($data['lastName']);
        $user->setFirstName($data['firstName']);
        $user->setEmail($data['email']);
        $user->setRole($data['role']);
        $user->setSalary($data['salary']);

        $password = $this->encoder->encodePassword($user, $data['password']);
        $user->setPassword($password);

        $this->save($user);

        return $user;
    }

    /**
     * @param User $user
     */
    private function save(User $user): void
    {
        $this->em->persist($user);
        $this->em->flush();
    }

    /**
     * @param User $user
     * @return array
     */
    public function transform(User $user): array
    {
        return [
            'username' => $user->getUsername(),
            'role' => $user->getRoles()[0],
        ];
    }
}
