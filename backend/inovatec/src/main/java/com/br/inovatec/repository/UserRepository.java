package com.br.inovatec.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.inovatec.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
