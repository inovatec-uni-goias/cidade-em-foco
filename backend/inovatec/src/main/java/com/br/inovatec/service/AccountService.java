package com.br.inovatec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.br.inovatec.dto.AccountDto;
import com.br.inovatec.entity.Account;
import com.br.inovatec.entity.User;
import com.br.inovatec.repository.AccountRepository;
import com.br.inovatec.repository.UserRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public Account createAccount(AccountDto accountDto) {
        if (!userRepository.existsById(accountDto.getUserId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Não foi possível criar a conta: Usuário inexistente");
        }

        User user = userService.findUserById(accountDto.getUserId());

        Account userAccount = new Account();
        userAccount.setEmail(accountDto.getEmail());
        userAccount.setPassword(accountDto.getPassword());
        userAccount.setUser(user);

        return accountRepository.save(userAccount);

    }

    public List<Account> listAllAccounts() {
        return accountRepository.findAll();
    }

    public Account findAccountById(Long id) {

        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conta não encontrada"));
        return account;
    }

    public Account updateAccount(Long id, Account accountUpdates) {
        if (accountRepository.existsById(id)) {
            Account account = findAccountById(id);
            account.setEmail(accountUpdates.getEmail());
            account.setPassword(accountUpdates.getPassword());
            return accountRepository.save(account);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Não foi possível atualizar detalhes da conta: Conta não encontrada");
        }
    }

    public void deleteAccount(long id) {
        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Não foi possível deletar: Conta inexistente");
        }
    }

}
