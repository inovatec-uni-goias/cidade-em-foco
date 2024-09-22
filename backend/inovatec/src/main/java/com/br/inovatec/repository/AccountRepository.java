package com.br.inovatec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.inovatec.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByEmail(String email);
}
